<template>
  <VAlert
    :type="props.type"
    border="start"
    :icon="props.type === 'error' ? 'mdi-robot-confused' : 'mdi-robot-happy'"
    variant="outlined"
    width="300px"
    class="mx-auto mt-5"
  >
    {{ props.tip }}
  </VAlert>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["tip", "type"]);
</script>
