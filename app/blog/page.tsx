import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { postsListQuery } from "@/lib/queries";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Conteúdo sobre plano de saúde: carência, reajuste, portabilidade e mais.",
};

export const revalidate = 3600; // 1h - o suficiente pra posts agendados aparecerem sem rebuild manual

type PostListItem = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: any;
  publishedAt: string;
  category?: string;
};

export default async function BlogPage() {
  const posts = await client.fetch<PostListItem[]>(postsListQuery);

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Conteúdo pra entender plano de saúde sem depender de corretor pra
        cada dúvida.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          Nenhum post publicado ainda.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                {post.coverImage && (
                  <Image
                    src={urlForImage(post.coverImage).width(600).height(340).url()}
                    alt={post.title}
                    width={600}
                    height={340}
                    className="mb-4 rounded-md object-cover"
                  />
                )}
                {post.category && (
                  <p className="text-xs font-medium uppercase text-primary">
                    {post.category}
                  </p>
                )}
                <p className="mt-1 text-lg font-semibold">{post.title}</p>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
