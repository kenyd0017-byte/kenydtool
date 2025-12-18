import React, { useState } from 'react';
import { X, Copy, Check, QrCode } from 'lucide-react';
import { playClickSound } from '../utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const handleCopy = () => {
    playClickSound();
    navigator.clipboard.writeText('KenYD0017').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-zinc-200 dark:border-zinc-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 id="modal-title" className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <QrCode className="text-zinc-400" size={20} />
              联系作者
            </h2>
            <button 
              onClick={onClose}
              onMouseDown={playClickSound}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              aria-label="关闭对话框"
            >
              <X size={20} className="text-zinc-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                如果您有任何问题，或者想推荐更多好用的工具，欢迎添加我的微信：
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 group">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">WeChat ID</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">KenYD0017</span>
              </div>
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
                  copied 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 active:scale-95'
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? '已复制' : '复制ID'}
              </button>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-center text-zinc-400 dark:text-zinc-500 leading-relaxed">
                "工具库会根据大家的需求持续更新，<br/>感谢您的支持与反馈！"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};