import express from "express";
import multer from "multer";
import { pool } from "../../config/db.config.js";
import { v4 } from "uuid";

const router = express();

router.post("/addpost", async (req, res) => {
  const {
    posttitle,
    posttext,
    upvotes,
    downvotes,
    comments,
    images,
  } = req.body;
  try {
    const postid = v4();
    const image = images ? images : "";
    const query = `INSERT INTO posts (posttitle, posttext, upvotes, downvotes, comments, postid, images) VALUES ('${posttitle}', '${posttext}', ${upvotes}, ${downvotes}, '${comments}', '${postid}', '${image}')`;
    const result = await pool.query(query);
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  }
  // if (req.session && req.session.user) {
  // }
});

router.get("/allposts", async (req, res) => {
  const query = `SELECT * FROM posts;`;
  const posts = await pool.query(query);
  if (posts) {
    res.json(posts);
  } else {
    res.status(400).json({ error: "No posts found" });
  }
});

router.post("/test", async (req, res) => {
  console.log(req.cookies);
});

export default router;
