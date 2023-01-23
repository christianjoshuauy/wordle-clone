<template>
  <div class="WordleContainer mt-16">
    <div>
      <TransitionGroup name="ui" tag="div">
        <WordleTip :tip="tip" v-if="tip" key="1" />
        <WordleGrid
          :currGuess="currGuess"
          :guesses="guesses"
          :turn="turn"
          key="2"
        />
        <KeyBoard :usedKeys="usedKeys" key="3" />
      </TransitionGroup>
      <GameEndModal
        v-model="showModal"
        :solution="solution"
        :result="result"
        @newGame="onNewGame"
      />
    </div>
  </div>
</template>

<script setup>
import WordleGrid from "../components/WordleGrid.vue";
import { useWordStore } from "@/stores/words";
import { ref, watch, onMounted } from "vue";
import { randomIndex } from "@/utils";

import KeyBoard from "../components/KeyBoard.vue";
import WordleTip from "../components/WordleTip.vue";
import GameEndModal from "../components/GameEndModal.vue";
import useWordle from "@/hooks/useWordle";

const wordsStore = useWordStore();
const words = ref(
  await wordsStore.getWords().then((res) => {
    return res;
  })
);

const solution = ref(words.value[randomIndex(0, words.value.length)]);
const result = ref("");
const showModal = ref(false);

const {
  turn,
  currGuess,
  guesses,
  isCorrect,
  usedKeys,
  handleKeyUp,
  newGame,
  tip,
} = useWordle(solution, words.value);

const onNewGame = () => {
  showModal.value = false;
  solution.value = words.value[randomIndex(0, words.value.length)];
  newGame();
  window.addEventListener("keyup", handleKeyUp);
};

onMounted(() => {
  window.addEventListener("keyup", handleKeyUp);
});

watch([isCorrect, turn], () => {
  if (isCorrect.value) {
    setTimeout(() => {
      showModal.value = true;
    }, 1500);
    result.value = "You Won!";
    window.removeEventListener("keyup", handleKeyUp);
  }

  if (turn.value > 5 && !isCorrect.value) {
    setTimeout(() => {
      showModal.value = true;
    }, 1500);
    result.value = "You Lost";
    window.removeEventListener("keyup", handleKeyUp);
  }

  return () => window.removeEventListener("keyup", handleKeyUp);
});
</script>

<style scoped>
.WordleContainer {
  width: 100vw;
  height: 90vh;
}

.ui-move,
.ui-enter-active,
.ui-leave-active {
  transition: all 0.5s ease;
}

.ui-enter-from,
.ui-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.ui-leave-active {
  position: absolute;
}
</style>
