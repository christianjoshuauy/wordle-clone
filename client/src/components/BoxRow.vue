<template>
  <div class="BoxRow prev" v-if="props.guess">
    <LetterBox
      v-for="(letter, i) in props.guess"
      :key="i"
      :letter="letter.key"
      :color="letter.color"
    />
  </div>
  <div class="BoxRow curr" v-else-if="props.currGuess">
    <LetterBox
      v-for="(letter, i) in props.currGuess.split('')"
      :key="i"
      :letter="letter"
      color="filled"
    />
    <LetterBox
      v-for="(letter, i) in [...Array(5 - currGuess.split('').length)]"
      :key="i"
    />
  </div>
  <div class="BoxRow" v-else>
    <LetterBox />
    <LetterBox />
    <LetterBox />
    <LetterBox />
    <LetterBox />
  </div>
</template>

<script setup>
import LetterBox from "./LetterBox.vue";
import { defineProps } from "vue";

const props = defineProps(["guess", "currGuess"]);
</script>

<style scoped>
.BoxRow {
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
}
</style>
