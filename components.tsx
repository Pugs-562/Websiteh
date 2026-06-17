'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { FiCamera, FiTrendingUp, FiBox, FiCpu, FiPlus, FiSun, FiSettings, FiLock } from 'react-icons/fi';

interface SidebarProps {
  activePanel: string;
  setActivePanel: (id: string) => void;
  isPro: boolean;
  setIsPro: (val: boolean) => void;
}

export default function Sidebar({ activePanel, setActivePanel, isPro, setIsPro }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: 'scanner', label: 'Dashboard Scanner', icon: <FiCamera size={18} />, locked: false },
    { id: 'radar', label: 'Live Price Radar', icon: <FiTrendingUp size={18} />, locked: false },
    { id: 'portfolio', label: 'Vault Portfolio', icon: <FiBox size={18} />, locked: false },
    { id: 'ai-summary', label: 'AI Market Insights', icon: <FiCpu size={18} />, locked: true },
  ];

  return (
    <motion.nav
      layout
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="h-[calc(100vh-48px)] bg-white rounded-3xl shadow-sm border border-neutral-200 flex flex-col overflow-hidden relative z-50"
      initial={{ width: 80 }}
      animate={{ width: isExpanded ? 260 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 flex-shrink-0">
        <div className="w-8 h-8 bg-[#111111] rounded-xl flex items-center justify-center flex-shrink-0">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-4 font-bold tracking-wide text-sm whitespace-nowrap"
            >
              LUCID VAULT
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Links */}
      <div className="flex-1 flex flex-col gap-1 px-4 mt-4">
        {navItems.map((item) => {
          const isActive = activePanel === item.id;
          const isLocked = item.locked && !isPro;

          return (
            <button
              key={item.id}
              onClick={() => !isLocked && setActivePanel(item.id)}
              className={`relative flex items-center h-11 rounded-xl transition-all group ${
                isActive
                  ? 'bg-neutral-100 text-[#111111] font-semibold'
                  : isLocked
                  ? 'text-neutral-400 cursor-not-allowed opacity-60'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-[#111111]'
              }`}
            >
              <div className="w-12 flex justify-center items-center flex-shrink-0">
                {item.icon}
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between w-full pr-4 whitespace-nowrap overflow-hidden"
                  >
                    <span className="text-sm">{item.label}</span>
                    {isLocked && <FiLock size={12} className="text-neutral-400" />}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Prominent Action Button (Blue '+' from Image) */}
      <div className="px-4 mb-4 mt-auto">
        <motion.button
          layout
          onClick={() => setActivePanel('scanner')}
          className="bg-[#0066FF] text-white rounded-2xl flex items-center justify-center overflow-hidden w-full hover:bg-blue-600 transition-colors shadow-sm"
          animate={{ height: isExpanded ? 100 : 48, borderRadius: isExpanded ? 16 : 24 }}
        >
          {isExpanded ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center w-full h-full border border-dashed border-blue-400/50 m-2 rounded-xl"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <FiPlus size={16} />
              </div>
              <span className="text-xs font-medium">Scan new asset</span>
              <span className="text-[9px] text-blue-200 mt-0.5">Drag & drop here</span>
            </motion.div>
          ) : (
            <FiPlus size={20} />
          )}
        </motion.button>
      </div>

      {/* Bottom Utility Row */}
      <div className="h-16 flex items-center justify-between px-6 border-t border-neutral-100 flex-shrink-0">
        <div className="flex items-center text-neutral-500 hover:text-black cursor-pointer transition-colors">
          <FiSun size={16} />
          {isExpanded && <span className="ml-3 text-xs font-semibold">Light</span>}
        </div>
        
        {isExpanded && (
          <div className="flex gap-3">
            <button onClick={() => setIsPro(!isPro)} className={`text-[9px] px-2 py-1 rounded font-bold uppercase tracking-widest ${isPro ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-500'}`}>
              PRO
            </button>
            <FiSettings size={16} className="text-neutral-400 hover:text-black cursor-pointer" />
          </div>
        )}
      </div>
    </motion.nav>
  );
}
