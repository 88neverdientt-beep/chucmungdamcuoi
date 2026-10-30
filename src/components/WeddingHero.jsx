import { motion } from 'framer-motion';
import { weddingContent } from '../data/weddingContent';

export default function WeddingHero() {
  const { couple } = weddingContent;

  return (
    <section className="section-shell hero-shell">
      <div className="hero-inner">
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          THE BEGINNING OF FOREVER
        </motion.p>

        <div className="names-wrap">
          <motion.div
            className="name-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="name-script">{couple.groom}</span>
          </motion.div>

          <motion.span
            className="ampersand"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            &amp;
          </motion.span>

          <motion.div
            className="name-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="name-script">{couple.bride}</span>
          </motion.div>
        </div>

        <motion.div
          className="date-line"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {couple.date.replaceAll('.', ' . ').split('').map((char, index) => (
            <span key={index} className={char === '.' ? 'dot' : 'digit'}>
              {char}
            </span>
          ))}
        </motion.div>

        <motion.p
          className="hero-quote"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
        >
          {couple.quote}
        </motion.p>
      </div>
    </section>
  );
}
