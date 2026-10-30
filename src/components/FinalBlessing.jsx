import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function FinalBlessing({ onScrollTop }) {
  const [celebrating, setCelebrating] = useState(false);

  return (
    <section className="section-shell final-shell">
      <div className="final-content">
        <div className="final-heading">
          <p className="section-tag">FOREVER STARTS TODAY</p>
          <h2>To a Beautiful Forever</h2>
        </div>

        <div className="final-names">Vân Hùng ♡ Thảo Vi</div>

        <p className="final-message">
          Chúc hai bạn một đời thương nhau,
          <br />
          một đời bình yên,
          <br />
          một đời hạnh phúc.
        </p>

        <p className="final-note">
          Mong rằng khi mái tóc đã bạc màu,
          <br />
          hai bạn vẫn nắm tay nhau,
          <br />
          và mỉm cười như ngày đầu tiên.
        </p>

        <div className="final-date">11 . 11 . 2026</div>
        <div className="final-tagline">THE BEGINNING OF FOREVER</div>

        <motion.button
          type="button"
          className="blessing-button"
          whileTap={{ scale: 0.97 }}
          onClick={() => setCelebrating(true)}
        >
          Gửi ngàn lời chúc ♡
        </motion.button>

        {celebrating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="celebration-box"
          >
            <span className="celebration-particles" aria-hidden="true">
              {Array.from({ length: 10 }, (_, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 24, x: (index - 4.5) * 8, scale: 0.6 }}
                  animate={{
                    opacity: [0, 0.9, 0],
                    y: -70 - (index % 4) * 14,
                    x: (index - 4.5) * 18,
                    scale: [0.6, 1, 0.8],
                  }}
                  transition={{ duration: 2, delay: index * 0.07, ease: 'easeOut' }}
                >
                  {index % 3 === 0 ? <Heart size={15} /> : <span className="petal-mark">✿</span>}
                </motion.span>
              ))}
            </span>
            <span className="celebration-sparkles"><Sparkles size={18} /></span>
            <p>Hạnh phúc nhé, Vân Hùng và Thảo Vi!</p>
            <p>Chúc hai bạn trăm năm hạnh phúc!</p>
          </motion.div>
        )}

        <button type="button" className="back-to-top" onClick={onScrollTop}>
          <ArrowUp size={16} />
          Xem lại từ đầu
        </button>
      </div>
    </section>
  );
}
