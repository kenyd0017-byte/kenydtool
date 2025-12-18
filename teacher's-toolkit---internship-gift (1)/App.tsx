import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Globe, Zap, MessageCircle, Moon, Sun, Star } from 'lucide-react';
import { CATEGORIES, TOOLS } from './data';
import { Category } from './types';
import { ToolCard } from './components/ToolCard';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { playClickSound } from './utils';

const ITEMS_PER_PAGE = 9;

type AccessFilter = 'ALL' | 'DIRECT' | 'RESTRICTED';
type AppCategory = Category | '我的收藏';

const AI_SUBCATEGORIES = ['全部', '对话模型', '视频生成', '数字人', '视频剪辑', '绘画设计', '音频处理', '效率工具'];

function App() {
  const [activeCategory, setActiveCategory] = useState<AppCategory>('全部');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('全部');
  const [accessFilter, setAccessFilter] = useState<AccessFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    }
    return [];
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    playClickSound();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    playClickSound();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory, searchQuery, accessFilter]);

  useEffect(() => {
    setActiveSubCategory('全部');
  }, [activeCategory]);

  const filteredAndSortedTools = useMemo(() => {
    const filtered = TOOLS.filter(tool => {
      if (activeCategory === '我的收藏') {
        if (!favorites.includes(tool.id)) return false;
      } 
      else if (activeCategory !== '全部' && tool.category !== activeCategory) {
        return false;
      }

      if (activeCategory === 'AI工具' && activeSubCategory !== '全部') {
        if (tool.subcategory !== activeSubCategory) return false;
      }

      let accessMatch = true;
      if (accessFilter === 'DIRECT') {
        accessMatch = tool.tags.includes('直连可用');
      } else if (accessFilter === 'RESTRICTED') {
        accessMatch = tool.tags.includes('网络受限');
      }

      const searchLower = searchQuery.toLowerCase();
      const searchMatch = 
        tool.title.toLowerCase().includes(searchLower) || 
        tool.description.toLowerCase().includes(searchLower) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower));

      return accessMatch && searchMatch;
    });

    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [activeCategory, activeSubCategory, searchQuery, accessFilter, favorites]);

  const totalPages = Math.ceil(filteredAndSortedTools.length / ITEMS_PER_PAGE);
  const currentTools = filteredAndSortedTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const displayCategories: AppCategory[] = ['我的收藏', ...CATEGORIES];

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-indigo-500 relative overflow-hidden flex flex-col transition-colors duration-300">
      <div className="fixed inset-0 -z-10 w-full h-full bg-[#f8f9fa] dark:bg-zinc-950 overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff1a,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#4c1d9515,transparent)]"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob opacity-70"></div>
        <div className="absolute top-[40%] left-[-20%] w-[600px] h-[600px] bg-purple-200/20 dark:bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob-reverse animation-delay-2000 opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-200/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10 w-full flex-grow relative z-10 flex flex-col" id="main-content">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="font-semibold text-lg tracking-tight flex items-center gap-2 select-none" aria-label="教师百宝箱 Logo">
              <div className="w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg flex items-center justify-center font-serif italic text-sm shadow-md transition-colors" aria-hidden="true">
                T
              </div>
              <span className="text-zinc-900 dark:text-white">Toolkit</span>
            </div>

             <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    playClickSound();
                  }}
                  className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors focus:ring-2 focus:ring-zinc-500"
                  aria-label={isDarkMode ? "切换到浅色模式" : "切换到深色模式"}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
               <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors focus:ring-2 focus:ring-zinc-500"
                  onMouseDown={playClickSound}
                  aria-label="打开联系作者模态框"
                >
                  <MessageCircle size={20} />
                </button>
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
             <div className="relative w-full md:w-64 group">
              <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-7 pr-0 py-2 border-b border-zinc-200 dark:border-zinc-700 bg-transparent text-sm placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-300 transition-all dark:text-zinc-100"
                placeholder="搜索工具名称或功能..."
                aria-label="搜索工具"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  playClickSound();
                }}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors focus:ring-2 focus:ring-zinc-500"
                title="切换主题"
                aria-label={isDarkMode ? "切换到浅色模式" : "切换到深色模式"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setIsContactModalOpen(true)}
                onMouseDown={playClickSound}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all shadow-sm focus:ring-2 focus:ring-zinc-500 outline-none"
                aria-label="联系作者汤奕斌"
              >
                <MessageCircle size={16} />
                联系作者
              </button>
            </div>
          </div>
        </header>

        <Hero />

        <nav className="mb-8 sticky top-0 z-20 py-4 backdrop-blur-xl -mx-6 px-6 bg-[#f8f9fa]/80 dark:bg-zinc-950/80 md:bg-transparent md:backdrop-blur-none md:static md:p-0 md:m-0 border-b md:border-b-0 border-zinc-100/50 dark:border-zinc-800/50 transition-colors duration-300" aria-label="分类导航">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex overflow-x-auto no-scrollbar pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 gap-x-6">
                <div className="flex gap-x-4 md:gap-x-6 whitespace-nowrap" role="tablist">
                  {displayCategories.map((cat) => (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={activeCategory === cat}
                      onClick={() => setActiveCategory(cat)}
                      onMouseDown={playClickSound}
                      className={`text-sm transition-all duration-300 relative px-1 py-1 rounded-md flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 ${
                        activeCategory === cat
                          ? 'text-zinc-900 dark:text-white font-bold'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      {cat === '我的收藏' && <Star size={14} className={activeCategory === '我的收藏' ? 'fill-zinc-900 dark:fill-white' : ''} aria-hidden="true" />}
                      {cat}
                      {activeCategory === cat && (
                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-zinc-900 dark:bg-white rounded-full animate-in fade-in zoom-in-50 duration-200"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center bg-white dark:bg-zinc-800 p-1 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow" role="group" aria-label="访问状态筛选">
                <button
                  onClick={() => setAccessFilter('ALL')}
                  onMouseDown={playClickSound}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-300 focus:ring-2 focus:ring-zinc-400 outline-none ${
                    accessFilter === 'ALL' 
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md' 
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                  aria-pressed={accessFilter === 'ALL'}
                >
                  全部
                </button>
                <button
                  onClick={() => setAccessFilter('DIRECT')}
                  onMouseDown={playClickSound}
                  className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-all duration-300 focus:ring-2 focus:ring-zinc-400 outline-none ${
                    accessFilter === 'DIRECT' ? 'bg-amber-100 text-amber-900 font-medium' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                  aria-pressed={accessFilter === 'DIRECT'}
                >
                  <Zap size={10} className={accessFilter === 'DIRECT' ? 'text-amber-600' : ''} aria-hidden="true" />
                  直连可用
                </button>
                <button
                  onClick={() => setAccessFilter('RESTRICTED')}
                  onMouseDown={playClickSound}
                  className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-all duration-300 focus:ring-2 focus:ring-zinc-400 outline-none ${
                    accessFilter === 'RESTRICTED' ? 'bg-blue-100 text-blue-900 font-medium' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                  aria-pressed={accessFilter === 'RESTRICTED'}
                >
                  <Globe size={10} className={accessFilter === 'RESTRICTED' ? 'text-blue-600' : ''} aria-hidden="true" />
                  网络受限
                </button>
              </div>
            </div>

            {activeCategory === 'AI工具' && (
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 animate-in fade-in slide-in-from-top-2 duration-300" role="group" aria-label="AI二级分类">
                {AI_SUBCATEGORIES.map(sub => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubCategory(sub)}
                    onMouseDown={playClickSound}
                    className={`px-3 py-1 text-xs rounded-full border transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                      activeSubCategory === sub
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white'
                        : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <section className="flex-grow flex flex-col" aria-live="polite">
          {filteredAndSortedTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {currentTools.map((tool) => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={() => toggleFavorite(tool.id)}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-6" aria-label="分页导航">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    onMouseDown={playClickSound}
                    disabled={currentPage === 1}
                    className="group p-3 rounded-full hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-300 border border-transparent hover:border-zinc-100 dark:hover:border-zinc-700"
                    aria-label="上一页"
                  >
                    <ChevronLeft size={20} className="text-zinc-600 dark:text-zinc-300 group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono tracking-widest" aria-current="page">
                    PAGE {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    onMouseDown={playClickSound}
                    disabled={currentPage === totalPages}
                    className="group p-3 rounded-full hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-300 border border-transparent hover:border-zinc-100 dark:hover:border-zinc-700"
                    aria-label="下一页"
                  >
                    <ChevronRight size={20} className="text-zinc-600 dark:text-zinc-300 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center min-h-[300px]">
              <div className="text-center space-y-3 p-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm">
                <p className="text-zinc-400 dark:text-zinc-500 font-light">此分类或筛选条件下暂无内容</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('全部'); setAccessFilter('ALL');}}
                  onMouseDown={playClickSound}
                  className="text-zinc-900 dark:text-zinc-200 text-sm border-b border-zinc-900 dark:border-zinc-200 pb-0.5 hover:opacity-60 transition-opacity"
                >
                  清除所有筛选
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

export default App;