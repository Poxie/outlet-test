import getBlogPosts from "@/api/blog/getBlogPosts";
import BlogPost from "./BlogPost";

export default async function BlogPosts() {
    const posts = await getBlogPosts();

    return(
        <div className="p-section grid grid-cols-3 gap-3">
            {posts.map(post => (
                <BlogPost 
                    blogPost={post}
                    key={post.id}
                />
            ))}
        </div>
    )
}