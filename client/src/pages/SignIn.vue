<template>
  <VCard class="mx-auto pa-6 mt-16" width="500px">
    <VCardTitle class="mb-4">Sign In</VCardTitle>
    <VForm ref="form" v-model="valid">
      <VTextField
        v-model="username"
        :rules="usernameRules"
        type="text"
        label="Username"
        required
      />
      <VTextField
        v-model="password"
        :rules="passwordRules"
        type="password"
        label="Password"
        required
      />
      <VBtn color="primary" @click="validate" :loading="isLoading">Login</VBtn>
      <WordleTip :tip="message" type="success" v-if="message" />
      <WordleTip :tip="error" type="error" v-else-if="error" />
    </VForm>
    <VCardActions class="text-center">
      <RouterLink to="/signup" class="text-overline text-decoration-none"
        >Sign Up</RouterLink
      >
    </VCardActions>
  </VCard>
</template>

<script setup>
import WordleTip from "@/components/WordleTip.vue";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();
const valid = ref(false);
const username = ref("");
const password = ref("");
const form = ref(null);
const message = ref("");
const error = ref("");
const isLoading = ref(false);

const usernameRules = [
  (v) => !!v || "Username is required",
  (v) => (v && v.length >= 6) || "Username must be at least 6 characters",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 8) || "Password must be at least 6 characters",
];

const validate = async () => {
  try {
    isLoading.value = true;
    const { valid } = await form.value.validate();

    if (valid) {
      const data = await store.signIn({
        username: username.value,
        password: password.value,
      });
      message.value = data.message;
      router.replace("/");
    }
  } catch (err) {
    error.value = err;
  } finally {
    username.value = "";
    password.value = "";
    isLoading.value = false;
  }
};
</script>
