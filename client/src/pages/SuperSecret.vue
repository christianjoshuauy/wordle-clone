<template>
  <div class="mt-16">
    <SecretInput :digit-count="5" @updateValue="handleUpdateValue" />
    <div class="d-flex justify-center mt-5">
      <LetterBox v-for="(letter, i) in wordToGuess" :key="i" :letter="letter" />
    </div>
    <VBtn
      variant="text"
      append-icon="mdi-chevron-down"
      class="mt-5 mx-auto text-overline"
      @click.prevent="showWords = !showWords"
    >
      Total words remaining: {{ words.length }}
    </VBtn>
    <VSlideYTransition mode="out-in" hide-on-leave="true">
      <VCard
        class="d-flex flex-sm-wrap mx-auto w-75 flex-grow-1 justify-center"
        v-if="showWords"
      >
        <span
          :class="
            theme === 'light' ? 'text-teal-darken-2' : 'text-teal-lighten-3'
          "
          class="text-overline rounded ma-1 pa-1 v-btn--variant-outlined"
          v-for="word in words.slice(0, 150)"
          :key="word"
          >{{ word }}</span
        >
      </VCard>
    </VSlideYTransition>
  </div>
</template>

<script setup>
import { useWordStore } from "@/stores/words";
import { useTheme } from "vuetify/lib/framework.mjs";
import { ref } from "vue";
import useWordleSolver from "../hooks/useWordleSolver";
import SecretInput from "../components/SecretInput.vue";
import LetterBox from "@/components/LetterBox.vue";

const theme = useTheme().name;

const wordToGuess = ref([...Array(5).fill("")]);
const input = ref({});
const wordsStore = useWordStore();
const words = ref(
  await wordsStore.getWords().then((res) => {
    return res;
  })
);
const { bestWord, letterFrequency, removeWords } = useWordleSolver();
const showWords = ref(false);

const handleUpdateValue = (event) => {
  input.value = event;
  const guess = input.value.letters.join("");
  let result = "";
  input.value.coloredLetter.map((color) => {
    if (color === "Grey") {
      result += "x";
    } else if (color === "Yellow") {
      result += "y";
    } else {
      result += "g";
    }
  });
  if (guess.length === 5 && result.length === 5) {
    words.value = removeWords(result, guess, words.value);
  }

  handleGetBestWord();
};

const handleGetBestWord = () => {
  wordToGuess.value = bestWord(words.value, letterFrequency(words.value)).split(
    ""
  );
};
</script>
