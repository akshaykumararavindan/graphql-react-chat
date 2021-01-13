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

router.get("/all", (req, res) => {
  console.log("Hllo");
});

export default router;
