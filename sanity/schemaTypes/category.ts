import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
  ],
});
