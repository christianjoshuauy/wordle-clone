<template>
  <div class="Keyboard">
    <div
      v-for="letter in keyLetters"
      :key="letter.key"
      :class="props.usedKeys[letter.key]"
    >
      {{ letter.key }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const keyLetters = "qwertyuiopasdfghjklzxcvbnm"
  .split("")
  .map((letter) => ({ key: letter }));
const props = defineProps(["usedKeys"]);
</script>

<style scoped>
.Keyboard {
  max-width: 500px;
  margin: 20px auto;
}

.Keyboard > div {
  margin: 5px;
  width: 40px;
  height: 50px;
  background-color: #d3d6da;
  display: inline-block;
  border-radius: 6px;
  line-height: 50px;
  text-transform: capitalize;
  font-weight: 500;
}

.Keyboard > div.green {
  background-color: #70ac64;
  color: white;
  transition: all 0.3s ease-in;
}

.Keyboard > div.yellow {
  background-color: #d0b45c;
  color: white;
  transition: all 0.3s ease-in;
}

.Keyboard > div.grey {
  background-color: #807c7c;
  color: white;
  transition: all 0.3s ease-in;
}
</style>
