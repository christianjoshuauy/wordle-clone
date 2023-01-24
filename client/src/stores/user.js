import { defineStore } from "pinia";
import axiosInstance from "@/axiosInstance";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref("");
  const isAuth = computed(() => !!token.value);
  const user = ref({});

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
      await getUserData();
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
