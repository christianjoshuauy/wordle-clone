<template>
  <div class="WordleGrid">
    <div v-for="(guess, i) in props.guesses" :key="i">
      <BoxRow :currGuess="props.currGuess" v-if="props.turn === i" />
      <BoxRow :guess="guess" v-else />
    </div>
  </div>
</template>

<script setup>
import BoxRow from "./BoxRow.vue";
import { defineProps } from "vue";

// const props = defineProps(["currGuess", "guesses", "turn"]);
const props = defineProps({
  currGuess: {
    type: String,
    default: "",
  },
  guesses: {
    type: Array,
    default() {
      return [...Array(6)];
    },
  },
  turn: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.WordleGrid {
  margin-top: 1em;
  transition: all 0.3s ease;
}
</style>
