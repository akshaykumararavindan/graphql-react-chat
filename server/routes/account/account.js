import express from "express";
import passport from "passport";
import { pool } from "../../config/db.config.js";
import bcryptjs from "bcryptjs";

const router = express.Router();

const { hash } = bcryptjs;

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(401).json({ message: "Please enter all credentials" });
    } else {
      passport.authenticate("login", async (error, user, info) => {
        try {
          if (error) {
            console.error(error);
            throw error;
          }
          if (!user) {
            return res
              .status(401)
              .json({ message: "No user with that email exists!" });
          } else {
            req.logIn(user, async (error) => {
              if (error) {
                console.error(error);
                return res.status(500).json({
                  error: `Internal Server Error: ${error}`,
                });
              } else {
                req.session.key = email;
                req.session.isLoggedIn = true;
                console.log(passport);
                return res.status(200).json({ user: user.rows[0].email });
              }
            });
          }
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName, username, age } = req.body;
  if (!email || !password || !firstName || !lastName) {
    res.status(401).send("Please enter all required credentials!");
  } else {
    const user = await pool.query(
      `SELECT email, password FROM users WHERE email='${email}';`
    );
    if (user.rows[0].email === email) {
      res.status(401).json({ message: "User with that email already exists!" });
      return;
    } else {
      const hashedPassword = await hash(password, 10);
      const query = `INSERT INTO users (email, firstName, lastName, age, password, username) VALUES ('${email}', '${firstName}', '${lastName}', ${age}, '${hashedPassword}', '${username}');`;
      const result = await pool.query(query);
      console.log(result);
      return;
    }
  }
});

router.get("/logout", (req, res) => {
  // if (req.session.isLoggedIn) {
  req.session.destroy((err) => {
    if (err) {
      return console.log("77", err);
    }
    req.logOut();
    return res.redirect("/");
  });
  // }
});

export default router;
