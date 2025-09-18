import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog-posts'
import { FaCalendarAlt, FaClock, FaUser, FaTag } from 'react-icons/fa'
import { Footer } from '@/component/Footer'

export default function BlogPage() {
  const posts = getAllBlogPosts().sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            Blog A2H
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos cas d&apos;usage, conseils et retours d&apos;expérience sur la migration IA vers code humain
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto"></div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Aucun article pour le moment
              </h2>
              <p className="text-gray-600">
                De nouveaux articles seront bientôt disponibles.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-8">
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-accent" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-accent" />
                        <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-accent" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-accent transition-colors duration-300"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-sm font-medium"
                        >
                          <FaTag className="text-xs" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-accent font-semibold hover:text-accent/80 transition-colors duration-300"
                    >
                      Lire l&apos;article complet
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-accent/5 via-white to-accent/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-accent/20 p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
              Prêt à migrer votre application ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez comment nous pouvons vous aider à réduire vos coûts et améliorer vos performances
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
