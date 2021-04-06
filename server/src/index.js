import express from "express";
import path from "path";
import mongodb from "mongodb";
import morgan from "morgan";
import dotenv from "dotenv";
import users from "./routes/users";
import auth from "./routes/auth";
import cv from "./routes/cv";
import upload from "./routes/upload";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static("images"));

//app.use(sleep(500));

dotenv.config({
  path: path.join(__dirname, "../", ".env"),
});

const isDev = app.get("env") === "development";

// Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cv", cv);
app.use("/api/upload", upload);

const port = process.env.PORT || 4000;
const mongoUrl = `${process.env.DB_CONNECTION}`;

mongodb.MongoClient.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db(process.env.DB_NAME);
    app.set("db", db);
    app.get("/api/test", (req, res) => {
      res.json({ mes: "Hello from express" });
    });
    app.listen(port, () => console.log(`Running on localhost:${port}`));
  })
  .catch((err) => console.log("Error connect"));
