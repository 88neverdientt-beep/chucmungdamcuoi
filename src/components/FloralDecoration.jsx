const petals = [
  { left: '8%', top: '8%', scale: 1.2 },
  { left: '17%', top: '28%', scale: 0.9 },
  { left: '80%', top: '10%', scale: 1.15 },
  { left: '86%', top: '26%', scale: 0.85 },
  { left: '10%', top: '68%', scale: 0.8 },
  { left: '84%', top: '73%', scale: 1.1 },
];

export default function FloralDecoration({ burst = false }) {
  return (
    <div aria-hidden="true" className="floral-layer">
      {petals.map((petal, index) => (
        <span
          key={index}
          className={`floral-petal ${burst ? 'is-burst' : ''}`}
          style={{
            left: petal.left,
            top: petal.top,
            '--petal-scale': petal.scale,
            animationDelay: `${index * (burst ? 0.1 : 1.2)}s`,
          }}
        />
      ))}
    </div>
  );
}
