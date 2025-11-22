'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InputSectionProps {
  onGenerate: (text: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onGenerate }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onGenerate(inputText.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto px-6"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl font-bold cosmic-text mb-4"
        >
          故乡入口
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-300 text-lg"
        >
          输入您的中文文本，让诗意在星空中绽放
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative"
        >
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="在这里输入您想要转换的中文文本..."
            className="w-full h-48 px-6 py-4 bg-black bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-nebula-purple focus:ring-2 focus:ring-nebula-purple focus:ring-opacity-50 transition-all duration-300"
            style={{ fontFamily: 'serif', fontSize: '16px', lineHeight: '1.8' }}
          />
          
          {/* Floating characters effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-gray-500 opacity-20 text-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {['诗', '意', '星', '空', '梦', '幻', '美', '丽'][i]}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <motion.button
            type="submit"
            className="cosmic-button text-lg px-12 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!inputText.trim()}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>生成诗歌</span>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-xl"
              >
                ✨
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </form>

      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-20 h-20 border border-nebula-purple border-opacity-30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-cosmic-pink border-opacity-30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
    </motion.div>
  );
};

export default InputSection;

