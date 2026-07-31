import { groq } from "next-sanity";

// So traz posts cuja data de publicacao ja chegou -> respeita o calendario
// editorial (post agendado nao aparece antes da hora).
export const postsListQuery = groq`
  *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    "category": category->title
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
    _id,
    title,
    excerpt,
    coverImage,
    body,
    publishedAt,
    seoDescription,
    "category": category->title
  }
`;
