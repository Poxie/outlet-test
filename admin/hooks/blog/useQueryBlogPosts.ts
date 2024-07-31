import getBlogPosts from "@/api/blog/getBlogPosts";
import { useQuery } from "@tanstack/react-query";

export default function useQueryBlogPosts() {
    return useQuery({
        queryKey: ['blog-posts'],
        queryFn: getBlogPosts,
    })
}