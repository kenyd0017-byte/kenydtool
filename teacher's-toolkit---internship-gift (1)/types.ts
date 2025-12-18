// 为了方便你自由添加分类，我们将这里改为了 string (也就是允许任何文字)
// 这样你在 data.ts 里添加新分类时，就不会报错了
export type Category = string;

export interface Tool {
  id: string;
  title: string;
  description: string;
  url: string; // The link to the website
  category: Category;
  subcategory?: string; // Secondary category for fine-grained filtering (e.g., within AI Tools)
  tags: string[]; // For search functionality
  featured?: boolean; // Highlight specific recommended tools
}