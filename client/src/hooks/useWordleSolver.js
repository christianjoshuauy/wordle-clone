const useWordleSolver = () => {
  const wordScore = (possibleWords, frequency) => {
    let words = {};
    let maxFreq = [0, 0, 0, 0, 0];
    for (let c in frequency) {
      for (let i = 0; i < 5; i++) {
        if (maxFreq[i] < frequency[c][i]) {
          maxFreq[i] = frequency[c][i];
        }
      }
    }
    possibleWords.forEach((str) => {
      let score = 1;
      for (let i = 0; i < 5; i++) {
        let c = str[i];
        score *=
          1 + (frequency[c][i] - maxFreq[i]) * (frequency[c][i] - maxFreq[i]);
      }
      words[str] = score;
      score += Math.random();
    });
    return words;
  };

  const bestWord = (possibleWords, frequency) => {
    let maxScore = Number.MAX_SAFE_INTEGER;
    let best = "words";
    let scores = wordScore(possibleWords, frequency);
    possibleWords.forEach((str) => {
      if (scores[str] < maxScore) {
        maxScore = scores[str];
        best = str;
      }
    });
    return best;
  };

  const letterFrequency = (possibleWords) => {
    let letters = {};
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let c of alphabet) {
      let frequency = Array(5).fill(0);
      for (let i = 0; i < 5; i++) {
        possibleWords.forEach((word) => {
          if (word[i] == c) {
            frequency[i] += 1;
          }
        });
      }
      letters[c] = frequency;
    }
    return letters;
  };

  const badLetters = (result, guess) => {
    let bad = [];
    for (let i = 0; i < 5; i++) {
      if (result[i] === "x") {
        bad.push(guess[i]);
      }
    }
    return bad;
  };

  const partialLetters = (result, guess) => {
    let partial = [];
    for (let i = 0; i < 5; i++) {
      if (result[i] === "y") {
        partial.push([guess[i], i]);
      }
    }
    return partial;
  };

  const correctLetters = (result, guess) => {
    let correct = [];
    for (let i = 0; i < 5; i++) {
      if (result[i] === "g") {
        correct.push([guess[i], i]);
      }
    }
    return correct;
  };

  const removeWords = (result, guess, possibleWords) => {
    let bad = badLetters(result, guess);
    let partial = partialLetters(result, guess);
    let correct = correctLetters(result, guess);
    let goodLetters = [];
    correct.forEach((g) => goodLetters.push(g[0]));
    partial.forEach((p) => goodLetters.push(p[0]));
    let acceptableWords1 = [];
    possibleWords.forEach((word) => {
      let check = 0;
      bad.forEach((b) => {
        if (word.includes(b)) {
          if (!goodLetters.includes(b)) {
            check = 1;
          }
        }
      });
      if (check === 0) {
        acceptableWords1.push(word);
      }
    });
    let acceptableWords2 = [];
    acceptableWords1.forEach((word) => {
      let check = 0;
      correct.forEach((c) => {
        if (word[c[1]] != c[0]) {
          check = 1;
        }
      });
      if (check === 0) {
        acceptableWords2.push(word);
      }
    });
    let acceptableWords3 = [];
    acceptableWords2.forEach((word) => {
      let check = 0;
      partial.forEach((p) => {
        if (word[p[1]] == p[0]) {
          check = 1;
        }
      });
      if (check === 0) {
        acceptableWords3.push(word);
      }
    });
    let acceptableWords4 = [];
    acceptableWords3.forEach((word) => {
      let check = 0;
      goodLetters.forEach((g) => {
        if (!word.includes(g)) {
          check = 1;
        }
      });
      if (check === 0) {
        acceptableWords4.push(word);
      }
    });
    let acceptableWords5 = [];
    acceptableWords4.forEach((word) => {
      let check = 0;
      bad.forEach((b) => {
        if (goodLetters.includes(b)) {
          if (
            word.split(b).length - 1 !==
            goodLetters.filter((x) => x === b).length
          ) {
            check = 1;
          }
        }
      });
      if (check === 0) {
        acceptableWords5.push(word);
      }
    });
    return acceptableWords5;
  };

  return { bestWord, letterFrequency, removeWords };
};

export default useWordleSolver;
