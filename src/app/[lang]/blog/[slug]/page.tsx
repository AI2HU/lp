import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog-posts'
import { FaCalendarAlt, FaClock, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa'
import { Footer } from '@/component/Footer'
import frTranslations from '@/i18n/locales/fr.json'
import enTranslations from '@/i18n/locales/en.json'

interface BlogPostPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return [
    ...posts.map((post) => ({ lang: 'fr', slug: post.slug })),
    ...posts.map((post) => ({ lang: 'en', slug: post.slug })),
  ]
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const translations = lang === 'en' ? enTranslations : frTranslations
  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = translations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-accent/5 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href={lang === 'en' ? '/en/blog' : '/blog'}
            className="inline-flex items-center text-accent hover:text-accent/80 transition-colors duration-300 mb-4 text-sm"
          >
            <FaArrowLeft className="mr-2" />
            Retour au blog
          </Link>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <FaUser className="text-accent" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-accent" />
              <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-accent" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base text-gray-600 mb-4 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium"
              >
                <FaTag className="text-xs" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-gray max-w-none">
            <div
              className="blog-content text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content
                  // Headers
                  .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold text-gray-900 mt-12 mb-6 leading-tight">$1</h1>')
                  .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold text-gray-900 mt-10 mb-5 leading-tight">$1</h2>')
                  .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4 leading-tight">$1</h3>')
                  .replace(/^#### (.*$)/gm, '<h4 class="text-xl font-bold text-gray-900 mt-6 mb-3 leading-tight">$1</h4>')
                  
                  // Bold and italic text
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
                  
                  // Lists
                  .replace(/^- (.*$)/gm, '<li class="mb-2 text-gray-700 leading-relaxed text-lg">$1</li>')
                  .replace(/^\d+\. (.*$)/gm, '<li class="mb-2 text-gray-700 leading-relaxed text-lg">$1</li>')
                  .replace(/(<li.*<\/li>)/g, '<ul class="list-disc list-inside mb-6 space-y-1 ml-4">$1</ul>')
                  
                  // Paragraphs
                  .replace(/\n\n/g, '</p><p class="mb-6 text-gray-700 leading-relaxed text-lg">')
                  .replace(/^(?!<[h|u|l|s|e|p|c])/gm, '<p class="mb-6 text-gray-700 leading-relaxed text-lg">')
                  .replace(/<p class="mb-6 text-gray-700 leading-relaxed text-lg"><\/p>/g, '')
                  .replace(/<p class="mb-6 text-gray-700 leading-relaxed text-lg">(<h[1-6].*?)<\/p>/g, '$1')
                  .replace(/<p class="mb-6 text-gray-700 leading-relaxed text-lg">(<ul.*?)<\/p>/g, '$1')
                  .replace(/<p class="mb-6 text-gray-700 leading-relaxed text-lg">(<li.*?)<\/p>/g, '$1')

                  // Code blocks
                  .replace(/<code(?:\s+class="[^"]*")?>\s*([\s\S]*?)\s*<\/code>/g, '<pre class="bg-gray-100 border-1 border-gray-400 p-4 rounded-lg overflow-x-auto mb-6"><code class="text-sm font-mono code-block">$1</code></pre>')
                  // Inline code (single backticks)
                  .replace(/`(.*?)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono border">$1</code>')
                  
                  // Clean up empty paragraphs
                  .replace(/<p class="mb-6 text-gray-700 leading-relaxed text-lg"><br><\/p>/g, '')
                  .replace(/<p class="mb-6 text-gray-700 leading-relaxed text-lg"><\/p>/g, '')
              }}
            />
          </article>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-accent/5 via-white to-accent/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-accent/20 p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
              {t('blog.cta.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('blog.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={lang === 'en' ? '/en/#contact' : '/#contact'}
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('blog.cta.requestQuote')}
              </Link>
              <Link
                href={lang === 'en' ? '/en/blog' : '/blog'}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('blog.cta.viewAllArticles')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
