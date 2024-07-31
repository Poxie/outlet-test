import BlogHeader from "./BlogHeader";
import BlogPosts from "./BlogPosts";

export default function Blog() {
    return(
        <main>
            <BlogHeader />
            <div className="w-main max-w-main mx-auto">
                <BlogPosts />
            </div>
        </main>
    )
}