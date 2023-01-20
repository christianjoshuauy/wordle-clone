<template>
  <VDialog v-model="dialog" persistent transition="dialog-bottom-transition">
    <VCard max-width="600" class="mx-auto text-center">
      <VCardTitle>You Won!</VCardTitle>
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
        <VBtn color="primary" variant="outlined" block>New Game</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { defineProps, ref, reactive } from "vue";
import { useWordStore } from "@/stores/words";

const props = defineProps(["showModal", "solution"]);
const store = useWordStore();
const dialog = ref(true);

const info = reactive({});

store
  .getWordInfo(props.solution)
  .then((obj) => {
    Object.assign(info, obj);
  })
  .catch((err) => console.log(err));
</script>

<style scoped>
.word {
  border: 1px solid red;
  border-style: dashed;
}
</style>
