'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { VisionScanner, LiveRadar, AISummary, VaultPortfolio } from '@/components/Panels';

export default function LucidVault() {
  const [activePanel, setActivePanel] = useState('scanner');
  const [isPro, setIsPro] = useState(false);
  const [scanCount, setScanCount] = useState(10);

  const panelVariants = {
    initial: { opacity: 0, y: 12, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] text-[#111111] font-sans selection:bg-blue-200 p-4 md:p-6 gap-6 overflow-hidden">
      
      {/* Floating Expandable Dock */}
      <Sidebar 
        activePanel={activePanel} 
        setActivePanel={setActivePanel} 
        isPro={isPro} 
        setIsPro={setIsPro} 
      />

      {/* Main Viewport Window */}
      <main className="flex-1 flex flex-col h-[calc(100vh-48px)] bg-white rounded-3xl shadow-sm border border-neutral-200/60 overflow-hidden relative">
        <header className="px-10 py-8 border-b border-neutral-100 flex justify-between items-end bg-white/80 backdrop-blur-md z-10 sticky top-0">
          <div>
            <h2 className="text-[10px] font-bold text-neutral-400 tracking-[0.3em] uppercase mb-1">
              Alternative Asset Vault
            </h2>
            <h1 className="text-2xl font-semibold tracking-tight text-[#111111] capitalize">
              {activePanel === 'ai-summary' ? 'AI Market Insights' : activePanel.replace('-', ' ')}
            </h1>
          </div>
          <div className="text-[11px] font-mono font-medium tracking-widest text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-full">
            {isPro ? (
              <span className="text-blue-600">PRO TIER ACTIVE</span>
            ) : (
              <span>FREE TIER: {scanCount} SCANS LEFT</span>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-10 py-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-5xl mx-auto"
            >
              {activePanel === 'scanner' && (
                <VisionScanner setPanel={setActivePanel} scanCount={scanCount} setScanCount={setScanCount} isPro={isPro} />
              )}
              {activePanel === 'radar' && <LiveRadar isPro={isPro} />}
              {activePanel === 'ai-summary' && <AISummary />}
              {activePanel === 'portfolio' && <VaultPortfolio isPro={isPro} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
