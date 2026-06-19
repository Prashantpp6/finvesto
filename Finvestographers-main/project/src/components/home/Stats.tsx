import { useEffect, useRef, useState } from 'react';
import { Users, BarChart3, Star, Clock, Target } from 'lucide-react';

const stats = [
  { icon: Users, value: 87, suffix: '+', label: 'Families Guided', bg: '#EBF2FA', color: '#00448B' },
  { icon: BarChart3, value: 165, suffix: '+', label: 'Investment Plans Created', bg: '#FFF3EB', color: '#FF6100' },
  { icon: Star, value: 98, suffix: '%', label: 'Client Satisfaction', bg: '#F0FDF4', color: '#16A34A' },
  { icon: Clock, value: 5, suffix: '+', label: 'Years of Experience', bg: '#EBF2FA', color: '#00448B' },
  { icon: Target, value: 25, suffix: '+', label: 'Fund Houses', bg: '#FFF3EB', color: '#FF6100' },
];


function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        const steps = 60;
        const inc = target / steps;
        let cur = 0;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(cur));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-4xl font-heading font-extrabold" style={{ color: '#00448B' }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-white border-y border-[#DDE5F0]">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="section-label mb-3">By the Numbers</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B]">
            Trusted by Families Across India
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="card text-center group">
              <div className="inline-flex p-3 rounded-2xl mb-4" style={{ background: stat.bg }}>
                <stat.icon size={22} strokeWidth={1.5} style={{ color: stat.color }} />
              </div>
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-[#5C7089] font-body mt-1 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
