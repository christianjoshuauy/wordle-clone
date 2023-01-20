<template>
  <div class="WordleContainer">
    <div v-if="state === 'pending'">Loading...</div>
    <div v-else-if="state === 'success'">
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
    <div v-else>Error</div>
  </div>
</template>

<script setup>
import WordleGrid from "./WordleGrid.vue";
import { useWordStore } from "@/stores/words";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { randomIndex } from "@/utils";
import useWordle from "@/hooks/useWordle";
import KeyBoard from "./KeyBoard.vue";
import WordleTip from "./WordleTip.vue";
import GameEndModal from "./GameEndModal.vue";

const { state, words } = storeToRefs(useWordStore());

const solution = ref("");
const result = ref("");
const showModal = ref(false);
let {
  currGuess,
  handleKeyUp,
  guesses,
  isCorrect,
  usedKeys,
  turn,
  newGame,
  tip,
} = {};

const onNewGame = () => {
  showModal.value = false;
  solution.value = words.value[randomIndex(0, words.value.length)];
  newGame();
};

watch([state], () => {
  if (state.value === "success") {
    solution.value = words.value[randomIndex(0, words.value.length)];
    ({
      currGuess,
      handleKeyUp,
      guesses,
      isCorrect,
      usedKeys,
      turn,
      newGame,
      tip,
    } = useWordle(solution, words.value));
    watch([isCorrect, turn], () => {
      window.addEventListener("keyup", handleKeyUp);

      if (isCorrect.value) {
        showModal.value = true;
        result.value = "You Won!";
        window.removeEventListener("keyup", handleKeyUp);
      }

      if (turn.value > 5 && !isCorrect.value) {
        showModal.value = true;
        result.value = "You Lost";
        window.removeEventListener("keyup", handleKeyUp);
      }

      return () => window.removeEventListener("keyup", handleKeyUp);
    });
    window.addEventListener("keyup", handleKeyUp);
  }
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
