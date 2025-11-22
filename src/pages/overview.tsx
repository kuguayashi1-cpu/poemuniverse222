'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from '../components/Background';
import HistoryPanel from '../components/HistoryPanel';

interface HistoryItem {
  id: string;
  input: string;
  poetry: string;
  floatingText: string;
  timestamp: Date;
}

interface OverviewPageProps {
  history: HistoryItem[];
}

export default function Overview() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#ffffff');
  const [floatingChars, setFloatingChars] = useState<Array<{
    char: string;
    x: number;
    y: number;
    color: string;
    size: number;
  }>>([]);

  useEffect(() => {
    // Load history from localStorage or props
    const savedHistory = localStorage.getItem('poetry-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // Generate floating characters from all history items
    const allText = history.map(item => item.poetry + item.floatingText).join('');
    const chars = allText.split('').filter(char => char.trim());
    
    const floating = chars.map((char, index) => ({
      char,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#ffd700', '#8b5cf6', '#ec4899', '#ffffff'][Math.floor(Math.random() * 4)],
      size: Math.random() * 20 + 12
    }));
    
    setFloatingChars(floating);
  }, [history]);

  const colorOptions = [
    { name: '白色', value: '#ffffff' },
    { name: '金色', value: '#ffd700' },
    { name: '紫色', value: '#8b5cf6' },
    { name: '粉色', value: '#ec4899' },
    { name: '青色', value: '#00ffff' },
    { name: '绿色', value: '#00ff00' }
  ];

  return (
    <Background>
      <div className="min-h-screen relative">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-8 relative z-30"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl font-bold cosmic-text mb-4"
          >
            诗意总览
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-300"
          >
            在星空中混合漂浮的诗意文字
          </motion.p>
          
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center items-center space-x-6 mt-6"
          >
            {/* Font Size Control */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">字体大小:</span>
              <input
                type="range"
                min="12"
                max="32"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-white text-sm">{fontSize}px</span>
            </div>

            {/* Color Control */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">文字颜色:</span>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <motion.button
                    key={color.value}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTextColor(color.value)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      textColor === color.value ? 'border-white' : 'border-gray-500'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* History Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsHistoryOpen(true)}
              className="px-4 py-2 bg-black bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 rounded-lg hover:border-nebula-purple transition-all duration-300"
            >
              <span className="text-white">📚 查看历史</span>
            </motion.button>
          </motion.div>
        </motion.header>

        {/* Floating Text Display */}
        <div className="relative h-screen overflow-hidden">
          <AnimatePresence>
            {floatingChars.map((item, index) => (
              <motion.div
                key={`${item.char}-${index}`}
                initial={{ 
                  opacity: 0, 
                  x: item.x * window.innerWidth / 100, 
                  y: item.y * window.innerHeight / 100,
                  scale: 0
                }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  rotate: [0, 360, 0]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 8 + Math.random() * 4,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3
                }}
                className="absolute pointer-events-none select-none font-bold"
                style={{
                  fontSize: `${item.size}px`,
                  color: textColor,
                  textShadow: '0 0 10px currentColor'
                }}
              >
                {item.char}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Central Display Area */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-center max-w-4xl mx-auto px-8"
            >
              {selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="poetry-box"
                >
                  <h3 className="text-2xl font-bold cosmic-text mb-6">
                    {selectedItem.input}
                  </h3>
                  <pre 
                    className="text-white whitespace-pre-wrap font-serif leading-relaxed"
                    style={{ fontSize: `${fontSize}px`, color: textColor }}
                  >
                    {selectedItem.poetry}
                  </pre>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">✨</div>
                  <h2 className="text-3xl font-bold cosmic-text mb-4">
                    选择一首诗来展示
                  </h2>
                  <p className="text-gray-300 text-lg">
                    点击历史记录中的任意项目来查看混合漂浮效果
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* History Panel */}
        <HistoryPanel 
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
        />

        {/* Quick Selection Panel */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-30"
        >
          <div className="poetry-box max-w-xs">
            <h3 className="text-lg font-semibold cosmic-text mb-4">快速选择</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.slice(0, 5).map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedItem(item)}
                  className="w-full text-left p-2 bg-black bg-opacity-20 rounded hover:bg-opacity-40 transition-all duration-300"
                >
                  <p className="text-white text-sm line-clamp-2">
                    {item.input}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {item.timestamp.toLocaleDateString('zh-CN')}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Background>
  );
}

