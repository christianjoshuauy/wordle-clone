<template>
  <div class="my-5">
    <div v-for="(row, i) in keyLetters" :key="i">
      <div
        v-for="letter in row"
        :key="letter"
        class="w-auto h-auto ma-1 d-inline-block rounded-lg key"
        :class="
          props.usedKeys && props.usedKeys[letter]
            ? props.usedKeys[letter]
            : theme === 'light'
            ? 'bg-grey-lighten-1'
            : 'bg-grey-darken-3'
        "
      >
        <div v-if="letter === 'Backspace'" class="px-5">
          <VIcon icon="mdi-keyboard-backspace" />
        </div>
        <div v-else-if="letter === 'Enter'" class="px-5">
          <VIcon icon="mdi-keyboard-return" />
        </div>
        <div v-else class="px-4">
          {{ letter }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";

const theme = useTheme().name;
const keyLetters = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  ["Backspace", ..."zxcvbnm".split(""), "Enter"],
];
const props = defineProps(["usedKeys"]);
</script>

<style scoped>
.key {
  line-height: 50px;
  text-transform: capitalize;
  font-weight: 500;
  cursor: pointer;
}

.key.green {
  background-color: #70ac64;
  transition: all 0.3s ease-in;
}

.key.yellow {
  background-color: #d0b45c;
  transition: all 0.3s ease-in;
}

.key.grey {
  background-color: #807c7c;
  transition: all 0.3s ease-in;
}
</style>
