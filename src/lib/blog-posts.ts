export interface BlogPost {
  slug: string;
  lang: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
}

// Re-export everything from the blog-posts index
export * from './blog-posts/index';
