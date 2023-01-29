const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const wordsRoutes = require("./src/routes/wordsRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
require("dotenv").config();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1/words", wordsRoutes);
app.use("/api/v1/auth", usersRoutes);

app.listen(port, () => {
  console.log(`Wordle server listening on port ${port}`);
});
