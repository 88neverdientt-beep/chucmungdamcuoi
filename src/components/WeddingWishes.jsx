import { motion } from 'framer-motion';
import { Gem, Heart, House } from 'lucide-react';
import { weddingContent } from '../data/weddingContent';

const icons = {
  heart: Heart,
  home: House,
  gem: Gem,
};

export default function WeddingWishes() {
  const { wishes } = weddingContent;

  return (
    <section className="section-shell wishes-shell">
      <div className="section-heading">
        <p className="section-tag">THREE LITTLE WISHES</p>
        <h2>Ba điều ước nhỏ dành cho hai bạn</h2>
      </div>

      <div className="wishes-grid">
        {wishes.map((wish, index) => {
          const Icon = icons[wish.icon];

          return (
            <motion.article
              key={wish.title}
              className="wish-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="wish-icon-wrap">
                <Icon size={28} />
              </div>
              <h3>{wish.title}</h3>
              <p>{wish.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
