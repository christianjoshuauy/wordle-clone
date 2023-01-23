<template>
  <div class="Box" :class="props.color">
    {{ props.letter }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["letter", "color"]);
</script>

<style scoped>
.Box {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  border: 2px solid rgba(156, 156, 156, 0.541);
  margin-left: 0.25em;
  font-size: 2em;
  font-weight: bold;
  text-transform: capitalize;
  transition: all 0.3s ease;
}

.grey,
.green,
.yellow {
  color: white;
}

.grey {
  background-color: #807c7c;
  border-color: #807c7c;
  animation: flip 0.5s ease;
}

.green {
  background-color: #70ac64;
  border-color: #70ac64;
  animation: flip 0.5s ease;
}

.yellow {
  background-color: #d0b45c;
  border-color: #d0b45c;
  animation: flip 0.5s ease;
}

.Box.grey:nth-child(2),
.Box.green:nth-child(2),
.Box.yellow:nth-child(2) {
  animation-delay: 0.2s;
}
.Box.grey:nth-child(3),
.Box.green:nth-child(3),
.Box.yellow:nth-child(3) {
  animation-delay: 0.4s;
}
.Box.grey:nth-child(4),
.Box.green:nth-child(4),
.Box.yellow:nth-child(4) {
  animation-delay: 0.6s;
}
.Box.grey:nth-child(5),
.Box.green:nth-child(5),
.Box.yellow:nth-child(5) {
  animation-delay: 0.8s;
}

.filled {
  animation: fill 0.1s ease;
}

@keyframes fill {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes flip {
  0% {
    transform: rotateX(0);
    background-color: #fff;
    border-color: rgba(156, 156, 156);
    color: black;
  }
  45% {
    transform: rotateX(90deg);
    background-color: #fff;
    border-color: rgba(156, 156, 156);
    color: black;
  }
  55% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0);
  }
}
</style>
