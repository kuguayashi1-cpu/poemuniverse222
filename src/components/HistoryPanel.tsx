'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryItem {
  id: string;
  input: string;
  poetry: string;
  floatingText: string;
  timestamp: Date;
}

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, history }) => {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed right-0 top-0 h-full w-96 bg-cosmic-blue bg-opacity-95 backdrop-blur-sm border-l border-white border-opacity-20 z-50 overflow-hidden"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold cosmic-text">历史记录</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white text-2xl hover:text-cosmic-pink transition-colors"
                >
                  ×
                </motion.button>
              </div>

              {/* History List */}
              <div className="flex-1 overflow-y-auto space-y-4">
                <AnimatePresence>
                  {history.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-400 py-12"
                    >
                      <div className="text-4xl mb-4">📚</div>
                      <p>暂无历史记录</p>
                    </motion.div>
                  ) : (
                    history.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="poetry-box cursor-pointer hover:border-nebula-purple transition-all duration-300"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="mb-2">
                          <p className="text-sm text-gray-400">
                            {item.timestamp.toLocaleString('zh-CN')}
                          </p>
                        </div>
                        <p className="text-white text-sm line-clamp-2 mb-2">
                          {item.input}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-nebula-purple">点击查看详情</span>
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="text-star-gold"
                          >
                            ✨
                          </motion.div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white border-opacity-20">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-nebula-purple to-cosmic-pink text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  清空历史
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Detail Modal */}
          <AnimatePresence>
            {selectedItem && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-70 z-60"
                  onClick={() => setSelectedItem(null)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-4 bg-cosmic-blue bg-opacity-95 backdrop-blur-sm border border-white border-opacity-20 rounded-lg z-60 overflow-hidden"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold cosmic-text">历史详情</h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedItem(null)}
                        className="text-white text-2xl hover:text-cosmic-pink transition-colors"
                      >
                        ×
                      </motion.button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-6">
                      {/* Original Input */}
                      <div>
                        <h4 className="text-lg font-semibold text-star-gold mb-3">原始输入</h4>
                        <div className="poetry-box">
                          <p className="text-white">{selectedItem.input}</p>
                        </div>
                      </div>

                      {/* Poetry Result */}
                      <div>
                        <h4 className="text-lg font-semibold text-nebula-purple mb-3">诗意转化</h4>
                        <div className="poetry-box">
                          <pre className="text-white whitespace-pre-wrap font-serif">
                            {selectedItem.poetry}
                          </pre>
                        </div>
                      </div>

                      {/* Floating Text */}
                      <div>
                        <h4 className="text-lg font-semibold text-cosmic-pink mb-3">漂浮语言</h4>
                        <div className="poetry-box">
                          <p className="text-white">{selectedItem.floatingText}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white border-opacity-20 flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-3 bg-gradient-to-r from-nebula-purple to-cosmic-pink text-white rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        重新生成
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-3 bg-gradient-to-r from-star-gold to-nebula-purple text-white rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        导出结果
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;

