const express = require("express");
const cors = require("cors");
const app = express();
const wordsRoutes = require("./src/routes/wordsRoutes");
// const usersRoutes = require("./src/routes/usersRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/words", wordsRoutes);
// app.use("/api/v1/users", usersRoutes);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Wordle server listening on port ${process.env.BACKEND_PORT}`);
});
