<template>
  <div class="WordleContainer">
    <TransitionGroup name="ui" tag="div">
      <WordleTip :tip="tip" type="error" v-if="tip" key="1" />
      <WordleGrid
        :currGuess="currGuess"
        :guesses="guesses"
        :turn="turn"
        key="2"
      />
      <KeyBoard :usedKeys="usedKeys" key="3" />
      <VBtn key="4" class="mr-2" @click="getProfile" icon="mdi-account"></VBtn>
      <VBtn key="5" @click="getLeaderboard" icon="mdi-finance"></VBtn>
    </TransitionGroup>
    <GameEndModal
      v-model="showGameModal"
      :solution="solution"
      :result="result"
      @newGame="onNewGame"
    />
    <UserModal
      v-model="showUserModal"
      :user="user"
      @closeModal="handleCloseUserModal"
    />
    <LeaderboardModal
      v-model="showLeaderboardModal"
      :leaderboard="leaderboard"
      @closeModal="handleCloseLeaderboardModal"
    />
  </div>
</template>

<script setup>
import WordleGrid from "../components/WordleGrid.vue";
import { useWordStore } from "@/stores/words";
import { ref, watch, onMounted, onUnmounted } from "vue";
import { randomIndex } from "@/utils";

import KeyBoard from "../components/KeyBoard.vue";
import WordleTip from "../components/WordleTip.vue";
import GameEndModal from "../components/GameEndModal.vue";
import useWordle from "@/hooks/useWordle";
import { useUserStore } from "@/stores/user";
import UserModal from "@/components/UserModal.vue";
import { storeToRefs } from "pinia";
import LeaderboardModal from "@/components/LeaderboardModal.vue";

const wordsStore = useWordStore();
const userStore = useUserStore();
const words = ref(
  await wordsStore.getWords().then((res) => {
    return res;
  })
);

const { user } = storeToRefs(userStore);
const solution = ref(words.value[randomIndex(0, words.value.length)]);
const result = ref("");
const showGameModal = ref(false);
const showUserModal = ref(false);
const showLeaderboardModal = ref(false);
const currStreak = ref(0);
const leaderboard = ref([]);

const {
  turn,
  currGuess,
  guesses,
  isCorrect,
  usedKeys,
  handleKeyUp,
  newGame,
  tip,
} = useWordle(solution, words.value);

const onNewGame = async () => {
  showGameModal.value = false;
  solution.value = words.value[randomIndex(0, words.value.length)];
  newGame();
  window.addEventListener("keyup", handleKeyUp);
};

onMounted(async () => {
  await userStore.getUserData();
  window.addEventListener("keyup", handleKeyUp);
});

onUnmounted(async () => {});

const handleGameEnd = async (resultMessage) => {
  setTimeout(() => {
    showGameModal.value = true;
  }, 1500);
  result.value = resultMessage;
  user.value.played_words++;

  if (isCorrect.value) {
    currStreak.value++;
  }

  if (currStreak.value > user.value.highest_streak) {
    user.value.highest_streak = currStreak.value;
  }

  if (user.value.avg_no_of_guesses) {
    user.value.avg_no_of_guesses =
      (user.value.avg_no_of_guesses + turn.value) / 2;
  } else {
    user.value.avg_no_of_guesses = turn.value;
  }

  await userStore.updateUser(user.value);
  window.removeEventListener("keyup", handleKeyUp);
};

watch([isCorrect, turn], () => {
  if (isCorrect.value) {
    handleGameEnd("You Won!");
  }

  if (turn.value > 5 && !isCorrect.value) {
    handleGameEnd("You Lost");
  }

  return () => window.removeEventListener("keyup", handleKeyUp);
});

const getProfile = () => {
  showUserModal.value = true;
};

const handleCloseUserModal = () => {
  showUserModal.value = false;
};

const getLeaderboard = async () => {
  leaderboard.value = await userStore.getLeaderboard();
  showLeaderboardModal.value = true;
};

const handleCloseLeaderboardModal = () => {
  showLeaderboardModal.value = false;
};
</script>

<style scoped>
.WordleContainer {
  width: 100vw;
  height: 90vh;
}

.ui-move,
.ui-enter-active,
.ui-leave-active {
  transition: all 0.5s ease;
}

.ui-enter-from,
.ui-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.ui-leave-active {
  position: absolute;
}
</style>
