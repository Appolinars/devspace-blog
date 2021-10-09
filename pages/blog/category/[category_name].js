import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getPosts } from "@/lib/posts";
import CategoriesList from "@/components/CategoriesList";

export default function CategoryBlogPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 font-bold pb-3 mb-3">Posts in {categoryName}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoriesList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: {
      category_name: category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { category_name } }) => {
  const posts = getPosts();

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  // Filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
};
