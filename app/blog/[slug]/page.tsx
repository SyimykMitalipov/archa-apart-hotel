import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../lib/blog";
import { pageMetadata } from "../../../lib/seo";

type PostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  return pageMetadata(post.title, post.description, `/blog/${post.slug}`);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  return (
    <main id="main" className="wrap blog-page">
      <article className="blog-post">
        <Link className="text-link" href="/blog">← Все статьи</Link>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className="room-image blog-cover">
          <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 800px) 100vw, 760px" preload />
        </div>
        {post.sections.map(({ title, text, link }) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
            <Link href={link.href} className="text-link">{link.label} →</Link>
          </section>
        ))}
        <Link className="button" href="/#booking">Забронировать</Link>
      </article>
    </main>
  );
}
