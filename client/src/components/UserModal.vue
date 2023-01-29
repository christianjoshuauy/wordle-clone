<template>
  <VDialog transition="dialog-bottom-transition">
    <VCard max-width="500" class="mx-auto mb-16 text-center pa-5">
      <VCardTitle>{{ props.user.username }}</VCardTitle>
      <VCardSubtitle class="mb-n5">Stats</VCardSubtitle>
      <VCardText>
        <div>Played Words: {{ props.user.played_words }}</div>
        <div>Highest Streak: {{ props.user.highest_streak }}</div>
        <div>Average Guesses: {{ props.user.avg_no_of_guesses }}</div>
      </VCardText>
      <VCardActions>
        <VBtn color="primary" @click="onClose">Close</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["user"]);
const emit = defineEmits(["closeModal"]);

const onClose = () => {
  emit("closeModal");
};
</script>
