import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const posts = [
  {
    slug: 'sip-started-at-27-vs-32',
    category: 'SIP Basics', categoryBg: '#FFF3EB', categoryColor: '#FF6100',
    readTime: '3 min',
    title: 'SIP Started at 27 vs 32. The Difference Will Bother You.',
    excerpt: "Arjun starts at 27. Priya starts at 32. Same fund, same returns, same ₹10,000/month. At age 60, the gap is ₹1.6 Crore — from just 5 years of waiting.",
    highlight: '₹1.6 Cr gap from 5 years', highlightColor: '#DC2626',
  },
  {
    slug: 'salary-12-lakh-month-end-tight',
    category: 'Personal Finance', categoryBg: '#EBF2FA', categoryColor: '#00448B',
    readTime: '4 min',
    title: "I Earn ₹12L a Year. Why Does Month-End Still Feel Tight?",
    excerpt: "You got the promotion. The salary is decent. And yet, by the 25th of every month, you're watching your account like a countdown timer. Here's why — and the fix.",
    highlight: 'Most common mistake', highlightColor: '#00448B',
  },
  {
    slug: 'company-cover-50-lakh-not-enough',
    category: 'Insurance', categoryBg: '#FEF2F2', categoryColor: '#DC2626',
    readTime: '4 min',
    title: "Your Company Gave You ₹50L Life Cover. It's Not Enough.",
    excerpt: "₹50L sounds like a lot. A healthy 32-year-old earning ₹12L needs minimum ₹1.8 Crore coverage. The math will change how you see your company insurance.",
    highlight: '4x less than needed', highlightColor: '#DC2626',
  },
  {
    slug: 'three-questions-before-first-sip',
    category: 'Beginners', categoryBg: '#F0FDF4', categoryColor: '#16A34A',
    readTime: '3 min',
    title: '3 Questions to Ask Before Starting Your First SIP',
    excerpt: "Everyone tells you to start a SIP. Very few tell you what to think about before you start one. Walk in with these 3 answers and your first conversation becomes 10x more productive.",
    highlight: 'Must-read for beginners', highlightColor: '#16A34A',
  },
];

export default function BlogPreview() {
  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <p className="section-label mb-3">Market Insights</p>
            <h2 className="text-display-md font-heading font-extrabold text-[#00448B]">
              Financial Clarity, Not Jargon
            </h2>
          </div>
          <Link to="/blog"
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[#00448B] hover:text-[#FF6100] transition-colors">
            All Articles <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="card group block">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-heading font-semibold px-3 py-1 rounded-full"
                  style={{ background: post.categoryBg, color: post.categoryColor }}>
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-body" style={{ color: '#9BAEC8' }}>
                  <Clock size={11} />{post.readTime} read
                </div>
              </div>
              <h3 className="font-heading font-bold text-[#00448B] text-lg mb-3 leading-snug group-hover:text-[#FF6100] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#5C7089] font-body text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[#DDE5F0]">
                <span className="text-xs font-heading font-semibold" style={{ color: post.highlightColor }}>{post.highlight}</span>
                <ArrowRight size={16} style={{ color: '#00448B' }} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
