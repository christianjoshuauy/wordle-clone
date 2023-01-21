<template>
  <div class="App">
    <NavBar />
    <Suspense>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </RouterView>
    </Suspense>
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.App {
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
