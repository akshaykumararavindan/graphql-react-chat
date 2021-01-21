import React, { useState } from "react";
import * as constants from "../store/constants/constants";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../store/context";

const PostsCard = ({ posts }) => {
  const dispatch = useAuthDispatch();

  const postHandler = (post) => {
    console.log(post);
    dispatch({ type: constants.GET_SINGLE_POST_SUCCESS, payload: post });
  };
  return (
    <>
      {posts &&
        posts.data.rows.map((post, idx) => (
          <div
            style={{
              alignItems: "center",
              width: "50%",
              border: "1px solid white",
              padding: "1rem",
            }}
            key={idx}
          >
            <h2>
              <Link
                to="/postpage"
                onClick={() => {
                  postHandler(posts.data.rows[idx]);
                }}
              >
                {post.posttitle}
              </Link>
            </h2>
            <p>{post.posttext}</p>
            <img src={post.images} alt={post.postid} />
            <p>{post.comments}</p>
            <p>{post.upvotes}</p>
            <p>{post.downvotes}</p>
          </div>
        ))}
    </>
  );
};

export default PostsCard;
