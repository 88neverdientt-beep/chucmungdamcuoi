import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Music2 } from 'lucide-react';

const audioSource = `${import.meta.env.BASE_URL}music/wedding.mp3`;

const MusicToggle = forwardRef(function MusicToggle(_props, ref) {
  const audioRef = useRef(null);
  const playRequestRef = useRef(null);
  const playAttemptRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState('');

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);
    if (!audio.paused && !audio.ended) return Promise.resolve(true);
    if (playRequestRef.current) return playRequestRef.current;

    const attempt = ++playAttemptRef.current;
    let playPromise;
    try {
      audio.volume = 0.35;
      playPromise = audio.play();
    } catch (error) {
      console.error(`[Wedding audio] Could not start ${audio.currentSrc || audio.src}.`, error);
      setIsPlaying(false);
      setAudioError('Không thể phát nhạc. Hãy thử nhấn nút bật nhạc.');
      return Promise.resolve(false);
    }

    const request = playPromise
      .then(() => {
        if (audioRef.current === audio && playAttemptRef.current === attempt && !audio.paused) {
          setIsPlaying(true);
          setAudioError('');
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error(`[Wedding audio] Playback was rejected for ${audio.currentSrc || audio.src}.`, error);
        if (audioRef.current === audio && playAttemptRef.current === attempt) {
          setIsPlaying(false);
          setAudioError('Nhạc chưa phát được. Hãy nhấn “Bật nhạc” để thử lại.');
        }
        return false;
      })
      .finally(() => {
        if (playRequestRef.current === request) {
          playRequestRef.current = null;
        }
      });

    playRequestRef.current = request;
    return request;
  }, []);

  useImperativeHandle(ref, () => ({ play }), [play]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handlePlay = () => {
      if (audio.readyState >= 3 && !audio.paused) setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(!audio.paused && !audio.ended);
    const handleEnded = () => setIsPlaying(!audio.paused && !audio.ended);
    const handleError = () => {
      const mediaError = audio.error;
      const details = mediaError
        ? `MediaError code ${mediaError.code}: ${mediaError.message || 'no additional details'}`
        : 'No media error details available';
      console.error(`[Wedding audio] Failed to load ${audio.currentSrc || audio.src}. ${details}`);
      setIsPlaying(false);
      setAudioError('Không tải được file nhạc. Kiểm tra public/music/wedding.mp3.');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      playAttemptRef.current += 1;
      playRequestRef.current = null;
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || audio.ended) {
      void play();
    } else {
      playAttemptRef.current += 1;
      playRequestRef.current = null;
      audio.pause();
    }
  };

  const buttonLabel = isPlaying ? 'Tắt nhạc' : 'Bật nhạc';

  return (
    <div className="fixed right-4 top-4 z-50 md:right-5 md:top-5">
      <audio
        ref={audioRef}
        src={audioSource}
        preload="none"
        loop
      />
      <button
        type="button"
        onClick={toggleMusic}
        className={`music-toggle ${isPlaying ? 'is-playing' : ''}`}
        aria-label={buttonLabel}
        aria-pressed={isPlaying}
        title={audioError || buttonLabel}
      >
        <Music2 size={16} aria-hidden="true" />
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
});

export default MusicToggle;
