import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { postBySlugQuery } from "@/lib/queries";

export const revalidate = 3600;

type Post = {
  _id: string;
  title: string;
  excerpt?: string;
  coverImage?: any;
  body?: any;
  publishedAt: string;
  seoDescription?: string;
  category?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });
  if (!post) return {};
  return {
    title: post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <article className="container max-w-2xl py-16">
      {post.category && (
        <p className="text-xs font-medium uppercase text-primary">{post.category}</p>
      )}
      <h1 className="mt-1 text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
      </p>

      {post.coverImage && (
        <Image
          src={urlForImage(post.coverImage).width(1200).height(630).url()}
          alt={post.title}
          width={1200}
          height={630}
          className="mt-6 rounded-lg object-cover"
        />
      )}

      <div className="prose prose-neutral mt-8 max-w-none">
        {post.body && <PortableText value={post.body} />}
      </div>
    </article>
  );
}
