import { Search, BarChart2, Map, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01', icon: Search,
    title: 'Consultation',
    description: 'A 20-minute conversation to understand your goals, income, current investments, and what financial success looks like for you.',
    tag: 'Free · No obligation · No sales pitch',
  },
  {
    number: '02', icon: BarChart2,
    title: 'Financial Assessment',
    description: "We analyse your existing investments, insurance, tax situation and identify hidden gaps — including what's costing you money right now.",
    tag: 'Thorough · Evidence-based · Honest',
  },
  {
    number: '03', icon: Map,
    title: 'Strategy Design',
    description: 'A personalized investment roadmap built around your actual goals—not generic advice but a customized plan for every investor.',
    tag: 'Goal-specific · Tax-efficient · Clear',
  },
  {
    number: '04', icon: Rocket,
    title: 'Implementation & Monitoring',
    description: "We don't disappear after onboarding. Regular market updates, periodic reviews with reports — your money stays watched.",
    tag: 'Ongoing · Proactive · Accountable',
  },
];

export default function HowWeWork() {
  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label mb-3">The Process</p>
            <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-5">
              From First Conversation to <span style={{ color: '#16A34A' }}>Growing Wealth</span>
            </h2>
            <p className="text-lg text-[#5C7089] font-body leading-relaxed mb-8">
              Building wealth rarely happens through one big decision. It's the result of a clear plan, disciplined execution and periodic course corrections.
            </p>
            <div className="flex items-center gap-4 p-5 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
              <div className="p-3 rounded-xl bg-white/10 flex-shrink-0">
                <Search size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-heading font-bold text-lg">Start with a free 20-minute call</p>
                <p className="text-blue-200 text-sm font-body">No paperwork. No commitments. Just clarity.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-[#C8DCEF] via-[#FF6100]/30 to-[#C8DCEF] hidden md:block z-0" />
            <div className="space-y-7">
              {steps.map((step, i) => (
                <div key={step.number} className="flex gap-6 group">
                  <div className="relative flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-extrabold text-sm border-2 transition-all duration-300 z-10 relative
                      ${i % 2 === 0
                        ? 'text-white border-transparent'
                        : 'text-[#00448B] border-[#C8DCEF] bg-white'
                      }`}
                      style={i % 2 === 0 ? { background: 'linear-gradient(135deg, #00448B, #0057B3)' } : {}}>
                      {step.number}
                    </div>
                  </div>
                  <div className="pt-2 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon size={15} strokeWidth={1.5} style={{ color: '#FF6100' }} />
                      <h3 className="font-heading font-bold text-[#00448B] text-lg">{step.title}</h3>
                    </div>
                    <p className="text-[#5C7089] font-body text-sm leading-relaxed mb-2">{step.description}</p>
                    <span className="text-xs font-heading font-semibold px-3 py-1 rounded-full"
                      style={{ background: '#FFF3EB', color: '#FF6100' }}>
                      {step.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
