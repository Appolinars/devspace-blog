import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import { POSTS_PER_PAGE } from "@/config/index";
import { getPosts } from "@/lib/posts";
import CategoriesList from "@/components/CategoriesList";

const BlogPage = ({ posts, numPages, currentPage, categories }) => {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 font-bold pb-3 mb-3">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
          <Pagination numPages={numPages} currentPage={currentPage} />
        </div>
        <div className="w-1/4">
          <CategoriesList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 0; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join("posts"));

  const posts = getPosts();

  // Get categories for sidebar
  const categories = posts.map(post => post.frontmatter.category)
  const uniqueCategories = [...new Set(categories)]

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories
    },
  };
};

export default BlogPage;
