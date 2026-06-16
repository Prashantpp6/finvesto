export interface BlogPost {
  slug: string;
  category: string;
  categoryColor: string;
  readTime: string;
  title: string;
  excerpt: string;
  date: string;
  highlight: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'salary-12-lakh-month-end-tight',
    category: 'Personal Finance',
    categoryColor: 'bg-navy-100 text-navy-700',
    readTime: '4 min',
    title: 'I Earn ₹12L a Year. Why Does Month-End Still Feel Tight?',
    excerpt: "You got the promotion. The salary is decent. And yet, by the 25th of every month, you're watching your account like a countdown timer. You're not bad with money. You're just not using a system.",
    date: 'June 5, 2025',
    highlight: 'Most common for salaried professionals',
    content: `You got the promotion. The salary is decent — better than most of your college friends, actually. And yet, by the 25th of every month, you're watching your account like it's a countdown timer.

You're not bad with money. You're just not using a system.

**Here's what typically happens to a ₹12L salary in India:**

Rent or EMI: 30–35% gone before you blink. Lifestyle creep follows every raise — subscriptions, dining out, travel quietly inflate. "I'll invest the rest" becomes a myth because the rest doesn't exist by month-end. And ₹2–3L sits idle in savings at 3.5% while inflation runs at 6%+.

**The uncomfortable math**

If you have ₹2L sitting in a savings account for 2 years, you've lost approximately ₹50,000 in real purchasing power. Not because you spent it. Because you didn't decide what to do with it.

The fix is not a budgeting app. It's a decision made once that runs on autopilot.

**The age-of-starting problem**

A SIP of ₹15,000/month started at 28 will outperform ₹40,000/month started at 35 — assuming the same return rate. The gap isn't discipline. It's time.

Compound interest is the only force in finance that works for you while you sleep. But it needs years to work. Every month you delay is a month of compounding you can never recover.

**What the system looks like**

1. Automate your investments on the 1st of every month — before lifestyle spending happens
2. Emergency fund first: 6 months of expenses in a liquid fund
3. Term insurance: minimum 15x annual income
4. Then SIPs: equity funds aligned to your goals and timeline

If you're reading this and recognising yourself, you don't need more salary. You need a 20-minute conversation.`,
  },
  {
    slug: 'sip-started-at-27-vs-32',
    category: 'SIP Basics',
    categoryColor: 'bg-gold-100 text-gold-700',
    readTime: '3 min',
    title: 'SIP Started at 27 vs 32. The Difference Will Bother You.',
    excerpt: "Arjun starts a ₹10,000/month SIP at 27. Priya starts at 32. Same fund, same returns, same amount. At 60, the gap is ₹1.6 Crore — from just 5 years of waiting.",
    date: 'June 1, 2025',
    highlight: '₹1.6 Cr gap from 5 years',
    content: `Let's keep this short, because the numbers do the talking.

Arjun starts a ₹10,000/month SIP at age 27. Priya starts the same SIP at 32. Same fund. Same returns (assumed 12% CAGR). Same ₹10,000/month.

**At age 60:**
- Arjun invested: ₹39.6L total. Corpus: **₹3.49 Crore**
- Priya invested: ₹33.6L total. Corpus: **₹1.89 Crore**

Priya invested only ₹6L less. But her corpus is ₹1.6 Crore smaller.

That ₹1.6 Crore gap is not because Priya was irresponsible. It's because she waited 5 years. Five years she probably spent thinking "I'll start when I have more money" or "I'll start after this loan is done."

**The most expensive financial mistake is not a bad investment. It's a delayed one.**

Why does starting earlier matter so much? Compound interest. In the early years, returns on returns on returns start building up. By year 15, the returns you earned in years 1–5 have had a decade to compound. That's the multiplier effect Priya never got.

**What this means for you**

If you're 25, starting ₹5,000/month today beats starting ₹15,000/month at 35. By a lot.

If you're 30, the best time was 5 years ago. The second best time is today. Not next month when your increment comes. Not after your car loan ends. **Today.**

There is no better time than right now.`,
  },
  {
    slug: 'company-cover-50-lakh-not-enough',
    category: 'Insurance',
    categoryColor: 'bg-red-100 text-alert-red',
    readTime: '4 min',
    title: "Your Company Gave You ₹50L Life Cover. It's Not Enough. Here's the Math.",
    excerpt: "Your HR portal says ₹50L group life insurance. It sounds like a lot. It isn't. Here's the real math — and it will change how you see your company insurance.",
    date: 'May 28, 2025',
    highlight: '4x less coverage than needed',
    content: `Your HR portal says you have group life insurance. ₹50L cover. It sounds like a lot.

It isn't. Let me show you why.

**The coverage calculation**

If you earn ₹12L/year and you're 32 years old, your family would need your income for roughly 28 more years (until normal retirement). At a 6% inflation rate, they don't just need ₹12L/year — they need an income that grows every year.

The thumb rule used by financial planners: **your life cover should be 15–20x your annual income.**

15x ₹12L = **₹1.8 Crore minimum cover needed.**

Your company gave you ₹50L. That's 4x.

And it disappears the day you resign, get laid off, or switch jobs.

**The cost of doing it right**

A ₹1 Crore term insurance plan for a healthy 32-year-old costs approximately ₹800–900/month. Less than most people spend on food delivery in a week.

A ₹2 Crore plan might cost ₹1,400–1,600/month. Still less than a weekend dinner out for a family of four.

The premium is a fraction of what people typically spend on impulse purchases. The protection is irreplaceable.

**Something most advisors won't tell you**

ULIPs are not the answer. They give you inadequate insurance and mediocre returns — two problems for the price of one product.

A ₹50L ULIP with a ₹2L annual premium will give you 4x return on premium over 20 years in the best case scenario. A ₹1,400/month term plan + ₹17,000/month SIP will give you 15x.

Separate your insurance and your investment. Always.

**The most dangerous insurance gap is the one you don't know you have.**

Want to know if your current cover is enough? We'll tell you in 5 minutes — no products, just numbers.`,
  },
  {
    slug: 'three-questions-before-first-sip',
    category: 'Beginners',
    categoryColor: 'bg-green-100 text-success-green',
    readTime: '3 min',
    title: '3 Questions to Ask Before Starting Your First SIP',
    excerpt: "Everyone tells you to start a SIP. Very few tell you what to think about before you start one. Walk in with these 3 answers and your first conversation becomes 10x more productive.",
    date: 'May 22, 2025',
    highlight: 'Must-read before you start',
    content: `Everyone tells you to start a SIP. Fair advice. But very few tell you what to think about before you start one.

Walk in with these 3 answers and your first conversation with any advisor immediately becomes 10x more productive.

**Question 1: What is this money actually for?**

"Growing wealth" is not an answer. "Buying a house in 7 years" is. "Retiring at 55" is. "My kid's education in 2034" is.

The goal determines the fund type, the risk level, and the tenure. A 7-year goal requires a completely different fund than a 25-year goal. Without a goal, you're just hoping — and hope is not a strategy.

**Question 2: What happens if this investment drops 30% next year?**

This isn't hypothetical — it happens. The 2020 crash happened. Markets recovered. But many investors panic-sold at the bottom and locked in their losses forever.

Before you invest, be honest: can you watch ₹2L become ₹1.4L on paper without withdrawing? If no, you need a more conservative allocation. There's no shame in that — the goal is an investment you can actually stick with.

**Question 3: Is my income protected?**

A SIP is only as good as your ability to keep funding it. If your income stops — job loss, illness, accident — your SIP stops. Your investments stall right when you need them most.

Term insurance and an emergency fund of 6 months' expenses should be in place before aggressive SIP amounts. The foundation before the building.

**Most advisors skip these questions because they're eager to onboard you. The right advisor asks them before recommending anything.**

Book a 20-minute call. I'll ask you these questions — and a few more — before recommending a single fund.`,
  },
  {
    slug: 'rbi-rate-decision-sip-plain-english',
    category: 'Market Updates',
    categoryColor: 'bg-blue-100 text-blue-700',
    readTime: '3 min',
    title: "RBI Held Rates Again. Here's What That Means for Your SIP — in Plain English.",
    excerpt: "Every few months, your newsfeed fills with 'RBI holds repo rate'. Most investors either ignore it or come away more confused. Here's what it actually means for your money.",
    date: 'May 18, 2025',
    highlight: 'Market update explained simply',
    content: `Every few months, the RBI announces a rate decision and your news feed fills with "RBI holds repo rate at X%". Most investors either ignore it or google it and come away more confused.

Here's what it actually means for your money — no jargon.

**What the repo rate is**

The repo rate is the rate at which RBI lends money to banks. When this rate is high, borrowing becomes expensive → companies invest less → economy slows → inflation comes down. When it's low, borrowing is cheap → spending increases → economy grows → but inflation can rise.

The RBI uses this lever to balance growth and inflation.

**What a rate hold means for your investments**

**Debt mutual funds:** Status quo. No immediate NAV change from rate movement. If you hold short-duration debt funds, you're fine.

**Equity funds:** Generally positive. Stable rates mean stable borrowing costs for companies → better margins → better earnings → potentially better stock prices. Not a guarantee, but historically, stable rate environments have favoured equity investors.

**Your home loan EMI:** No change if you're on a floating rate loan linked to repo. (If rates start falling, your EMI might reduce — watch for it.)

**FDs:** Rates likely to stay flat. If you were hoping for higher FD rates, they're not coming soon.

**The practical implication for you**

If you've been sitting on cash waiting for "the right time" to invest, a rate hold is a signal that the macro environment is stable. Stable environments reward investors who stay invested and penalise those waiting on the sidelines.

Markets don't wait for your confidence to return. They move while you're deciding.

The best response to a rate hold? Keep your SIPs running, stay invested in your equity allocation, and don't make any dramatic moves based on a single RBI announcement.`,
  },
];
