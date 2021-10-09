import Link from "next/link";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getPosts } from "@/lib/posts";

export default function Home({ posts }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 font-bold pb-3 mb-3">Latest posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </div>
      <Link href="/blog">
        <a className="block text-center border mt-4">All posts</a>
      </Link>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {

  return {
    props: {
      posts: getPosts().slice(0, 5)
    },
  };
};
