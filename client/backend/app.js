const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/login", cors(), (req, res) => {});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email, password });

    if (check) {
      return res.json("exist");
    } else {
      return res.json("notexist");
    }
  } catch (e) {
    return res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      return res.json("exist");
    } else {
      await collection.insertMany([data]);
      return res.json("notexist");
    }
  } catch (e) {
    console.log(e);
    return res.json("fail");
  }
});

app.listen(8907, () => {
  console.log("port connected");
});
