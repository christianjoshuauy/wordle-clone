const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const queries = require("../queries/usersQueries");

const signUp = (req, res) => {
  const { username, password } = req.body;

  pool.query(queries.getUser, [username], (err, results) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (results.rows.length) {
      return res.status(401).json({ error: "Username already taken" });
    }
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      pool.query(queries.signUp, [username, hash], (err, results) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        return res
          .status(200)
          .json({ message: "User successfully registered." });
      });
    });
  });
};

const signIn = (req, res) => {
  const { username, password } = req.body;

  pool.query(queries.getUser, [username], async (err, results) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (!results.rows.length) {
      return res.status(401).json({ error: "Invalid username" });
    }
    const user = results.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.TOKEN_SECRET_FORMULA,
      {
        expiresIn: "60s",
      }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET_FORMULA,
      {
        expiresIn: "120s",
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      signed: true,
    });
    return res.status(200).json({
      message: "Login Success",
      accessToken: accessToken,
    });
  });
};

const signOut = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const getUser = (req, res) => {
  const userId = req.user.userId;

  pool.query(queries.getUserById, [userId], (err, results) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    if (!results.rows.length) {
      return res.status(404).json({ error: "No user found" });
    }
    const { username, played_words, highest_streak, avg_no_of_guesses } =
      results.rows[0];
    return res.status(200).json({
      message: "Retrieved User Data",
      userData: {
        name: username,
        played_words,
        highest_streak,
        avg_no_of_guesses,
      },
    });
  });
};

const updateUser = (req, res) => {};

const removeUser = (req, res) => {};

const refreshUser = (req, res) => {
  const cookies = req.signedCookies;

  if (!cookies?.refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const refreshToken = cookies.refreshToken;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_FORMULA,
    (err, decoded) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      pool.query(queries.getUserById, [decoded.userId], (err, results) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        if (!results.rows.length) {
          return res.status(400).json({ error: "Unauthorized" });
        }
        const user = results.rows[0];
        const newAccessToken = jwt.sign(
          { userId: user._id },
          process.env.TOKEN_SECRET_FORMULA,
          { expiresIn: "60s" }
        );
        return res.status(200).json({ token: newAccessToken });
      });
    }
  );
};

module.exports = {
  signUp,
  signIn,
  signOut,
  getUser,
  updateUser,
  removeUser,
  refreshUser,
};
