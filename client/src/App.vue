<template>
  <VApp class="text-center">
    <NavBar :theme="theme.global.name" @onThemeClick="onThemeClick" />
    <Suspense>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </RouterView>
    </Suspense>
  </VApp>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import { useTheme } from "vuetify/lib/framework.mjs";

const theme = useTheme();

const onThemeClick = () => {
  theme.global.name.value =
    theme.global.name.value === "light" ? "dark" : "light";
};
</script>
