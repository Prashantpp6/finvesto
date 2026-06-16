import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { ArrowRight, AlertTriangle, TrendingDown, TrendingUp, Lock, Target, Landmark, Sparkles } from 'lucide-react';

function formatCr(v: number) {
  if (v >= 10000000) return `\u20B9${(v / 10000000).toFixed(2)} Cr`;
  if (v >= 100000) return `\u20B9${(v / 100000).toFixed(1)}L`;
  return `\u20B9${Math.round(v).toLocaleString('en-IN')}`;
}
function calcSIP(m: number, r: number, y: number) {
  const rM = r / 100 / 12;
  const n = y * 12;
  return m * (((Math.pow(1 + rM, n) - 1) / rM) * (1 + rM));
}
function calcLumpSum(p: number, r: number, y: number) { return p * Math.pow(1 + r / 100, y); }

const tooltipStyle = { borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,68,139,0.12)', fontSize: '12px' };

function OnTrackCalc() {
  const [age, setAge] = useState(30);
  const [sip, setSip] = useState(10000);
  const [targetCr, setTargetCr] = useState(2);
  const [rateP, setRateP] = useState(12);
  const [gated, setGated] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [unlocked, setUnlocked] = useState(false);

  const retireAge = 60;
  const years = retireAge - age;
  const projected = useMemo(() => calcSIP(sip, rateP, years), [sip, rateP, years]);
  const target = targetCr * 10000000;
  const onTrack = projected >= target;

  const chartData = useMemo(() => {
    const pts = [];
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 10))) {
      pts.push({ year: `Age ${age + y}`, projected: Math.round(calcSIP(sip, rateP, y)), target: Math.round(target * (y / years)) });
    }
    return pts;
  }, [sip, rateP, years, target, age]);

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#EBF2FA' }}>
          <TrendingUp size={22} strokeWidth={1.5} style={{ color: '#00448B' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-[#00448B]">"Am I On Track?"</h2>
          <p className="text-sm text-[#5C7089] font-body">Calculate if your current SIP will hit your retirement target</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {[
            { label: 'Current Age', value: age, min: 20, max: 55, step: 1, fmt: (v: number) => `${v} yrs`, setter: setAge, accent: '#00448B' },
            { label: 'Monthly SIP', value: sip, min: 1000, max: 100000, step: 1000, fmt: (v: number) => `\u20B9${v.toLocaleString('en-IN')}`, setter: setSip, accent: '#00448B' },
            { label: 'Target Corpus', value: targetCr, min: 0.25, max: 10, step: 0.25, fmt: (v: number) => `\u20B9${v} Cr`, setter: setTargetCr, accent: '#FF6100' },
            { label: 'Expected Return', value: rateP, min: 6, max: 18, step: 0.5, fmt: (v: number) => `${v}%`, setter: setRateP, accent: '#FF6100' },
          ].map(({ label, value, min, max, step, fmt, setter, accent }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">{label}</label>
                <span className="text-sm font-heading font-bold" style={{ color: accent }}>{fmt(value)}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: accent }} />
            </div>
          ))}

          <div className={`rounded-2xl p-4 border ${onTrack ? 'border-green-200' : 'border-red-200'}`}
            style={{ background: onTrack ? '#F0FDF4' : '#FEF2F2' }}>
            <p className="text-sm font-heading font-semibold mb-1" style={{ color: onTrack ? '#16A34A' : '#DC2626' }}>
              {onTrack ? 'You are on track!' : 'Gap identified'}
            </p>
            <p className="text-xs font-body text-[#5C7089]">
              Projected corpus: <strong className="text-[#0F1C2E]">{formatCr(projected)}</strong>
              {!onTrack && <><br />Shortfall: <strong style={{ color: '#DC2626' }}>{formatCr(Math.abs(target - projected))}</strong></>}
            </p>
          </div>
        </div>

        <div>
          {!gated ? (
            <div>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                    <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={60} />
                    <Tooltip formatter={(v: number) => formatCr(v)} contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="projected" name="Your SIP" stroke="#00448B" strokeWidth={2} fill="url(#pg1)" />
                    <Area type="monotone" dataKey="target" name="Your Target" stroke="#FF6100" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <button onClick={() => setGated(true)} className="btn-primary w-full justify-center py-3 text-sm">
                <Lock size={14} /> Get Full Detailed Report
              </button>
            </div>
          ) : !unlocked ? (
            <form onSubmit={(e) => { e.preventDefault(); setUnlocked(true); }} className="space-y-4">
              <p className="font-heading font-semibold text-[#00448B] text-sm mb-2">Your free detailed report is ready:</p>
              <input type="text" required placeholder="Your Name" className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input type="tel" required placeholder="Phone Number" className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <button type="submit" className="btn-orange w-full justify-center">Get Full Report <ArrowRight size={14} /></button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                    <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={60} />
                    <Tooltip formatter={(v: number) => formatCr(v)} contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="projected" name="Your SIP" stroke="#00448B" strokeWidth={2.5} fill="url(#pg2)" />
                    <Area type="monotone" dataKey="target" name="Your Target" stroke="#FF6100" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ background: '#EBF2FA' }}>
                  <p className="text-xs text-[#5C7089] font-body mb-1">Projected at {retireAge}</p>
                  <p className="font-heading font-bold text-[#00448B]">{formatCr(projected)}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: onTrack ? '#F0FDF4' : '#FEF2F2' }}>
                  <p className="text-xs text-[#5C7089] font-body mb-1">{onTrack ? 'Surplus' : 'Shortfall'}</p>
                  <p className="font-heading font-bold" style={{ color: onTrack ? '#16A34A' : '#DC2626' }}>{formatCr(Math.abs(target - projected))}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FDCalc() {
  const [fdRate, setFdRate] = useState(6.5);
  const [inflation, setInflation] = useState(6.0);
  const [taxSlab, setTaxSlab] = useState(30);
  const [principal, setPrincipal] = useState(100000);

  const taxAdjusted = fdRate * (1 - taxSlab / 100);
  const realReturn = taxAdjusted - inflation;
  const isNeg = realReturn < 0;

  const compData = [
    { name: 'FD Rate', value: fdRate, fill: '#00448B' },
    { name: 'After Tax', value: parseFloat(taxAdjusted.toFixed(2)), fill: '#FF6100' },
    { name: 'Real Return', value: Math.max(0.01, parseFloat(Math.max(0, realReturn).toFixed(2))), fill: isNeg ? '#DC2626' : '#16A34A' },
  ];

  const after10FD = principal * Math.pow(1 + fdRate / 100 * (1 - taxSlab / 100), 10);
  const after10SIP = calcSIP(principal / 120, 12, 10);

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#FEF2F2' }}>
          <TrendingDown size={22} strokeWidth={1.5} style={{ color: '#DC2626' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-[#00448B]">What Is My FD Really Earning?</h2>
          <p className="text-sm text-[#5C7089] font-body">FD rate minus tax minus inflation = actual real return (usually negative)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {[
            { label: 'FD Interest Rate', value: fdRate, min: 4, max: 9, step: 0.25, fmt: (v: number) => `${v}%`, setter: setFdRate, accent: '#00448B' },
            { label: 'Inflation Rate', value: inflation, min: 3, max: 10, step: 0.25, fmt: (v: number) => `${v}%`, setter: setInflation, accent: '#DC2626' },
          ].map(({ label, value, min, max, step, fmt, setter, accent }) => (
            <div key={label}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">{label}</label>
                <span className="text-sm font-heading font-bold" style={{ color: accent }}>{fmt(value)}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: accent }} />
            </div>
          ))}

          <div>
            <label className="block text-sm font-heading font-semibold text-[#0F1C2E] mb-2">Income Tax Slab</label>
            <div className="flex gap-2">
              {[10, 20, 30].map((s) => (
                <button key={s} onClick={() => setTaxSlab(s)}
                  className="flex-1 py-2 rounded-lg text-sm font-heading font-semibold transition-colors"
                  style={taxSlab === s ? { background: '#00448B', color: 'white' } : { background: '#EBF2FA', color: '#00448B' }}>
                  {s}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-heading font-semibold text-[#0F1C2E]">FD Amount</label>
              <span className="text-sm font-heading font-bold text-[#00448B]">\u20B9{principal.toLocaleString('en-IN')}</span>
            </div>
            <input type="range" min={10000} max={1000000} step={10000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: '#00448B' }} />
          </div>

          <div className={`rounded-2xl p-5 border ${isNeg ? 'border-red-200' : 'border-green-200'}`}
            style={{ background: isNeg ? '#FEF2F2' : '#F0FDF4' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={15} style={{ color: isNeg ? '#DC2626' : '#16A34A' }} />
              <span className="text-sm font-heading font-semibold" style={{ color: isNeg ? '#DC2626' : '#16A34A' }}>Your Real Return</span>
            </div>
            <p className="text-3xl font-heading font-extrabold" style={{ color: isNeg ? '#DC2626' : '#16A34A' }}>
              {realReturn.toFixed(2)}%
            </p>
            {isNeg && <p className="text-xs text-[#5C7089] font-body mt-2">Your money is losing purchasing power every year.</p>}
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" name="Rate %" radius={[6, 6, 0, 0]}>
                  {compData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-[#00448B] text-sm">\u20B9{(principal / 100000).toFixed(1)}L after 10 years:</h4>
            {[
              { label: 'In FD (after tax)', value: after10FD, color: '#0F1C2E' },
              { label: 'Real Value (inflation-adjusted)', value: principal * Math.pow(1 + (taxAdjusted - inflation) / 100, 10), color: isNeg ? '#DC2626' : '#16A34A' },
              { label: 'Equivalent SIP corpus', value: after10SIP, color: '#16A34A' },
            ].map((r) => (
              <div key={r.label} className="flex justify-between items-center py-2 border-b border-[#DDE5F0] last:border-0">
                <span className="text-sm font-body text-[#5C7089]">{r.label}</span>
                <span className="font-heading font-bold text-sm" style={{ color: r.color }}>{formatCr(r.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SIPvsLumpSum() {
  const [monthly, setMonthly] = useState(10000);
  const [lump, setLump] = useState(120000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const sipCorpus = useMemo(() => calcSIP(monthly, rate, years), [monthly, rate, years]);
  const sipInvested = monthly * 12 * years;
  const lsCorpus = useMemo(() => calcLumpSum(lump, rate, years), [lump, rate, years]);
  const sipWins = sipCorpus >= lsCorpus;

  const chartData = useMemo(() => {
    const pts = [];
    for (let y = 1; y <= years; y++) {
      pts.push({ year: `Y${y}`, SIP: Math.round(calcSIP(monthly, rate, y)), 'Lump Sum': Math.round(calcLumpSum(lump, rate, y)) });
    }
    return pts;
  }, [monthly, rate, years, lump]);

  const pieData = [
    { name: 'Returns', value: Math.round(sipCorpus - sipInvested) },
    { name: 'Invested', value: sipInvested },
  ];

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#FFF3EB' }}>
          <TrendingUp size={22} strokeWidth={1.5} style={{ color: '#FF6100' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-[#00448B]">SIP vs Lump Sum Comparator</h2>
          <p className="text-sm text-[#5C7089] font-body">Play with numbers to see which approach works better</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {[
            { label: 'Monthly SIP', value: monthly, min: 1000, max: 100000, step: 1000, fmt: (v: number) => `\u20B9${v.toLocaleString('en-IN')}`, setter: setMonthly, accent: '#00448B' },
            { label: 'Lump Sum Amount', value: lump, min: 10000, max: 5000000, step: 10000, fmt: formatCr, setter: setLump, accent: '#FF6100' },
            { label: 'Annual Return', value: rate, min: 6, max: 18, step: 0.5, fmt: (v: number) => `${v}%`, setter: setRate, accent: '#00448B' },
            { label: 'Duration', value: years, min: 1, max: 30, step: 1, fmt: (v: number) => `${v} yrs`, setter: setYears, accent: '#FF6100' },
          ].map(({ label, value, min, max, step, fmt, setter, accent }) => (
            <div key={label}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">{label}</label>
                <span className="text-sm font-heading font-bold" style={{ color: accent }}>{fmt(value)}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: accent }} />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'SIP', corpus: sipCorpus, invested: sipInvested, wins: sipWins },
              { label: 'Lump Sum', corpus: lsCorpus, invested: lump, wins: !sipWins },
            ].map((r) => (
              <div key={r.label} className="rounded-2xl p-4 border transition-all"
                style={r.wins
                  ? { background: 'linear-gradient(135deg, #00448B, #002A62)', borderColor: 'transparent', color: 'white' }
                  : { background: 'white', borderColor: '#DDE5F0' }}>
                <p className="text-xs font-heading font-semibold uppercase tracking-wide mb-1"
                  style={{ color: r.wins ? '#FF6100' : '#9BAEC8' }}>{r.label} {r.wins ? '\uD83C\uDFC6' : ''}</p>
                <p className="text-lg font-heading font-extrabold" style={{ color: r.wins ? 'white' : '#00448B' }}>{formatCr(r.corpus)}</p>
                <p className="text-xs mt-1 font-body" style={{ color: r.wins ? 'rgba(164,196,228,0.8)' : '#9BAEC8' }}>
                  Invested: {formatCr(r.invested)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="sg3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="lg3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6100" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FF6100" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={65} />
                <Tooltip formatter={(v: number) => formatCr(v)} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="SIP" stroke="#00448B" strokeWidth={2.5} fill="url(#sg3)" />
                <Area type="monotone" dataKey="Lump Sum" stroke="#FF6100" strokeWidth={2} fill="url(#lg3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-5">
            <PieChart width={90} height={90}>
              <Pie data={pieData} cx={40} cy={40} innerRadius={24} outerRadius={42} dataKey="value" strokeWidth={0}>
                <Cell fill="#00448B" />
                <Cell fill="#FF6100" />
              </Pie>
            </PieChart>
            <div className="space-y-2 flex-1">
              {[{ label: 'Returns', color: '#00448B', value: sipCorpus - sipInvested }, { label: 'Invested', color: '#FF6100', value: sipInvested }].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[#5C7089] font-body">{item.label}: </span>
                  <span className="font-heading font-semibold text-[#00448B]">{formatCr(item.value)}</span>
                </div>
              ))}
              <p className="text-xs text-[#9BAEC8] font-body">
                Returns: {((sipCorpus - sipInvested) / sipInvested * 100).toFixed(0)}% of invested
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState(30);
  const [monthlyExp, setMonthlyExp] = useState(50000);
  const [existingCorpus, setExistingCorpus] = useState(500000);
  const [retireAge, setRetireAge] = useState(55);
  const [inflation, setInflation] = useState(6);
  const [returnRate, setReturnRate] = useState(10);

  const yearsToRetire = retireAge - currentAge;
  const futureMonthly = monthlyExp * Math.pow(1 + inflation / 100, yearsToRetire);
  const annualAtRetire = futureMonthly * 12;
  const corpusNeeded = annualAtRetire * 25;
  const existingFuture = existingCorpus * Math.pow(1 + returnRate / 100, yearsToRetire);
  const gap = corpusNeeded - existingFuture;
  const monthlySIPNeeded = gap > 0 ? (() => {
    const rM = returnRate / 100 / 12;
    const n = yearsToRetire * 12;
    if (rM === 0) return gap / n;
    return gap / (((Math.pow(1 + rM, n) - 1) / rM) * (1 + rM));
  })() : 0;

  const chartData = useMemo(() => {
    const pts = [];
    for (let y = 0; y <= yearsToRetire; y += Math.max(1, Math.floor(yearsToRetire / 8))) {
      const projected = existingCorpus * Math.pow(1 + returnRate / 100, y) + (monthlySIPNeeded > 0 ? calcSIP(monthlySIPNeeded, returnRate, y) : 0);
      pts.push({ year: `Age ${currentAge + y}`, corpus: Math.round(projected), target: Math.round(corpusNeeded * (y / yearsToRetire)) });
    }
    return pts;
  }, [existingCorpus, returnRate, monthlySIPNeeded, corpusNeeded, currentAge, yearsToRetire]);

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#F0FDF4' }}>
          <Landmark size={22} strokeWidth={1.5} style={{ color: '#16A34A' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-[#00448B]">Retirement Corpus Calculator</h2>
          <p className="text-sm text-[#5C7089] font-body">Find out exactly how much you need to retire comfortably</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {[
            { label: 'Current Age', value: currentAge, min: 25, max: 50, step: 1, fmt: (v: number) => `${v} yrs`, setter: setCurrentAge, accent: '#00448B' },
            { label: 'Monthly Expenses', value: monthlyExp, min: 10000, max: 200000, step: 5000, fmt: (v: number) => `\u20B9${v.toLocaleString('en-IN')}`, setter: setMonthlyExp, accent: '#FF6100' },
            { label: 'Existing Corpus', value: existingCorpus, min: 0, max: 5000000, step: 50000, fmt: (v: number) => `\u20B9${v.toLocaleString('en-IN')}`, setter: setExistingCorpus, accent: '#16A34A' },
            { label: 'Retirement Age', value: retireAge, min: 45, max: 65, step: 1, fmt: (v: number) => `${v} yrs`, setter: setRetireAge, accent: '#00448B' },
            { label: 'Inflation', value: inflation, min: 3, max: 10, step: 0.5, fmt: (v: number) => `${v}%`, setter: setInflation, accent: '#DC2626' },
            { label: 'Expected Return', value: returnRate, min: 6, max: 15, step: 0.5, fmt: (v: number) => `${v}%`, setter: setReturnRate, accent: '#16A34A' },
          ].map(({ label, value, min, max, step, fmt, setter, accent }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">{label}</label>
                <span className="text-sm font-heading font-bold" style={{ color: accent }}>{fmt(value)}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: accent }} />
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: '#EBF2FA' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Corpus Needed</p>
              <p className="font-heading font-bold text-[#00448B]">{formatCr(corpusNeeded)}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#F0FDF4' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Existing at Retire</p>
              <p className="font-heading font-bold text-[#16A34A]">{formatCr(existingFuture)}</p>
            </div>
            <div className={`rounded-xl p-4 col-span-2`} style={{ background: gap > 0 ? '#FEF2F2' : '#F0FDF4' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">{gap > 0 ? 'Gap to Fill' : 'Surplus'}</p>
              <p className="font-heading font-bold" style={{ color: gap > 0 ? '#DC2626' : '#16A34A' }}>{formatCr(Math.abs(gap))}</p>
            </div>
          </div>
          {gap > 0 && (
            <div className="rounded-xl p-4 border border-[#DDE5F0]" style={{ background: '#FFF8F0' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Monthly SIP needed to close the gap</p>
              <p className="text-2xl font-heading font-extrabold text-[#FF6100]">\u20B9{Math.round(monthlySIPNeeded).toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-[#9BAEC8] font-body mt-1">for {yearsToRetire} years at {returnRate}% return</p>
            </div>
          )}
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={60} />
                <Tooltip formatter={(v: number) => formatCr(v)} contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="corpus" name="Your Corpus" stroke="#16A34A" strokeWidth={2} fill="url(#rg1)" />
                <Area type="monotone" dataKey="target" name="Target" stroke="#FF6100" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalPlanningCalc() {
  const [goalAmount, setGoalAmount] = useState(5000000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [existingSavings, setExistingSavings] = useState(200000);

  const futureExisting = existingSavings * Math.pow(1 + returnRate / 100, years);
  const gap = goalAmount - futureExisting;
  const monthlySIP = gap > 0 ? (() => {
    const rM = returnRate / 100 / 12;
    const n = years * 12;
    if (rM === 0) return gap / n;
    return gap / (((Math.pow(1 + rM, n) - 1) / rM) * (1 + rM));
  })() : 0;

  const totalInvested = existingSavings + monthlySIP * 12 * years;
  const totalReturns = goalAmount - totalInvested;

  const chartData = useMemo(() => {
    const pts = [];
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 8))) {
      const projected = existingSavings * Math.pow(1 + returnRate / 100, y) + (monthlySIP > 0 ? calcSIP(monthlySIP, returnRate, y) : 0);
      pts.push({ year: `Year ${y}`, value: Math.round(projected), goal: Math.round(goalAmount) });
    }
    return pts;
  }, [existingSavings, returnRate, monthlySIP, goalAmount, years]);

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#FFF3EB' }}>
          <Target size={22} strokeWidth={1.5} style={{ color: '#FF6100' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-[#00448B]">Goal Planning Calculator</h2>
          <p className="text-sm text-[#5C7089] font-body">Find the SIP amount needed for any financial goal</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {[
            { label: 'Goal Amount', value: goalAmount, min: 100000, max: 50000000, step: 100000, fmt: (v: number) => `\u20B9${v.toLocaleString('en-IN')}`, setter: setGoalAmount, accent: '#FF6100' },
            { label: 'Time Horizon', value: years, min: 1, max: 30, step: 1, fmt: (v: number) => `${v} years`, setter: setYears, accent: '#00448B' },
            { label: 'Expected Return', value: returnRate, min: 6, max: 18, step: 0.5, fmt: (v: number) => `${v}%`, setter: setReturnRate, accent: '#16A34A' },
            { label: 'Existing Savings', value: existingSavings, min: 0, max: 10000000, step: 50000, fmt: (v: number) => `\u20B9${v.toLocaleString('en-IN')}`, setter: setExistingSavings, accent: '#00448B' },
          ].map(({ label, value, min, max, step, fmt, setter, accent }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">{label}</label>
                <span className="text-sm font-heading font-bold" style={{ color: accent }}>{fmt(value)}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: accent }} />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: '#FFF3EB' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Monthly SIP Needed</p>
              <p className="text-2xl font-heading font-extrabold text-[#FF6100]">\u20B9{Math.round(monthlySIP).toLocaleString('en-IN')}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#F0FDF4' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Returns Earned</p>
              <p className="font-heading font-bold text-[#16A34A]">{formatCr(Math.max(0, totalReturns))}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gp1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6100" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FF6100" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={65} />
                <Tooltip formatter={(v: number) => formatCr(v)} contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" name="Projected" stroke="#FF6100" strokeWidth={2.5} fill="url(#gp1)" />
                <Area type="monotone" dataKey="goal" name="Goal" stroke="#00448B" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Total Invested', value: totalInvested, color: '#0F1C2E' },
              { label: 'Returns', value: Math.max(0, totalReturns), color: '#16A34A' },
              { label: 'Goal Amount', value: goalAmount, color: '#FF6100' },
            ].map((r) => (
              <div key={r.label} className="flex justify-between items-center py-2 border-b border-[#DDE5F0] last:border-0">
                <span className="text-sm font-body text-[#5C7089]">{r.label}</span>
                <span className="font-heading font-bold text-sm" style={{ color: r.color }}>{formatCr(r.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WealthGrowthCalc() {
  const [initialAmount, setInitialAmount] = useState(500000);
  const [monthlySIP, setMonthlySIP] = useState(15000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(15);

  const totalSIPInvested = monthlySIP * 12 * years;
  const totalInvested = initialAmount + totalSIPInvested;
  const lumpFuture = calcLumpSum(initialAmount, returnRate, years);
  const sipFuture = calcSIP(monthlySIP, returnRate, years);
  const totalCorpus = lumpFuture + sipFuture;
  const totalReturns = totalCorpus - totalInvested;
  const multiplier = totalInvested > 0 ? totalCorpus / totalInvested : 0;

  const chartData = useMemo(() => {
    const pts = [];
    for (let y = 0; y <= years; y++) {
      const corpus = calcLumpSum(initialAmount, returnRate, y) + calcSIP(monthlySIP, returnRate, y);
      const invested = initialAmount + monthlySIP * 12 * y;
      pts.push({ year: `Y${y}`, corpus: Math.round(corpus), invested: Math.round(invested) });
    }
    return pts;
  }, [initialAmount, returnRate, monthlySIP, years]);

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#EBF2FA' }}>
          <Sparkles size={22} strokeWidth={1.5} style={{ color: '#00448B' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-[#00448B]">Wealth Growth Simulator</h2>
          <p className="text-sm text-[#5C7089] font-body">See how your wealth grows over time with compounding</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {[
            { label: 'Initial Investment', value: initialAmount, min: 0, max: 5000000, step: 50000, fmt: (v: number) => `\u20B9${v.toLocaleString('en-IN')}`, setter: setInitialAmount, accent: '#00448B' },
            { label: 'Monthly SIP', value: monthlySIP, min: 1000, max: 100000, step: 1000, fmt: (v: number) => `\u20B9${v.toLocaleString('en-IN')}`, setter: setMonthlySIP, accent: '#FF6100' },
            { label: 'Expected Return', value: returnRate, min: 6, max: 18, step: 0.5, fmt: (v: number) => `${v}%`, setter: setReturnRate, accent: '#16A34A' },
            { label: 'Duration', value: years, min: 1, max: 30, step: 1, fmt: (v: number) => `${v} years`, setter: setYears, accent: '#00448B' },
          ].map(({ label, value, min, max, step, fmt, setter, accent }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">{label}</label>
                <span className="text-sm font-heading font-bold" style={{ color: accent }}>{fmt(value)}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: accent }} />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: '#EBF2FA' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Total Corpus</p>
              <p className="text-2xl font-heading font-extrabold text-[#00448B]">{formatCr(totalCorpus)}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#F0FDF4' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Wealth Multiplier</p>
              <p className="text-2xl font-heading font-extrabold text-[#16A34A]">{multiplier.toFixed(1)}x</p>
            </div>
          </div>

          <div className="rounded-xl p-4 border border-[#DDE5F0]" style={{ background: '#FFF8F0' }}>
            <p className="text-xs text-[#5C7089] font-body mb-1">Your {formatCr(totalInvested)} becomes</p>
            <p className="text-lg font-heading font-bold text-[#FF6100]">{formatCr(totalCorpus)} in {years} years</p>
            <p className="text-[10px] text-[#9BAEC8] font-body mt-1">That's {formatCr(totalReturns)} in returns alone</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={65} />
                <Tooltip formatter={(v: number) => formatCr(v)} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="corpus" name="Total Corpus" stroke="#00448B" strokeWidth={2.5} fill="url(#wg1)" />
                <Area type="monotone" dataKey="invested" name="Invested" stroke="#FF6100" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-5">
            <PieChart width={90} height={90}>
              <Pie data={[
                { name: 'Returns', value: Math.round(Math.max(0, totalReturns)) },
                { name: 'Invested', value: Math.round(totalInvested) },
              ]} cx={40} cy={40} innerRadius={24} outerRadius={42} dataKey="value" strokeWidth={0}>
                <Cell fill="#00448B" />
                <Cell fill="#FF6100" />
              </Pie>
            </PieChart>
            <div className="space-y-2 flex-1">
              {[{ label: 'Returns', color: '#00448B', value: totalReturns }, { label: 'Invested', color: '#FF6100', value: totalInvested }].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[#5C7089] font-body">{item.label}: </span>
                  <span className="font-heading font-semibold text-[#00448B]">{formatCr(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calculators() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Am I On Track?', icon: TrendingUp },
    { label: 'FD Real Return', icon: TrendingDown },
    { label: 'SIP vs Lump Sum', icon: TrendingUp },
    { label: 'Retirement Corpus', icon: Landmark },
    { label: 'Goal Planning', icon: Target },
    { label: 'Wealth Growth', icon: Sparkles },
  ];

  return (
    <main className="pt-24">
      <section className="py-14 bg-white border-b border-[#DDE5F0]">
        <div className="container-max text-center">
          <p className="section-label mb-3">Financial Tools</p>
          <h1 className="text-display-lg font-heading font-extrabold text-[#00448B] mb-5">Know Your Numbers</h1>
          <p className="text-xl text-[#5C7089] font-body max-w-2xl mx-auto">
            These calculators give you clarity \u2014 not complexity. Spend 3 minutes with any of them and you'll know more about your financial situation than most people.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-[#DDE5F0] sticky top-[64px] z-40">
        <div className="container-max">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-4 text-sm font-heading font-semibold border-b-2 transition-all duration-200"
                style={activeTab === i
                  ? { borderColor: '#00448B', color: '#00448B' }
                  : { borderColor: 'transparent', color: '#9BAEC8' }}>
                <tab.icon size={14} strokeWidth={2} />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#F7F9FC]">
        <div className="container-max max-w-5xl">
          {activeTab === 0 && <OnTrackCalc />}
          {activeTab === 1 && <FDCalc />}
          {activeTab === 2 && <SIPvsLumpSum />}
          {activeTab === 3 && <RetirementCalc />}
          {activeTab === 4 && <GoalPlanningCalc />}
          {activeTab === 5 && <WealthGrowthCalc />}
        </div>
      </section>

      <section className="py-4 bg-[#F7F9FC] border-t border-[#DDE5F0]">
        <div className="container-max max-w-5xl">
          <p className="text-xs text-[#9BAEC8] font-body text-center">
            * All calculations are illustrative and for educational purposes only. Actual returns will vary. Please consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </section>

      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
        <div className="container-max">
          <h2 className="text-display-md font-heading font-extrabold text-white mb-4">Numbers are useful. A plan is better.</h2>
          <p className="text-blue-200 font-body text-lg max-w-xl mx-auto mb-8">
            These tools show you where you stand. A 20-minute call shows you what to do about it.
          </p>
          <Link to="/contact" className="btn-orange text-base px-8 py-4">
            Book Free Portfolio Review <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
