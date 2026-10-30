import { motion } from 'framer-motion';
import { weddingContent } from '../data/weddingContent';

export default function HeartfeltLetter() {
  const { letter, couple } = weddingContent;

  return (
    <section className="section-shell letter-shell">
      <motion.div
        className="letter-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="letter-header">
          <span className="letter-kicker">Gửi Vân Hùng và Thảo Vi thân mến!</span>
        </div>

        <div className="letter-body">
          {letter.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="letter-signoff">
          <p>Thân gửi hai bạn,</p>
          <p>{couple.closing}</p>
        </div>
      </motion.div>
    </section>
  );
}
