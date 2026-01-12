import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai2h.tech'
  const locales = ['', '/en'] // '' for French (base path), '/en' for English
  
  // Target page slugs
  const targetSlugs = [
    'vibe-code',
    'code-ia-trop-cher',
    'code-ia-bloque',
    'debugger-code-genere-par-ia',
    'code-ia-fonctionne-pas',
    'code-ia-dette-technique',
    'failles-securite-code-genere-par-llm',
    'mauvaise-qualite-code-genere-par-ia',
    'refactoring-code-ia',
    'hallucination-code-ia',
    'probleme-integration-code-ia',
    'reassurance-production-vibe-code',
  ]

  // Generate pages for both locales
  const generatePages = (locale: string) => {
    const prefix = locale
    const lang = locale === '/en' ? 'en' : 'fr'
    const langBlogPosts = getAllBlogPosts(lang)
    const pages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}${prefix}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}${prefix}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}${prefix}/manifeste`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}${prefix}/audit`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
    ]

    // Add target pages
    const targetPages = targetSlugs.map(slug => ({
      url: `${baseUrl}${prefix}/t/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    // Add blog posts for this language
    const blogPostPages = langBlogPosts.map(post => ({
      url: `${baseUrl}${prefix}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...pages, ...targetPages, ...blogPostPages]
  }

  // Generate sitemap for all locales
  const allPages = locales.flatMap(locale => generatePages(locale))

  return allPages
}
