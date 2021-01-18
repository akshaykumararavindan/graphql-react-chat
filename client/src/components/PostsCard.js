import React from "react";

const PostsCard = ({ posts }) => {
  return (
    <>
      {posts &&
        posts.data.rows.map((post) => (
          <div
            style={{
              alignItems: "center",
              width: "50%",
              border: "1px solid white",
              padding: "1rem",
            }}
            key={post.postid}
          >
            <h2>
              <a href="/postpage">{post.posttitle}</a>
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
