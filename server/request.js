const axios = require("axios");
const pool = require("./src/db");
const fs = require("fs");

const request = () => {
  fs.readFile(__dirname + "/words.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const { fiveLetterWords } = JSON.parse(data);
      fiveLetterWords.slice(5000, 6000).map(async (word) => {
        await axios
          .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
          .then(({ data }) => {
            const { word, meanings } = data[0];
            const { partOfSpeech, definitions } = meanings[0];
            let arr_of_definitions = [];
            definitions.map((test) => {
              const { definition } = test;
              arr_of_definitions.push(definition);
            });
            pool.query(
              "INSERT INTO words (word, part_of_speech, definitions) VALUES ($1, $2, $3)",
              [word, partOfSpeech, arr_of_definitions],
              (err, results) => {
                if (err) {
                  console.log(err);
                }
                console.log("success");
              }
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });
};

export default request;
