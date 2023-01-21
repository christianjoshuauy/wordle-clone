import { defineStore } from "pinia";
import axiosInstance from "@/axiosInstance";
import { reactive } from "vue";

export const useWordStore = defineStore("words", () => {
  const getWords = async () => {
    const words = reactive([]);
    await axiosInstance
      .get("/words")
      .then(({ data }) => {
        data.map((obj) => {
          words.push(obj["word"]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return words;
  };

  const getWordInfo = async (word) => {
    const info = await axiosInstance(`/words/${word}`)
      .then(({ data }) => {
        return data[0];
      })
      .catch((err) => console.log(err));
    return info;
  };

  return { getWords, getWordInfo };
});
