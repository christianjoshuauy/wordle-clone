<template>
  <div class="WordleContainer">
    <div v-if="state === 'pending'">Loading...</div>
    <TransitionGroup name="ui" tag="div" v-else-if="state === 'success'">
      <WordleTip :tip="tip" v-if="tip" key="1" />
      <WordleGrid
        :currGuess="currGuess"
        :guesses="guesses"
        :turn="turn"
        key="2"
      />
      <KeyBoard :usedKeys="usedKeys" key="3" />
    </TransitionGroup>
    <div v-else>Error</div>
    <GameEndModal :showModal="showModal" :solution="solution" />
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
const showModal = ref(false);
let {
  currGuess,
  handleKeyUp,
  guesses,
  isCorrect,
  usedKeys,
  turn,
  // newGame,
  tip,
} = {};

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
      // newGame,
      tip,
    } = useWordle(solution.value, words.value));
    watch([isCorrect, turn], () => {
      window.addEventListener("keyup", handleKeyUp);

      if (isCorrect.value) {
        console.log("you win");
        showModal.value = true;
        window.removeEventListener("keyup", handleKeyUp);
      }

      if (turn.value > 5 && !isCorrect.value) {
        console.log("you lose");
        showModal.value = true;
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
  height: 100vh;
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
