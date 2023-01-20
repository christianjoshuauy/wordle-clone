import { ref } from "vue";

const useWordle = (solution, validWords) => {
  const turn = ref(0);
  const currGuess = ref("");
  const guesses = ref([...Array(6)]);
  const history = ref([]);
  const isCorrect = ref(false);
  const usedKeys = ref({});
  const tip = ref("");

  const formatGuess = () => {
    let solutionArr = [...solution.value];
    let formattedGuess = [...currGuess.value].map((el) => {
      return { key: el, color: "grey" };
    });

    formattedGuess.forEach((el, i) => {
      if (solutionArr[i] === el.key) {
        formattedGuess[i].color = "green";
        solutionArr[i] = null;
      }
    });

    formattedGuess.forEach((el, i) => {
      if (solutionArr.includes(el.key) && el.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArr[solutionArr.indexOf(el.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (coloredGuess) => {
    if (currGuess.value === solution.value) {
      isCorrect.value = true;
    }
    guesses.value[turn.value] = coloredGuess;
    history.value.push(currGuess.value);
    turn.value++;
    coloredGuess.forEach((el) => {
      const currColor = usedKeys.value[el.key];

      if (el.color === "green") {
        usedKeys.value[el.key] = "green";
        return;
      }
      if (el.color === "yellow" && currColor !== "green") {
        usedKeys.value[el.key] = "yellow";
        return;
      }
      if (
        el.color === "grey" &&
        currColor !== "green" &&
        currColor !== "yellow"
      ) {
        usedKeys.value[el.key] = "grey";
        return;
      }
    });
    currGuess.value = "";
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      if (turn.value > 5) {
        console.log("used up all guesses");
        return;
      }

      if (history.value.includes(currGuess.value)) {
        tip.value = "Already tried that";
        return;
      }

      if (currGuess.value.length !== 5) {
        tip.value = "Enter 5 letters";
        return;
      }

      if (!validWords.includes(currGuess.value)) {
        tip.value = "Word not found";
        return;
      }

      const coloredGuess = formatGuess();
      addNewGuess(coloredGuess);
      tip.value = "";
    }

    if (key === "Backspace") {
      currGuess.value = currGuess.value.slice(0, -1);
    }

    if (/^[a-z]$/.test(key)) {
      if (currGuess.value.length < 5) {
        currGuess.value += key;
      }
    }
  };

  const newGame = () => {
    turn.value = 0;
    currGuess.value = "";
    guesses.value = [...Array(6)];
    history.value = [];
    isCorrect.value = false;
    usedKeys.value = {};
  };

  return {
    turn,
    currGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyUp,
    newGame,
    tip,
  };
};

export default useWordle;
