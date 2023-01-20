<template>
  <VAlert
    type="error"
    border="start"
    variant="outlined"
    width="300px"
    class="mx-auto mt-5"
    >{{ props.tip }}</VAlert
  >
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["tip"]);
</script>
