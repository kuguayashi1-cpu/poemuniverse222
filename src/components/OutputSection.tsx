'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OutputSectionProps {
  poetryResult: string;
  floatingText: string;
  isLoading: boolean;
}

const OutputSection: React.FC<OutputSectionProps> = ({ 
  poetryResult, 
  floatingText, 
  isLoading 
}) => {
  const [floatingChars, setFloatingChars] = useState<string[]>([]);

  useEffect(() => {
    if (floatingText) {
      const chars = floatingText.split('').filter(char => char.trim());
      setFloatingChars(chars);
    }
  }, [floatingText]);

  const generatePoetry = (text: string): string => {
    // Simple poetry generation logic - in a real app, this would call an API
    const lines = text.split(/[。！？]/).filter(line => line.trim());
    const poetryLines = lines.map(line => {
      if (line.length <= 4) return line;
      if (line.length <= 8) return line.substring(0, 4) + '\n' + line.substring(4);
      return line.substring(0, 4) + '\n' + line.substring(4, 8) + '\n' + line.substring(8);
    });
    return poetryLines.join('\n\n');
  };

  const generateFloatingText = (text: string): string => {
    // Generate random floating characters based on input
    const chars = '诗星梦幻美意空灵飘浮游荡飞翔闪烁';
    const inputChars = text.split('').filter(char => /[\u4e00-\u9fff]/.test(char));
    const randomChars = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);
    return [...inputChars, ...randomChars].join('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-6xl mx-auto px-6 mt-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Poetry Result Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="poetry-box relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold cosmic-text">诗意转化结果</h3>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-star-gold text-2xl"
            >
              🌟
            </motion.div>
          </div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-48"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-4xl mb-4"
                    >
                      ✨
                    </motion.div>
                    <p className="text-gray-400">诗意正在生成中...</p>
                  </div>
                </motion.div>
              ) : poetryResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="prose prose-invert max-w-none"
                >
                  <pre className="text-white text-lg leading-relaxed whitespace-pre-wrap font-serif">
                    {poetryResult}
                  </pre>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 h-48 flex items-center justify-center"
                >
                  <p>等待诗意绽放...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Decorative border animation */}
          <div className="absolute inset-0 border border-nebula-purple border-opacity-30 rounded-lg animate-pulse" />
        </motion.div>

        {/* Floating Text Box */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="poetry-box relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold cosmic-text">漂浮语言</h3>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-cosmic-pink text-2xl"
            >
              💫
            </motion.div>
          </div>

          <div className="relative h-48 overflow-hidden">
            <AnimatePresence>
              {floatingChars.map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  initial={{ 
                    opacity: 0, 
                    x: Math.random() * 100, 
                    y: Math.random() * 200 
                  }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    x: Math.random() * 200,
                    y: Math.random() * 200,
                    scale: [0.5, 1.2, 0.5]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3
                  }}
                  className="absolute text-white text-2xl font-bold pointer-events-none select-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: ['#ffd700', '#8b5cf6', '#ec4899', '#ffffff'][Math.floor(Math.random() * 4)]
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </AnimatePresence>

            {!floatingChars.length && (
              <div className="text-center text-gray-500 h-full flex items-center justify-center">
                <p>等待漂浮文字...</p>
              </div>
            )}
          </div>

          {/* Decorative border animation */}
          <div className="absolute inset-0 border border-cosmic-pink border-opacity-30 rounded-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        </motion.div>
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="flex justify-center space-x-4 mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-nebula-purple to-cosmic-pink text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          查看总览
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-star-gold to-nebula-purple text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          保存结果
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OutputSection;
