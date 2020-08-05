const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const path = require("path");

require("dotenv").config;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://user:user@cluster0.xrvkj.mongodb.net/Cluster0?retryWrites=true&w=majority";

console.log(uri);

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDb is connected..."))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
