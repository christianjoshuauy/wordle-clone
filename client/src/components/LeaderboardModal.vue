<template>
  <VDialog transition="dialog-bottom-transition">
    <VCard max-width="500" class="mx-auto mb-16 text-center pa-5">
      <VCardTitle>Leaderboard</VCardTitle>
      <VCardSubtitle class="mb-n5">Top 50</VCardSubtitle>
      <VCardText>
        <VTable fixed-header>
          <thead>
            <tr>
              <th>Name</th>
              <th>Words Played</th>
              <th>Highest Streak</th>
              <th>Average Guesses</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in props.leaderboard" :key="user.username">
              <td>{{ user.username }}</td>
              <td>{{ user.played_words }}</td>
              <td>{{ user.highest_streak }}</td>
              <td>{{ user.avg_no_of_guesses }}</td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
      <VCardActions>
        <VBtn color="primary" @click="onClose">Close</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["leaderboard"]);
const emit = defineEmits(["closeModal"]);

const onClose = () => {
  emit("closeModal");
};
</script>
