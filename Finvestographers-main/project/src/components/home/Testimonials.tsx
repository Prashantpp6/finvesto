import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rahul Sharma', role: 'Senior Software Engineer', location: 'Pune', aum: '₹28L+', initials: 'RS', bg: '#00448B',
    text: "I had ₹4 lakh sitting in a savings account for almost two years, just labelled 'investment money'. I kept saying I'd get to it. In my first call, I was asked what I was actually saving for — nobody had asked me that before. Three weeks later that money was working in three different instruments based on my actual goals." },
  { name: 'Sneha Iyer', role: 'Product Manager', location: 'Bengaluru', aum: '₹19L+', initials: 'SI', bg: '#FF6100',
    text: "My company gave me ₹50L group cover and I genuinely thought I was sorted on insurance. I was told in our first meeting that I needed at least ₹1.5 Crore. I had an instant reaction of disbelief — then I saw the math. I now have a ₹1 Crore term plan that costs me ₹780/month." },
  { name: 'Vikram Nair', role: 'Finance Analyst', location: 'Mumbai', aum: '₹34L+', initials: 'VN', bg: '#00448B',
    text: "I was in 9 different mutual funds when I came in for my first review. I genuinely thought diversification meant more funds. I was shown that 6 of those 9 were holding largely the same stocks. I now hold 4 funds. My portfolio is simpler, and the returns are actually better." },
  { name: 'Ajay Mehta', role: 'Textile Business Owner', location: 'Surat', aum: '₹55L+', initials: 'AM', bg: '#FF6100',
    text: "As a business owner I always reinvested everything back into the business. I had no personal financial plan. My first portfolio review showed me that my entire net worth was tied to one business in one sector. We separated personal wealth from business cash flow over six months." },
  { name: 'Ananya Krishnan', role: 'HR Manager', location: 'Chennai', aum: '₹14L+', initials: 'AK', bg: '#00448B',
    text: "I was 29 and had never invested a single rupee. The first conversation was just about my life goals, not funds or NAVs. By the end I had started a ₹8,000/month SIP and understood exactly why that specific fund was chosen for me. It did not feel like a sales meeting." },
  { name: 'Kartik Joshi', role: 'Marketing Executive', location: 'Pune', aum: '₹6L+', initials: 'KJ', bg: '#FF6100',
    text: "I was 24 and making ₹35,000/month. I thought I needed to earn more before I could invest. I was told the single best thing I could do was start ₹3,000/month now rather than ₹10,000/month at 30. I did the maths on the calculator on the website and it made me slightly sick that I had been waiting." },
  { name: 'Priya Desai', role: 'Restaurant Chain Owner', location: 'Ahmedabad', aum: '₹41L+', initials: 'PD', bg: '#00448B',
    text: "I had been sold a ULIP five years ago and kept paying premiums thinking I was investing. When I finally calculated my actual returns versus what a simple term + SIP combination would have given me — the difference was over ₹9 lakh." },
  { name: 'Riya Kapoor', role: 'Content Creator & Freelancer', location: 'Mumbai', aum: '₹8L+', initials: 'RK', bg: '#FF6100',
    text: "My income is irregular — some months great, some slow. I thought SIPs were not for people like me because they are fixed. I learned about flexible SIP options and now I invest a base amount every month and top up in good months." },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="section-pad bg-[#F7F9FC]">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <p className="section-label mb-3">Client Reviews</p>
            <h2 className="text-display-md font-heading font-extrabold text-[#00448B]">
              Real People. Real Results.
            </h2>
          </div>
          <div className="flex gap-3">
            {[{ action: () => setCurrent((c) => Math.max(0, c - 1)), disabled: current === 0, icon: ChevronLeft },
              { action: () => setCurrent((c) => Math.min(totalPages - 1, c + 1)), disabled: current === totalPages - 1, icon: ChevronRight }
            ].map(({ action, disabled, icon: Icon }, i) => (
              <button key={i} onClick={action} disabled={disabled}
                className="w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ borderColor: disabled ? '#DDE5F0' : '#00448B', color: disabled ? '#9BAEC8' : '#00448B' }}
                onMouseEnter={(e) => { if (!disabled) { (e.target as HTMLElement).style.background = '#00448B'; (e.target as HTMLElement).style.color = 'white'; }}}
                onMouseLeave={(e) => { if (!disabled) { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = '#00448B'; }}}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((t) => (
            <div key={t.name} className="card group">
              <Quote size={26} style={{ color: '#EBF2FA' }} className="mb-4" />
              <p className="text-[#0F1C2E] font-accent italic text-[15px] leading-relaxed mb-6 opacity-80">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#DDE5F0]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0"
                  style={{ background: t.bg }}>
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-[#0F1C2E] truncate">{t.name}</p>
                  <p className="text-xs text-[#5C7089] font-body">{t.role}, {t.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-heading font-semibold" style={{ color: '#16A34A' }}>{t.aum}</p>
                  <p className="text-[10px] text-[#9BAEC8] font-body">Under advice</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: i === current ? '32px' : '8px', background: i === current ? '#00448B' : '#C8DCEF' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
