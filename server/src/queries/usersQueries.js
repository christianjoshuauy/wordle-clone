const getUser = "SELECT * FROM users WHERE username = $1";
const getUserById = "SELECT * FROM users WHERE _id = $1";
const getUserDataById =
  "SELECT username, played_words, highest_streak, avg_no_of_guesses FROM users WHERE _id = $1";
const signUp =
  "INSERT INTO users (_id, username, password, played_words, highest_streak, avg_no_of_guesses) VALUES (uuid_generate_v4(), $1, $2, 0, 0, 0.0)";
const updateUser =
  "UPDATE users SET played_words = $1, highest_streak = $2, avg_no_of_guesses = $3 WHERE _id = $4";
const getLeaderboard =
  "SELECT username, played_words, highest_streak, avg_no_of_guesses FROM users ORDER BY highest_streak DESC, avg_no_of_guesses ASC LIMIT 50";

module.exports = {
  getUser,
  getUserById,
  getUserDataById,
  signUp,
  updateUser,
  getLeaderboard,
};
