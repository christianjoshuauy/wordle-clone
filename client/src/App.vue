<template>
  <div class="App">
    <NavBar />
    <WordleContainer />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import WordleContainer from "./components/WordleContainer.vue";

// const handleClick = async () => {
//   const info = await store.getWordInfo("algae");
//   console.log(info);
// };
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
