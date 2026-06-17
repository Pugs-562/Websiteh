'use client';

import { FiCamera, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

// --- PANEL 1: VISION SCANNER ---
export function VisionScanner({ setPanel, scanCount, setScanCount, isPro }: any) {
  const handleScan = () => {
    if (!isPro && scanCount <= 0) return alert("Out of free scans! Upgrade to Pro.");
    if (!isPro) setScanCount((prev: number) => prev - 1);
    
    // Simulate Vision API delay, then pivot to market radar
    setTimeout(() => setPanel('radar'), 800);
  };

  return (
    <div 
      onClick={handleScan}
      className="w-full aspect-[21/9] min-h-[400px] border-2 border-neutral-200 border-dashed rounded-3xl bg-[#F9FAFB] flex flex-col items-center justify-center hover:border-[#0066FF]/50 hover:bg-blue-50/30 transition-all group cursor-pointer"
    >
      <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-[#0066FF] mb-6 group-hover:scale-110 transition-transform">
        <FiCamera size={24} />
      </div>
      <h3 className="text-lg font-semibold text-[#111111]">Upload Asset Image</h3>
      <p className="text-sm text-neutral-400 mt-2 max-w-sm text-center leading-relaxed">
        Drop a high-fidelity photograph of your luxury watch, modern art piece, or rare sneaker to evaluate instant secondary market analytics.
      </p>
    </div>
  );
}

// --- PANEL 2: LIVE RADAR ---
export function LiveRadar({ isPro }: { isPro: boolean }) {
  const mockData = [
    { platform: 'Chrono24', seller: 'LuxeWatches Ltd.', price: '$14,200', condition: 'Mint', verified: true },
    { platform: 'StockX', seller: 'Verified Node', price: '$14,500', condition: 'Mint', verified: true },
    { platform: 'eBay', seller: 'TimeKeeper99', price: '$13,850', condition: 'Used', verified: false },
    { platform: 'Grailed', seller: 'ArchivalStore', price: '$12,900', condition: 'Used', verified: false },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex justify-between items-center bg-[#F9FAFB] border border-neutral-100 rounded-2xl p-2 pl-4">
        <div className="flex gap-1">
          {['All', 'Mint', 'Used'].map(cond => (
            <button key={cond} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${cond === 'All' ? 'bg-white shadow-sm text-black border border-neutral-200' : 'text-neutral-500 hover:text-black'}`}>
              {cond}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 pr-2">
          <button disabled={!isPro} className={`px-4 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-2 ${isPro ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}`}>
            Verified Sellers Only {!isPro && '🔒'}
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-neutral-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-neutral-200 text-xs text-neutral-500 uppercase tracking-wider">
              <th className="p-5 font-medium">Marketplace</th>
              <th className="p-5 font-medium">Seller Profile</th>
              <th className="p-5 font-medium">Condition</th>
              <th className="p-5 font-medium text-right">Current Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {mockData.map((item, idx) => (
              <tr key={idx} className="hover:bg-neutral-50 transition-colors text-sm">
                <td className="p-5 font-medium text-[#111111]">{item.platform}</td>
                <td className="p-5 flex items-center gap-2 text-neutral-600">
                  {item.seller}
                  {item.verified && <FiCheckCircle className="text-blue-500" size={14} />}
                </td>
                <td className="p-5 text-neutral-500">{item.condition}</td>
                <td className="p-5 text-right font-medium text-[#111111]">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- PANEL 3: AI SUMMARY ---
export function AISummary() {
  return (
    <div className="bg-[#F9FAFB] border border-neutral-200 rounded-3xl p-10 space-y-8">
      <ul className="space-y-6">
        {[
          { icon: <FiTrendingUp />, title: "Macro Stability", text: "Average price remains highly stable against historical 90-day moving averages. No immediate macro-economic depreciation detected." },
          { icon: <FiCheckCircle />, title: "Optimal Arbitrage", text: "The highest-credibility deal is currently a Mint-condition listing on Chrono24. The seller has a 100% authenticity guarantee." },
          { icon: <FiAlertCircle />, title: "Risk Warning", text: "Avoid current Grailed listings due to unvetted seller profiles and historically high variance in condition reporting." }
        ].map((point, idx) => (
          <li key={idx} className="flex gap-5 items-start bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">{point.icon}</div>
            <div>
              <h4 className="font-semibold text-[#111111] mb-1">{point.title}</h4>
              <p className="text-sm text-neutral-500 leading-relaxed">{point.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- PANEL 4: PORTFOLIO ---
export function VaultPortfolio({ isPro }: { isPro: boolean }) {
  const assets = [
    { name: 'Rolex Submariner Date', ref: '126610LN', value: '$14,200', change: '+2.4%' },
    { name: 'Herman Miller Eames Chair', ref: 'Palisander / Black', value: '$7,495', change: '-0.8%' },
    { name: 'Nike Air Yeezy 2', ref: 'Red October', value: '$11,500', change: '+12.1%' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-[#111111] text-white rounded-3xl p-10 relative overflow-hidden">
        <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest mb-3">Total Estimated Value</p>
        <h2 className="text-5xl font-light tracking-tight">$33,195.00</h2>
        
        {/* Abstract Chart Vector */}
        <svg viewBox="0 0 1000 100" className="absolute bottom-0 left-0 w-full h-32 opacity-30" preserveAspectRatio="none">
          <path d="M0,100 C150,80 300,90 450,40 C600,-10 750,60 1000,20" fill="none" stroke="#0066FF" strokeWidth="4" />
        </svg>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#111111] mb-4 pl-2">Current Holdings ({assets.length}/5 Free Limit)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((asset, idx) => (
            <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-[#111111]">{asset.name}</p>
                <p className="text-xs text-neutral-400 mt-1">{asset.ref}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[#111111]">{asset.value}</p>
                <p className={`text-xs mt-1 font-medium ${asset.change.startsWith('+') ? 'text-green-500' : 'text-neutral-400'}`}>
                  {asset.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
