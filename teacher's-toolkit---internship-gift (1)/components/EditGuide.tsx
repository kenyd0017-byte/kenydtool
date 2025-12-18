import React from 'react';
import { Code, X, FileText, Settings, Lightbulb, PenTool } from 'lucide-react';

interface EditGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditGuide: React.FC<EditGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Code className="text-blue-600" />
            如何自定义内容 (VS Code)
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-3">
              <PenTool size={20} className="text-blue-500" />
              第一步：打开文件
            </h3>
            <div className="text-sm text-slate-600 leading-relaxed">
              在 VS Code 左侧的文件列表中，找到并点击 <code className="bg-slate-100 px-1 py-0.5 rounded border border-slate-300">data.ts</code> 文件。这是所有数据存放的地方。
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-3">
              <FileText size={20} className="text-green-500" />
              第二步：修改内容
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700 space-y-3">
              <div>
                <strong>1. 修改分类名称：</strong><br/>
                找到 <code className="text-blue-600">export const CATEGORIES</code>，修改引号里的文字即可。
              </div>
              <div>
                <strong>2. 添加/修改工具：</strong><br/>
                找到 <code className="text-blue-600">export const TOOLS</code>，你可以直接修改现有的内容，或者复制一段大括号 <code className="text-blue-600">{`{ ... }`}</code> 粘贴到后面来添加新工具。
              </div>
              <ul className="list-disc list-inside space-y-1 ml-2 text-slate-600 bg-white p-3 rounded border border-slate-100 mt-2">
                <li><code className="font-bold">title</code>: 网站的名字</li>
                <li><code className="font-bold">url</code>: 网站的链接地址</li>
                <li><code className="font-bold">description</code>: 一句话介绍（建议写明具体能帮老师做什么）</li>
                <li><code className="font-bold">tags</code>: 方便搜索的关键词</li>
                <li><code className="font-bold">featured</code>: 写 <code className="text-purple-600">true</code> 会显示“推荐”标签，不写则不显示</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-3">
              <Settings size={20} className="text-purple-500" />
              给老师的优化建议
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="font-bold text-slate-800">1. 描述要“接地气”</h4>
                <p className="text-sm text-slate-600 mt-1">
                  不要只写“在线PS工具”，老师可能看不懂。建议写：<strong>“网页版修图，无需安装，适合简单修改图片尺寸和文字。”</strong>
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-1">
                <h4 className="font-bold text-slate-800">2. 善用“推荐”功能</h4>
                <p className="text-sm text-slate-600 mt-1">
                  工具太多老师会眼花。每个分类下，把你觉得最好用的那个（比如你教过他们用的那个）打上 <code>featured: true</code> 标记。
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4 py-1">
                <h4 className="font-bold text-slate-800">3. 个人署名</h4>
                <p className="text-sm text-slate-600 mt-1">
                  别忘了去 <code className="bg-slate-100 px-1 py-0.5 rounded">components/Hero.tsx</code> 文件里，把 "Your Name" 改成你的真实名字，把 "XX 小学" 改成实习学校的名字。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-3">
              <Lightbulb size={20} className="text-yellow-500" />
              如何分享给老师？
            </h3>
            <p className="text-sm text-slate-600">
              建议使用 <strong>Vercel</strong> 进行免费部署。它会生成一个类似 <code className="bg-slate-100 px-1">my-tools.vercel.app</code> 的链接，直接发到微信群里，大家手机电脑都能点开看，非常方便且专业。
            </p>
          </section>

        </div>
        
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            去试试修改
          </button>
        </div>
      </div>
    </div>
  );
};
