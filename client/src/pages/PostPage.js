import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "../store/context";

const PostPage = () => {
  const { user, post } = useAuthState();

  return (
    <>
      {user ? <div>Hello {user}</div> : <p>No user found</p>}
      <Link to="/dashboard">Go to dashboard</Link>
      {post && (
        <div
          style={{
            alignItems: "center",
            width: "50%",
            border: "1px solid white",
            padding: "1rem",
          }}
        >
          <h2>{post.posttitle}</h2>
          <p>{post.posttext}</p>
          <img src={post.images} alt={post.postid} />
          <p>{post.comments}</p>
          <p>{post.upvotes}</p>
          <p>{post.downvotes}</p>
        </div>
      )}
    </>
  );
};

export default PostPage;
