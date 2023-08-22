import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "types/post";
import userId from "constants/userId";
import { isAuthorized } from "utils/authorized";
import { fetchPosts } from "api/posts";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editModePost, setEditModePost] = useState<Post | null>(null);
  const [newPostTitle, setNewPostTitle] = useState<string>("");
  const [newPostBody, setNewPostBody] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const location = useLocation();
  const navigation = useNavigate();
  const currentId = location.state?.id;
  const userName = location.state?.name;
  console.log("username " + userName);
  console.log("userid " + currentId);

  const editPost = (post: Post) => {
    setEditModePost(post);
  };

  useEffect(() => {
  fetchPosts(setPosts);
  
  }, [])


  const createPost = () => {
    if (isAuthorized(userName, navigation)) {
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
    }
  };

  const deletePost = (postId: number, User_Id: any) => {
    if (isAuthorized(userName, navigation)) {
      if (User_Id === currentId || userId.includes(User_Id)) {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      }
    }
  };

  const saveEdit = (editedPost: Post) => {
    if (isAuthorized(userName, navigation)) {
      const updatedPosts = posts.map((post) =>
        post.id === editedPost.id ? editedPost : post
      );
      setPosts(updatedPosts);
      setEditModePost(null);
    }
  };

  const addComment = (post: Post) => {
    if (newComment) {
      const updatedPost: Post = {
        ...post,
        comments: [...post.comments, newComment],
      };
      const updatedPosts = posts.map((p) =>
        p.id === post.id ? updatedPost : p
      );
      setPosts(updatedPosts);
      setNewComment("");
    }
  };

  const editComment = (
    post: Post,
    commentIndex: number,
    editedComment: string | null
  ) => {
    if (editedComment) {
      const updatedComments = post.comments.map((comment, index) =>
        index === commentIndex ? editedComment : comment
      );
      const updatedPost: Post = {
        ...post,
        comments: updatedComments,
      };
      const updatedPosts = posts.map((p) =>
        p.id === post.id ? updatedPost : p
      );
      setPosts(updatedPosts);
    }
  };

  const deleteComment = (post: Post, commentIndex: number) => {
    const updatedComments = post.comments.filter(
      (comment, index) => index !== commentIndex
    );
    const updatedPost: Post = {
      ...post,
      comments: updatedComments,
    };
    const updatedPosts = posts.map((p) => (p.id === post.id ? updatedPost : p));
    setPosts(updatedPosts);
  };

  return (
    <div>
      <h1>Feed</h1>
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
        <button className="create-btn" onClick={createPost}>
          Create Post
        </button>
      </div>
      <h1 style={{ marginBottom: "5%" }}>Posts</h1>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            {editModePost && editModePost.id === post.id ? (
              <div className="editPost">
                <input
                  type="text"
                  placeholder="Enter new title"
                  value={editModePost.title}
                  onChange={(e) =>
                    setEditModePost({
                      ...editModePost,
                      title: e.target.value,
                    })
                  }
                />
                <br />
                <textarea
                  placeholder="Enter new body"
                  value={editModePost.body}
                  onChange={(e) =>
                    setEditModePost({
                      ...editModePost,
                      body: e.target.value,
                    })
                  }
                  rows={10}
                  cols={80}
                />
                <br />
                <button onClick={() => saveEdit(editModePost)}>Save</button>
                <button onClick={() => setEditModePost(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h2 className="postTitle">{post.title}</h2>
                <p className="postBody">{post.body}</p>
                <h3 style={{ paddingLeft: "2%" }}>Comments</h3>
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div style={{ paddingLeft: "2%" }}>
                      <p>
                        {comment} : ({userName})
                      </p>
                    </div>

                    <button
                      style={{ marginTop: "0%", marginBottom: "0%" }}
                      onClick={() =>
                        editComment(
                          post,
                          index,
                          prompt("Edit comment:", comment)
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={{ marginTop: "0%", marginBottom: "0%" }}
                      onClick={() => deleteComment(post, index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <div className="add-comment">
                  <input
                    className="commentInput"
                    type="text"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    style={{ marginBottom: "0%" }}
                    onClick={() => addComment(post)}
                  >
                    Comment
                  </button>
                </div>
                <button onClick={() => deletePost(post.id, post.userId)}>
                  Delete Post
                </button>
                <button onClick={() => editPost(post)}>Edit Post</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
