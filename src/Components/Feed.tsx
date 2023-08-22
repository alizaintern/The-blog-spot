import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchPosts } from "api/posts";
import { Post } from "interfaces/post";
import CreatePostForm from "./createPost";
import PostItem from "./posts";
import Record from "interfaces/record";
import ROUTES from "constants/routes";


interface Props{
  records:Record[],
  setRecords:React.Dispatch<React.SetStateAction<Record[]>>;
}
const Feed: React.FC<Props> = ({ records,setRecords }) =>{
  const [posts, setPosts] = useState<Post[]>([]);
  
  const location = useLocation();
  const navigation = useNavigate();
  const currentId = location.state?.id;
  const userName = location.state?.name;

  useEffect(() => {
    if (!userName) navigation("/");
  }, [userName, navigation]);

  

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  const handleLogout = () => {
    // Perform any logout-related actions (e.g., clearing session)
    // const updatedUsers = records.filter(user => user.username !== userName);
    // setRecords(updatedUsers);
    navigation(ROUTES.Login_Form); // Redirect to the login page after logout
  };

  
  return (
    <div>
      <h1>Feed</h1>
      <button onClick={handleLogout}>Logout</button>
      <CreatePostForm  currentId={currentId} posts={posts} setPosts={setPosts} />
      <h1 style={{ marginBottom: "5%" }}>Posts</h1>
      <PostItem  userName={userName} currentId={currentId} posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default Feed;
