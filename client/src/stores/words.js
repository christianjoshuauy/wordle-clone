import { defineStore } from "pinia";
import axiosInstance from "@/axiosInstance";
import { ref, reactive } from "vue";

export const useWordStore = defineStore("words", () => {
  const state = ref("pending");
  const words = reactive([]);
  axiosInstance
    .get("/words")
    .then(({ data }) => {
      data.map((obj) => {
        words.push(obj["word"]);
      });
      state.value = "success";
    })
    .catch((err) => {
      state.value = "error";
      console.log(err);
    });

  const getWordInfo = async (word) => {
    const info = await axiosInstance(`/words/${word}`)
      .then(({ data }) => {
        return data[0];
      })
      .catch((err) => console.log(err));
    return info;
  };

  return { state, words, getWordInfo };
});
