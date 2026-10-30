import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import EnvelopeIntro from './components/EnvelopeIntro';
import FinalBlessing from './components/FinalBlessing';
import FloralDecoration from './components/FloralDecoration';
import HeartfeltLetter from './components/HeartfeltLetter';
import MusicToggle from './components/MusicToggle';
import WeddingHero from './components/WeddingHero';
import WeddingWishes from './components/WeddingWishes';

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isEnvelopeAnimating, setIsEnvelopeAnimating] = useState(false);
  const topRef = useRef(null);
  const musicRef = useRef(null);

  useEffect(() => {
    if (!isEnvelopeAnimating) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => {
      setIsEnvelopeOpen(true);
    }, reducedMotion ? 100 : 2300);

    return () => window.clearTimeout(timer);
  }, [isEnvelopeAnimating]);

  const handleOpenEnvelope = () => {
    void musicRef.current?.play();
    setIsEnvelopeAnimating(true);
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsEnvelopeOpen(false);
    setIsEnvelopeAnimating(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-shell">
        <FloralDecoration burst={isEnvelopeAnimating} />
        <MusicToggle ref={musicRef} />

        <main ref={topRef} className="relative">
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <EnvelopeIntro
                  onOpen={handleOpenEnvelope}
                  isOpened={isEnvelopeAnimating}
                />
              </motion.div>
            ) : (
              <motion.div
                key="story"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <WeddingHero />
                <HeartfeltLetter />
                <WeddingWishes />
                <div className="section-transition" aria-hidden="true">
                  <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
                    <path d="M0 65C220 150 390 4 720 72s510 55 720-24v102H0Z" />
                    <path d="M0 65C220 150 390 4 720 72s510 55 720-24" />
                  </svg>
                  <span className="transition-flower flower-one">✿</span>
                  <span className="transition-flower flower-two">✿</span>
                  <span className="transition-flower flower-three">✿</span>
                </div>
                <FinalBlessing onScrollTop={scrollToTop} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;
