require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello from api");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  try {
    console.log(`server is running at port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
