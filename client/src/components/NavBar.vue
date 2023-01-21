<template>
  <header className="Header">
    <h1>Wordle</h1>
    <RouterLink to="/">First</RouterLink>
    <RouterLink to="/supersecret">Secret</RouterLink>
  </header>
</template>

<script setup></script>

<style scoped>
.Header {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 1em 0;
}
</style>
