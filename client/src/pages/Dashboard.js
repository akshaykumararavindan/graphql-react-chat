import React, { useEffect, useState } from "react";
import { dashboard, userLogout } from "../store/actions";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../store/context";
import PostsCard from "../components/PostsCard";

const Dashboard = () => {
  const [posts, setPosts] = useState(null);
  const dispatch = useAuthDispatch();

  const { user, loading, error } = useAuthState();

  const logoutHandler = async () => {
    await userLogout(dispatch);
  };

  useEffect(() => {
    dashboard(dispatch).then((res) => setPosts(res));
  }, []);

  return (
    <>
      <div>
        {<p>Paragraph</p>}
        <div>No dashboard</div>

        <button
          style={{ float: "right" }}
          type="submit"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <PostsCard posts={posts} />
      <div className="card">
        <img
          src="../../public/img_avatar.png"
          alt="Avatar"
          style={{ width: "100%" }}
        />
        <div className="container">
          <h4>
            <b>John Doe</b>
          </h4>
          <p>Architect & Engineer</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
