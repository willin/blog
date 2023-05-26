import { allBlogs } from 'contentlayer/generated';

export const allTags = (lang?: string) => {
  const tags: { name: string; count: number }[] = [];
  allBlogs
    .filter((blog) => blog.lang === lang && blog.tags)
    .forEach((blog) => {
      (blog.tags as string[])?.forEach((tag) => {
        const t = tags.find((x) => x.name === tag);
        if (t) {
          t.count++;
        } else {
          tags.push({ name: tag, count: 1 });
        }
      });
    });
  return tags.sort((x, y) => (x.count > y.count ? -1 : 1));
};

export const allCategories = (lang?: string) => {
  const cats: { name: string; count: number }[] = [];
  allBlogs
    .filter((blog) => blog.lang === lang && blog.category)
    .forEach((blog) => {
      const cat = cats.find((c) => c.name === blog.category);
      if (cat) {
        cat.count++;
      } else {
        cats.push({ name: blog.category as string, count: 1 });
      }
    });
  return cats.sort((x, y) => (x.count > y.count ? -1 : 1));
};
