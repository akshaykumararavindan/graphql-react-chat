import express from "express";
import { pool } from "./config/db.config.js";
import expressSession from "express-session";
import passport from "passport";
import passportLocal from "./config/passport-local.js";
import cors from "cors";
import path from "path";
import redisStore from "connect-redis";
import redis from "redis";
import cookieParser from "cookie-parser";

// Route imports
import account from "./routes/account/account.js";
import posts from "./routes/posts/posts.js";
import pages from "./routes/pages/dashboard.js";

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

const _redisStore = redisStore(expressSession);

const PORT = process.env.PORT || 5000;
const app = express();

(async (PORT) => {
  redisClient.on("error", (err) => {
    console.log("Error connecting to redis!" + err);
  });

  redisClient.on("connect", () => {
    console.log("Connected to redis!");
  });

  // Database connection
  try {
    pool.connect().then(() => console.log("Database connection successful!"));
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }

  // Middlewares
  passportLocal(passport);

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      methods: "GET, POST, PUT, DELETE",
    })
  );
  app.options("*", cors());
  try {
    app.use(
      expressSession({
        store: new _redisStore({ client: redisClient }),
        secret: "somesecret",
        resave: false,
        saveUninitialized: false,
        httpOnly: false,
        cookie: {
          secure: false,
          httpOnly: false,
          maxAge: 30,
        },
      })
    );
  } catch (error) {
    console.error(error);
  }

  app.use(passport.initialize());
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

  // Routes
  app.use("/account", account);
  app.use("/posts", posts);
  app.use("/pages", pages);

  app.get("/", (req, res) => {
    // session = req.session;
  });

  app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
  });
})(PORT);
