import React, { useState } from "react"; // Import useState
import { Post } from "interfaces/post";

interface Props {
    currentId:any,
    posts:Post[],
    setPosts:React.Dispatch<React.SetStateAction<Post[]>>;
}

function CreatePostForm({ currentId,posts, setPosts }: Props) {
  const [newPostTitle, setNewPostTitle] = useState(""); // Moved to the CreatePostForm component
  const [newPostBody, setNewPostBody] = useState(""); // Moved to the CreatePostForm component

  const createPost = (newPostTitle: any, newPostBody: any) => {
    if (newPostTitle && newPostBody) {
      const newPost: Post = {
        userId: currentId,
        id: posts.length + 1,
        title: newPostTitle,
        body: newPostBody,
        comments: [],
      };
      setPosts([...posts, newPost]);
      setNewPostTitle("");
      setNewPostBody("");
    }
  };

  return (
    <div className="createPost">
      <input
        className="title"
        type="text"
        placeholder="Enter post title"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
      />
      <br />
      <textarea
        className="body"
        placeholder="Enter post body"
        value={newPostBody}
        onChange={(e) => setNewPostBody(e.target.value)}
        rows={10}
        cols={250}
      />
      <br />
      <button
        className="create-btn"
        onClick={() => createPost(newPostTitle, newPostBody)}
      >
        Create Post
      </button>
    </div>
  );
}

export default CreatePostForm;
