<template>
  <div ref="inputCont" class="mt-6 mx-auto">
    <input
      type="text"
      class="input-box text-center"
      v-for="(el, i) in letters"
      :class="[
        { bounce: letters[i] !== null },
        coloredLetter[i] === 'Grey'
          ? 'bg-grey-lighten-1'
          : coloredLetter[i] === 'Yellow'
          ? 'bg-yellow-lighten-2'
          : coloredLetter[i] === 'Green'
          ? 'bg-green-lighten-1'
          : 'bg-white',
      ]"
      :key="el + i"
      v-model="letters[i]"
      :autofocus="i === 0"
      maxlength="1"
      @keydown="handleKeyDown($event, i)"
    />
    <div>
      <VSelect
        hint="color"
        persistent-hint
        :items="['Grey', 'Yellow', 'Green']"
        class="d-inline-block ma-1 text-caption"
        v-for="(color, i) in coloredLetter"
        :key="i"
        v-model="coloredLetter[i]"
        @update:model-value="handleColor($event, i)"
      />
    </div>
    <VBtn class="mt-6" color="primary" @click.prevent="handleClickBest"
      >Get Best Word</VBtn
    >
    <VBtn class="mt-6" color="primary" @click.prevent="handleReset">Reset</VBtn>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from "vue";

const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["updateValue", "resetWords"]);
const letters = reactive([]);
const coloredLetter = reactive([...Array(5)]);
const inputCont = ref(null);

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    letters[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    letters[i] = null;
  }
}

const handleKeyDown = function (event, index) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    letters[index] = null;

    if (index != 0) {
      inputCont.value.children[index - 1].focus();
    }

    return;
  }

  if (new RegExp("^([a-z])$").test(event.key)) {
    letters[index] = event.key;

    if (index != props.digitCount - 1) {
      inputCont.value.children[index + 1].focus();
    }
  }
};

const handleColor = (event, i) => {
  coloredLetter[i] = event;
};

const handleClickBest = () => {
  emit("updateValue", { letters, coloredLetter });
};

const handleReset = () => {
  emit("resetWords");
};
</script>

<style scoped>
.input-box {
  height: 4rem;
  width: 4rem;
  border: 2px solid rgba(156, 156, 156, 0.541);
  display: inline-block;
  margin: 5px;
  padding: 15px;
  font-size: 2.5rem;
  text-transform: capitalize;
}

.input-box:focus {
  outline: 1px solid rgba(156, 156, 156, 0.541);
}

.bounce {
  animation: pulse 0.3s ease-in-out alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}
</style>
