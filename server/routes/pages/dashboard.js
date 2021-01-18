import express from "express";
import { ensureAuth } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", ensureAuth, (req, res) => {
  res.send("Dashboard");
});

export default router;
