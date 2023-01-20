export function randomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function checkIfWord(word) {
  let isWord = true;

  for (let i = 0; i < word.length; i++) {
    if (!/^[A-Za-z]$/.test(word[i])) {
      isWord = false;
    }
  }

  return isWord;
}
