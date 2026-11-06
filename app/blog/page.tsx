import Image from "next/image";
import Link from "next/link";
import { blogDescription, posts } from "../../lib/blog";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("Блог Archa Apart Hotel", blogDescription, "/blog");

export default function BlogPage() {
  return (
    <main id="main" className="wrap blog-page">
      <h1>Блог Archa Apart Hotel</h1>
      <p>{blogDescription}</p>
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="blog-card">
              <div className="room-image">
                <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span className="text-link">Читать статью →</span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
