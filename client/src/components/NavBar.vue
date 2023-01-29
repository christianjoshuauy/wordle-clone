<template>
  <VAppBar class="px-5">
    <RouterLink
      to="/supersecret"
      class="text-overline text-decoration-none"
      v-if="path === '/'"
    >
      Super Secret
    </RouterLink>
    <RouterLink
      to="/"
      class="text-decoration-none"
      v-else-if="path === '/supersecret'"
      ><VIcon icon="mdi-arrow-left"
    /></RouterLink>
    <VAppBarTitle>Wordle</VAppBarTitle>
    <VBtn
      :icon="
        props.theme.value === 'light'
          ? 'mdi-weather-sunny'
          : 'mdi-weather-night'
      "
      @click.prevent="onThemeClick"
    ></VBtn>
    <VBtn @click.prevent="onSignOut" v-if="userStore.isAuth">logout</VBtn>
  </VAppBar>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const path = computed(() => useRoute().path);
const props = defineProps(["theme"]);
const emit = defineEmits(["onThemeClick"]);

const onThemeClick = () => {
  emit("onThemeClick");
};

const onSignOut = () => {
  userStore.signOut();
};
</script>

<style scoped></style>
