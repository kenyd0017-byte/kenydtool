import React from 'react';
import { ArrowUpRight, Share2, Star } from 'lucide-react';
import { Tool } from '../types';
import { playClickSound } from '../utils';

interface ToolCardProps {
  tool: Tool;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onTagClick?: (tag: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, onToggleFavorite, onTagClick }) => {

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    playClickSound();

    const shareData = {
      title: tool.title,
      text: `推荐好工具：${tool.title} - ${tool.description}`,
      url: tool.url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(tool.url)}`;
        window.open(twitterUrl, '_blank');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.();
  };

  const handleTagClickInternal = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    onTagClick?.(tag);
  }

  return (
    <a 
      href={tool.url} 
      target="_blank" 
      rel="noopener noreferrer"
      onMouseDown={playClickSound}
      className="group block bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-900 dark:hover:border-zinc-400 transition-all duration-200 h-full flex flex-col relative rounded-xl hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 focus:ring-2 focus:ring-zinc-400 outline-none"
      aria-labelledby={`tool-title-${tool.id}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
           <span className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-800 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700 transition-colors">
             {tool.category}
           </span>
           {tool.featured && (
            <span className="text-[10px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-2 py-0.5 rounded shadow-sm font-bold">
              推荐
            </span>
           )}
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={handleFavoriteClick}
            className={`p-1.5 rounded-full transition-all focus:ring-2 focus:ring-amber-200 ${isFavorite ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-600 hover:text-amber-400 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            aria-label={isFavorite ? "取消收藏" : "收藏该工具"}
            title={isFavorite ? "取消收藏" : "收藏"}
          >
            <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleShare}
            onMouseDown={(e) => { e.stopPropagation(); playClickSound(); }}
            className="text-zinc-300 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-300"
            aria-label="分享工具"
            title="分享此工具"
          >
            <Share2 size={16} />
          </button>
          <ArrowUpRight size={18} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors ml-1" aria-hidden="true" />
        </div>
      </div>

      <h3 id={`tool-title-${tool.id}`} className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg mb-2 tracking-tight flex items-center gap-2">
        {tool.title}
      </h3>
      
      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow font-normal">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-x-3 gap-y-2 mt-auto pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
        {tool.tags.map(tag => (
          <button 
            key={tag} 
            onClick={(e) => handleTagClickInternal(e, tag)}
            className={`text-[11px] px-1.5 py-0.5 rounded transition-colors hover:opacity-80 focus:ring-1 focus:ring-zinc-400 ${
            tag === '直连可用' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
            tag === '网络受限' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' :
            'text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-800'
          }`}>
            #{tag}
          </button>
        ))}
      </div>
    </a>
  );
};