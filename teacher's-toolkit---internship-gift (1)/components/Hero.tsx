import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="py-16 md:py-24 mb-8">
      <div className="max-w-5xl">
        {/* Top Tag */}
        <div className="flex items-center gap-3 mb-10 text-sm font-medium text-zinc-400 dark:text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white"></span>
          <span>献给最亲爱的老师们</span>
        </div>
        
        {/* Main Headline - Simplified */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight mb-8 transition-colors duration-300">
          感谢四个月的悉心指导，这是我为您整理的“办公百宝箱”
        </h1>

        {/* Subtitle / Description */}
        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mb-12 transition-colors duration-300">
          我整理了这些日常最高频使用的工具网站。
          希望能帮助老师们更轻松地制作精美课件、处理音视频素材。
        </p>

        {/* Footer info */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-zinc-400 dark:text-zinc-500 font-mono border-t border-zinc-100 dark:border-zinc-800 pt-8 w-fit transition-colors duration-300">
          <div className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-600 dark:text-zinc-300">
             实习纪念 2025
          </div>
          <div>永远的学生汤奕斌</div>
        </div>
      </div>
    </div>
  );
};