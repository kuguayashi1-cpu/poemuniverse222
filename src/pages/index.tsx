'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Background from '../components/Background';
import InputSection from '../components/InputSection';
import OutputSection from '../components/OutputSection';
import HistoryPanel from '../components/HistoryPanel';

interface HistoryItem {
  id: string;
  input: string;
  poetry: string;
  floatingText: string;
  timestamp: Date;
}

export default function Home() {
  const [poetryResult, setPoetryResult] = useState('');
  const [floatingText, setFloatingText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const generatePoetry = (text: string): string => {
    // Enhanced poetry generation logic
    const lines = text.split(/[。！？]/).filter(line => line.trim());
    const poetryLines = lines.map(line => {
      if (line.length <= 4) return line;
      if (line.length <= 8) return line.substring(0, 4) + '\n' + line.substring(4);
      if (line.length <= 12) {
        return line.substring(0, 4) + '\n' + line.substring(4, 8) + '\n' + line.substring(8);
      }
      return line.substring(0, 4) + '\n' + line.substring(4, 8) + '\n' + line.substring(8, 12) + '\n' + line.substring(12);
    });
    return poetryLines.join('\n\n');
  };

  const generateFloatingText = (text: string): string => {
    const chars = '诗星梦幻美意空灵飘浮游荡飞翔闪烁宇宙星辰月光清风流水花香鸟语';
    const inputChars = text.split('').filter(char => /[\u4e00-\u9fff]/.test(char));
    const randomChars = Array.from({ length: 30 }, () => chars[Math.floor(Math.random() * chars.length)]);
    return [...inputChars, ...randomChars].join('');
  };

  const handleGenerate = async (inputText: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const poetry = generatePoetry(inputText);
    const floating = generateFloatingText(inputText);
    
    setPoetryResult(poetry);
    setFloatingText(floating);
    
    // Add to history
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      input: inputText,
      poetry,
      floatingText: floating,
      timestamp: new Date()
    };
    
    setHistory(prev => [newItem, ...prev.slice(0, 9)]); // Keep only last 10 items
    setIsLoading(false);
  };

  return (
    <Background>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 relative z-30"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl font-bold cosmic-text mb-4"
          >
            诗意星空
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            在浩瀚星空中，让文字化作诗意，在宇宙深处绽放最美的光芒
          </motion.p>
          
          {/* History Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsHistoryOpen(true)}
            className="absolute top-6 right-6 p-3 bg-black bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 rounded-lg hover:border-nebula-purple transition-all duration-300"
          >
            <span className="text-white text-lg">📚</span>
          </motion.button>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center pb-12">
          {/* Input Section */}
          <InputSection onGenerate={handleGenerate} />
          
          {/* Output Section */}
          <OutputSection 
            poetryResult={poetryResult}
            floatingText={floatingText}
            isLoading={isLoading}
          />
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center py-6 text-gray-400 relative z-30"
        >
          <p>✨ 让诗意在星空中永恒 ✨</p>
        </motion.footer>

        {/* History Panel */}
        <HistoryPanel 
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
        />
      </div>
    </Background>
  );
}
