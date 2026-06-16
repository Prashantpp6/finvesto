import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

function formatCr(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${val.toLocaleString('en-IN')}`;
}
function calcSIP(monthly: number, ratePercent: number, years: number) {
  const r = ratePercent / 100 / 12;
  const n = years * 12;
  return monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
}
const durations = [10, 15, 20, 25, 30];

export default function WealthGrowth() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);

  const chartData = useMemo(() =>
    durations.map((years) => {
      const wealth = calcSIP(monthly, rate, years);
      const invested = monthly * 12 * years;
      return { years: `${years}Y`, Invested: invested, Wealth: wealth, Returns: wealth - invested };
    }), [monthly, rate]);

  const finalRow = chartData[chartData.length - 1];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-[#DDE5F0] rounded-xl shadow-lg p-4 text-sm">
          <p className="font-heading font-bold text-[#00448B] mb-2">{label} of investing</p>
          {payload.map((p: any) => (
            <div key={p.name} className="flex justify-between gap-6">
              <span className="text-[#5C7089]">{p.name}</span>
              <span className="font-semibold text-[#00448B]">{formatCr(p.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="section-pad bg-[#F7F9FC]">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Wealth Compounding</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-4">
            See The Power of Long-Term Investing
          </h2>
          <p className="text-lg text-[#5C7089] font-body max-w-2xl mx-auto">
            Time in market beats timing the market — every single time. Adjust the numbers below and watch compound interest work.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Controls */}
          <div className="bg-white rounded-2xl border border-[#DDE5F0] p-6 space-y-6" style={{ boxShadow: '0 4px 20px rgba(0,68,139,0.06)' }}>
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">Monthly SIP</label>
                <span className="text-xl font-heading font-extrabold text-[#00448B]">₹{monthly.toLocaleString('en-IN')}</span>
              </div>
              <input type="range" min={1000} max={100000} step={1000} value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: '#00448B' }} />
              <div className="flex justify-between text-xs text-[#9BAEC8] mt-1 font-body">
                <span>₹1,000</span><span>₹1,00,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">Expected Return</label>
                <span className="text-xl font-heading font-extrabold text-[#FF6100]">{rate}%</span>
              </div>
              <input type="range" min={6} max={18} step={0.5} value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: '#FF6100' }} />
              <div className="flex justify-between text-xs text-[#9BAEC8] mt-1 font-body">
                <span>6%</span><span>18%</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#DDE5F0]">
              <p className="text-xs font-heading font-semibold text-[#5C7089] uppercase tracking-wider">At 30 years</p>
              {[
                { label: 'Total Invested', value: finalRow.Invested, color: '#5C7089' },
                { label: 'Estimated Wealth', value: finalRow.Wealth, color: '#00448B', large: true },
                { label: 'Potential Returns', value: finalRow.Returns, color: '#16A34A' },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center">
                  <span className="text-sm text-[#5C7089] font-body">{r.label}</span>
                  <span className={`font-heading font-bold ${r.large ? 'text-xl' : 'text-sm'}`} style={{ color: r.color }}>
                    {formatCr(r.value)}
                  </span>
                </div>
              ))}
              <div className="mt-3 p-3 rounded-xl" style={{ background: '#EBF2FA' }}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={13} strokeWidth={2} style={{ color: '#00448B' }} />
                  <span className="text-xs font-heading font-semibold text-[#00448B]">Wealth Multiplier</span>
                </div>
                <p className="text-2xl font-heading font-extrabold text-[#00448B]">
                  {(finalRow.Wealth / finalRow.Invested).toFixed(1)}<span style={{ color: '#FF6100' }}>x</span>
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#DDE5F0] p-6" style={{ boxShadow: '0 4px 20px rgba(0,68,139,0.06)' }}>
            <h3 className="font-heading font-bold text-[#00448B] mb-6">Wealth Projection Over Time</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                  <defs>
                    <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="iGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6100" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#FF6100" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                  <XAxis dataKey="years" tick={{ fontSize: 12, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCr(v)} width={70} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '13px', fontFamily: 'Inter' }} />
                  <Area type="monotone" dataKey="Invested" name="Total Invested" stroke="#FF6100" strokeWidth={2} fill="url(#iGrad)" />
                  <Area type="monotone" dataKey="Wealth" name="Estimated Wealth" stroke="#00448B" strokeWidth={2.5} fill="url(#wGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 border-t border-[#DDE5F0] pt-4">
              <div className="grid grid-cols-4 gap-2 text-xs font-heading font-semibold text-[#9BAEC8] uppercase tracking-wide mb-3">
                <span>Duration</span><span>Invested</span><span>Wealth</span><span>Multiplier</span>
              </div>
              {chartData.map((row) => (
                <div key={row.years} className="grid grid-cols-4 gap-2 py-2.5 border-b border-[#EEF3FA] last:border-0 hover:bg-[#F7F9FC] rounded-lg px-1 transition-colors">
                  <span className="text-sm font-heading font-bold text-[#00448B]">{row.years}</span>
                  <span className="text-sm font-body text-[#5C7089]">{formatCr(row.Invested)}</span>
                  <span className="text-sm font-heading font-semibold text-[#00448B]">{formatCr(row.Wealth)}</span>
                  <span className="text-sm font-heading font-bold" style={{ color: '#16A34A' }}>{(row.Wealth / row.Invested).toFixed(1)}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-[#9BAEC8] text-center mt-6 font-body">
          * Projections are illustrative. Actual returns depend on market conditions. Past performance is not indicative of future results.
        </p>
      </div>
    </section>
  );
}
