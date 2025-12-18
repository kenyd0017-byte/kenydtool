import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { playClickSound } from '../utils';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // 获取当前日期作为“更新时间”
  const today = new Date();
  const dateString = `${today.getFullYear()}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`;

  return (
    <footer className="mt-20 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-black/20 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-4xl mx-auto py-16 px-6">
        
        {/* Update Promise */}
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium border border-green-100 dark:border-green-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            上次更新: {dateString}
          </div>
          <h4 className="text-xl md:text-2xl font-serif text-zinc-800 dark:text-zinc-200">
            "愿这份工具库能持续为您助力"
          </h4>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light max-w-md mx-auto leading-relaxed">
             即便实习结束，我也希望这些工具能一直陪伴在老师身边。如果有新的好工具，我会第一时间放上来。
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12 opacity-30">
          <div className="h-px bg-zinc-400 flex-grow"></div>
          <Heart size={12} className="text-zinc-400" />
          <div className="h-px bg-zinc-400 flex-grow"></div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          
          {/* Social Icons */}
          <div className="flex gap-6 w-full md:w-auto justify-center md:justify-start">
             <SocialLink 
               href="https://weibo.com/u/7522600157" 
               label="微博" 
               color="hover:text-red-500"
             />
             <SocialLink 
               href="https://www.douban.com/people/199536506/?_i=5725605BnIKerv" 
               label="豆瓣" 
               color="hover:text-green-600"
             />
             <SocialLink 
               href="https://www.xiaohongshu.com/user/profile/62cc6db4000000000303df84?xsec_token=ABcOcGriZdg8i_1tzxRwMMA00eYzMhPgFhwGjEBQZTviY%3D&xsec_source=pc_search" 
               label="小红书" 
               color="hover:text-red-500"
             />
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-xs text-zinc-400 font-mono w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span>DESIGNED BY</span>
              <span className="text-zinc-600 dark:text-zinc-300 font-bold">TANG YIBIN</span>
            </div>
            <div className="flex gap-3">
               <span>&copy; {currentYear} FOR 陈埭中心小学</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Link Helper Component
const SocialLink = ({ href, label, color }: { href: string, label: string, color: string }) => (
  <a 
    href={href}
    target="_blank" 
    rel="noopener noreferrer"
    onMouseDown={playClickSound}
    className={`group flex items-center gap-2 text-zinc-500 dark:text-zinc-400 transition-colors duration-300 ${color}`}
  >
    <span className="text-sm font-medium tracking-wide">{label}</span>
    <ExternalLink size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
  </a>
);
