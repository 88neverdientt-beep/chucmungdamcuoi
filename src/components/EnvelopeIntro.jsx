import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingContent } from '../data/weddingContent';

export default function EnvelopeIntro({ onOpen, isOpened }) {
  const { couple } = weddingContent;

  return (
    <section className="garden-intro">
      <div className="garden-wash" aria-hidden="true" />
      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <div className="intro-title">
          <p className="section-tag">THE BEGINNING OF FOREVER</p>
          <h1 className="intro-names">
            <span>{couple.groom}</span>
            <span className="intro-ampersand">&amp;</span>
            <span>{couple.bride}</span>
          </h1>
          <p className="intro-date">11 . 11 . 2026</p>
          <p className="intro-quote">
            Giữa muôn vàn cuộc gặp gỡ,
            <br />
            thật đẹp khi hai người đã tìm thấy nhau...
          </p>
        </div>

        <div className={`envelope-shell ${isOpened ? 'is-open' : ''}`}>
          <motion.div
            className="envelope-paper"
            initial={false}
            animate={{ y: isOpened ? -70 : 0, opacity: isOpened ? 1 : 0.96 }}
            transition={{ duration: 1.35, ease: 'easeInOut' }}
          >
            <p className="envelope-label">Wedding Wishes</p>
            <p className="envelope-recipient">Gửi đến</p>
            <p className="envelope-title">{couple.groom} &amp; {couple.bride}</p>
          </motion.div>
          <div className="envelope-flap" />
          <div className="envelope-lid" />
          <div className={`wax-seal ${isOpened ? 'seal-open' : ''}`} aria-hidden="true">
            <Heart size={20} />
            <Heart size={14} />
          </div>
          <button
            type="button"
            className="open-button"
            onClick={onOpen}
            disabled={isOpened}
          >
            Mở món quà nhỏ này ♡
          </button>
        </div>
      </motion.div>
    </section>
  );
}
