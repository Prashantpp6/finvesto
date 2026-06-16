import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, PhoneCall, ClipboardList } from 'lucide-react';

const philosophy = [
  "We don't sell products—we build plans",
  'Transparent approach',
  'We stay with you until goal accomplishment',
  'Regular reviews, real accountability',
];

export default function About() {
  return (
    <section className="section-pad bg-[#F7F9FC]">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0"
              style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Financial Advisor"
                className="w-full h-full object-cover mix-blend-overlay opacity-50"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <p className="text-white font-brand font-extrabold text-xl mb-1">Finvestographers</p>
                  <p className="text-blue-200 text-sm font-body">Financial Planner & AMFI Registered MFD</p>
                </div>
              </div>
            </div>
            {/* Our Promise — positioned below image, no overlap */}
            <div className="mt-5 hidden lg:block"
              style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #DDE5F0', boxShadow: '0 8px 32px rgba(0,68,139,0.1)' }}>
              <p className="text-xs text-[#5C7089] font-body uppercase tracking-wide mb-2">Our Promise</p>
              <p className="text-[#00448B] font-heading font-bold text-sm leading-snug">
                "We don't disappear after onboarding."
              </p>
              <div className="mt-3 flex gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#EBF2FA' }}>
                  <CheckCircle size={14} strokeWidth={2} style={{ color: '#00448B' }} />
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FFF3EB' }}>
                  <PhoneCall size={14} strokeWidth={2} style={{ color: '#FF6100' }} />
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F0FDF4' }}>
                  <ClipboardList size={14} strokeWidth={2} style={{ color: '#16A34A' }} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="section-label mb-3">Who We Are</p>
            <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-5">
              We Graph Your Investment Journey
            </h2>
            <p className="text-lg text-[#5C7089] font-body leading-relaxed mb-4">
              Finvestographers helps individuals, families and businesses achieve financial goals through mutual fund investments, bonds, pre-IPO investments, tax-saving, retirement planning, child education planning and wealth management solutions.
            </p>
            <p className="text-[#5C7089] font-body leading-relaxed mb-6">
              We built this practice because we saw too many smart, hardworking people making the same avoidable mistakes \u2014 wrong insurance, idle savings, or investments scattered with no clear purpose.
            </p>
            <div className="space-y-3 mb-8">
              {philosophy.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EBF2FA' }}>
                    <CheckCircle size={12} strokeWidth={2.5} style={{ color: '#00448B' }} />
                  </div>
                  <span className="font-body text-[#0F1C2E] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary">
              Our Approach <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
