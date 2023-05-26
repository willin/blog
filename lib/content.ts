import { allBlogs } from 'contentlayer/generated';
import { ReadTimeResults } from 'reading-time';

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

export const allWordCount = () => {
  let wordcount = 0;
  allBlogs.forEach((blog) => {
    wordcount += (blog.readingTime as ReadTimeResults).words;
  });
  return wordcount;
};

export const allReadingTime = () => {
  let time = 0;
  allBlogs.forEach((blog) => {
    time += (blog.readingTime as ReadTimeResults).minutes;
  });
  return Math.ceil(time / 6) / 10;
};
