<template>
  <VDialog persistent transition="dialog-bottom-transition">
    <VCard max-width="500" class="mx-auto mb-16 text-center">
      <VCardTitle>
        {{ props.result }}
        <VIcon
          icon="mdi-emoticon-happy-outline"
          color="primary"
          v-if="props.result === 'You Won!'"
        ></VIcon>
        <VIcon icon="mdi-emoticon-sad-outline" color="primary" v-else></VIcon>
      </VCardTitle>
      <div class="text-overline mb-2 mx-auto pa-2 text-center rounded-lg word">
        {{ info.word }}
      </div>
      <VCardSubtitle class="mb-n5">{{ info.part_of_speech }}</VCardSubtitle>
      <VCardText>
        <VList density="compact" class="text-left text-caption">
          <VListSubheader>Definitions</VListSubheader>
          <VListItem v-for="(def, i) in info.definitions" :key="i">
            <template #prepend>
              <VIcon icon="mdi-information-outline"></VIcon>
            </template>
            {{ def }}
          </VListItem>
        </VList>
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          @click.prevent="newGame"
          variant="outlined"
          class="mx-auto"
          >New Game</VBtn
        >
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { defineProps, ref, defineEmits, toRefs, watch } from "vue";
import { useWordStore } from "@/stores/words";

const props = defineProps(["solution", "result"]);
const emit = defineEmits(["newGame"]);
const store = useWordStore();

const info = ref({});

const { solution } = toRefs(props);

const newGame = () => {
  emit("newGame");
};

const getInfo = () => {
  store
    .getWordInfo(solution.value)
    .then((obj) => {
      info.value = obj;
    })
    .catch((err) => console.log(err));
  console.log("called");
};

getInfo();

watch(solution, () => {
  getInfo();
});
</script>

<style scoped>
.word {
  border: 1px solid red;
  border-style: dashed;
}
</style>
