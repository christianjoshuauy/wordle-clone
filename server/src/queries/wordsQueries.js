const getWords = "SELECT * FROM words";
const getWord = "SELECT * FROM words WHERE word = $1";
const addWord =
  "INSERT INTO words (word, part_of_speech, definitions) VALUES ($1, $2, $3)";
const updateWord = "UPDATE words SET definition = $1 WHERE word = $2";
const removeWord = "DELETE FROM words WHERE word = $1";

module.exports = {
  getWords,
  getWord,
  addWord,
  updateWord,
  removeWord,
};
