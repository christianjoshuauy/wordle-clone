import { defineStore } from "pinia";
import axiosInstance from "@/axiosInstance";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const token = ref("");
  const isAuth = computed(() => !!token.value);
  const user = ref({});
  const router = useRouter();
  let timeout;

  const signUp = async (user) => {
    try {
      const res = await axiosInstance.post("/auth/signup", user);
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  };

  const signIn = async (user) => {
    try {
      const res = await axiosInstance.post("/auth/login", user, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      token.value = res.data.accessToken;
      router.replace("/");
      await getUserData();
      autoSignOut();
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  };

  const signOut = async () => {
    await axiosInstance.get("/auth/signout", {
      withCredentials: true,
    });
    token.value = "";
    user.value = "";
    clearTimeout(timeout);
    router.replace("/login");
  };

  const autoSignOut = () => {
    timeout = setTimeout(async () => {
      await signOut();
    }, 3600 * 1000);
  };

  const getUserData = async () => {
    const res = await axiosInstance.get("/auth", {
      headers: { Authorization: "Bearer " + token.value },
    });
    user.value = res.data.userData;
  };

  const refreshUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/refresh", {
        withCredentials: true,
      });
      token.value = res.data.token;
    } catch (err) {
      token.value = "";
    }
  };

  return { token, user, isAuth, signUp, signIn, signOut, refreshUser };
});
