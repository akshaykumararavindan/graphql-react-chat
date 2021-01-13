import { pool } from "./db.config.js";
import passport from "passport";
import bcryptjs from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

const { compare } = bcryptjs;

export default function (passport) {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await pool.query(
            `SELECT email, password FROM users WHERE email='${email}';`
          );
          if (user.rowCount === 0) {
            return done(false, null, {
              message: "User with that email does not exist.",
            });
          }

          if (
            user.rowCount !== 0 &&
            user.rows[0].password &&
            (await compare(password, user.rows[0].password))
          ) {
            return done(null, user);
          } else {
            return done(
              "One or more of your credentials are incorrect!",
              null,
              { message: "The credentials you entered are incorrect" }
            );
          }
        } catch (error) {
          console.error("35", error);
          return;
        }
      }
    )
  );
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  pool.query(
    `SELECT email, password FROM users WHERE email='${email}';`,
    (error, user) => {
      if (error) {
        console.error(error);
        return new Error(error);
      } else {
        done(null, user.rows[0].email);
      }
    }
  );
});
