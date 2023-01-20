const pool = require("../db");
const queries = require("../queries/wordsQueries");

const getWords = (req, res) => {
  pool.query(queries.getWords, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const addWord = (req, res) => {
  const { word, partOfSpeech, definitions } = req.body;
  pool.query(queries.getWord, [word], (err, results) => {
    if (err) {
      throw err;
    }
    if (results.rows.length) {
      res.send("Word already exists.");
    } else {
      pool.query(
        queries.addWord,
        [word, partOfSpeech, definitions],
        (err, results) => {
          if (err) {
            throw err;
          }
          res.status(201).send("Word added successfully.");
        }
      );
    }
  });
};

const getWord = (req, res) => {
  const word = req.params.word;
  pool.query(queries.getWord, [word], (err, results) => {
    if (err) {
      throw err;
    }
    if (!results.rows.length) {
      res.send("Word doesn't exist.");
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const updateWord = (req, res) => {
  const word = req.params.word;
  const { definition } = req.body;
  pool.query(queries.getWord, [word], (err, results) => {
    if (err) {
      throw err;
    }
    if (!results.rows.length) {
      res.send("Word doesn't exist.");
    } else {
      pool.query(queries.updateWord, [definition, word], (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).send("Word updated successfully.");
      });
    }
  });
};

const removeWord = (req, res) => {
  const word = req.params.word;
  pool.query(queries.getWordById, [word], (err, results) => {
    if (err) {
      throw err;
    }
    if (!results.rows.length) {
      res.send("Word doesn't exist.");
    } else {
      pool.query(queries.removeWord, [word], (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).send("Word removed successfully.");
      });
    }
  });
};

module.exports = { getWords, addWord, getWord, updateWord, removeWord };
