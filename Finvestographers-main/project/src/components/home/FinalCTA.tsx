import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative section-pad overflow-hidden" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FF6100 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #4A8EC5 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
        {/* Background grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGrid)" />
        </svg>
      </div>

      <div className="container-max relative z-10 text-center">
        <p className="font-heading font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#FF6100' }}>
          Take The First Step
        </p>
        <h2 className="text-display-lg font-heading font-extrabold text-white mb-5 max-w-3xl mx-auto leading-tight">
          Your Financial Future Starts Today
        </h2>
        <p className="text-blue-200 text-xl font-body leading-relaxed max-w-2xl mx-auto mb-10">
          Build wealth with confidence through disciplined investing and expert guidance. A 20-minute conversation could change the trajectory of your financial life.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link to="/contact" className="btn-cta text-base px-8 py-4">
            Book Free Consultation <ArrowRight size={18} />
          </Link>
          <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-white font-heading font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
            <MessageCircle size={18} strokeWidth={2} />
            Chat on WhatsApp
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm">
          {['87+ Families Guided', '₹1 Cr+ Under Advice', '0 ULIPs Recommended', 'AMFI Registered'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-blue-300">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF6100' }} />
              <span className="font-body">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
