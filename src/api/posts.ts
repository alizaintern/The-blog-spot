import Post from "types/post";

export const fetchPosts = (setPosts: (posts: Post[]) => void) => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const postsWithComments = data.map((post: Post) => ({
        ...post,
        comments: [],
      }));
      setPosts(postsWithComments);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      setPosts([]);
    });
};
