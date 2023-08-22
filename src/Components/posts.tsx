// import React, { useState } from 'react';
// import { Post } from 'types/post';
// import userId from 'constants/userId';
// interface Props{
//     currentId:any,
//     posts:Post[],
//     setPosts:React.Dispatch<React.SetStateAction<Post[]>>;
// }

// function PostItem({ currentId,posts, setPosts }: Props) {
//   const [newComment, setNewComment] = useState<string>("");
//   const [editModePost, setEditModePost] = useState<Post | null>(null);

//   const deletePost = (postId: number, User_Id: any) => {
//     if (User_Id === currentId || userId.includes(User_Id)) {
//       const updatedPosts = posts.filter((post) => post.id !== postId);
//       setPosts(updatedPosts);
//     }
//   };

//   const saveEdit = (editedPost: Post) => {
//     const updatedPosts = posts.map((post) =>
//       post.id === editedPost.id ? editedPost : post
//     );
//     setPosts(updatedPosts);
//     setEditModePost(null);
//   };

//   const addComment = (post: Post) => {
//     if (newComment) {
//       const updatedPost: Post = {
//         ...post,
//         comments: [...post.comments, newComment],
//       };
//       const updatedPosts = posts.map((p) =>
//         p.id === post.id ? updatedPost : p
//       );
//       setPosts(updatedPosts);
//       setNewComment("");
//     }
//   };

//   const editComment = (
//     post: Post,
//     commentIndex: number,
//     editedComment: string | null
//   ) => {
//     if (editedComment) {
//       const updatedComments = post.comments.map((comment, index) =>
//         index === commentIndex ? editedComment : comment
//       );
//       const updatedPost: Post = {
//         ...post,
//         comments: updatedComments,
//       };
//       const updatedPosts = posts.map((p) =>
//         p.id === post.id ? updatedPost : p
//       );
//       setPosts(updatedPosts);
//     }
//   };

//   const deleteComment = (post: Post, commentIndex: number) => {
//     const updatedComments = post.comments.filter(
//       (comment, index) => index !== commentIndex
//     );
//     const updatedPost: Post = {
//       ...post,
//       comments: updatedComments,
//     };
//     const updatedPosts = posts.map((p) => (p.id === post.id ? updatedPost : p));
//     setPosts(updatedPosts);
//   };

//   const editPost = (post: Post) => {
//     setEditModePost(post);
//   };
  

//   return (
//     <div key={post.id} className="post">
//       {editModePost && editModePost.id === post.id ? (
//         // ... Edit mode UI
//       ) : (
//         <>
//           <h2 className="postTitle">{post.title}</h2>
//           <p className="postBody">{post.body}</p>
//           <h3 style={{ paddingLeft: "2%" }}>Comments</h3>
//           {/* ... Comments mapping */}
//           <div className="add-comment">
//             <input
//               className="commentInput"
//               type="text"
//               placeholder="Add a comment"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <button
//               style={{ marginBottom: "0%" }}
//               onClick={() => addComment(post)}
//             >
//               Comment
//             </button>
//           </div>
//           <button onClick={() => deletePost(post.id, post.userId)}>
//             Delete Post
//           </button>
//           <button onClick={() => editPost(post)}>Edit Post</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default PostItem;


import React, { useState } from 'react';

import { Post } from 'interfaces/post'; // Make sure this import is correct
import userId from 'constants/userId'; // Make sure this import is correct

interface Props {
  userName:any,
  currentId: any;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostItem: React.FC<Props> = ({ userName,currentId, posts, setPosts }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [editModePost, setEditModePost] = useState<Post | null>(null);

  const deletePost = (postId: number, User_Id: any) => {
    if (User_Id === currentId || userId.includes(User_Id)) {
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    }
  };

  const saveEdit = (editedPost: Post) => {
    const updatedPosts = posts.map((post) =>
      post.id === editedPost.id ? editedPost : post
    );
    setPosts(updatedPosts);
    setEditModePost(null);
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
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? updatedPost : p
    );
    setPosts(updatedPosts);
  };

  const editPost = (post: Post) => {
    setEditModePost(post);
  };

  return (
    <div>
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
  )
};

export default PostItem;
