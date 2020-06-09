import Vue from 'vue';
import shortid from 'shortid';

const wordModel = (word) => ({
  id: shortid.generate(),
  title: '',
  meaning: '',
  learnId: '',
  timestamp: Date.now(),
  ...word
});

const validateWord = (words, compare) => {
  return words.some(
    (word) =>
      word.learnId === compare.learnId &&
      word.title.toLowerCase() === compare.toLowerCase() &&
      word.id !== compare.id
  );
};

export const state = () => ({
  entities: {}
});

export const getters = {
  getAll: (state) => Object.values(state.entities)
};

export const mutations = {
  insertWord(state, word) {
    Vue.set(state.entities, word.id, word);
  }
};

export const actions = {
  insert({ commit, state, getters }, data) {
    return new Promise((resolve) => {
      const insertWord = (wordData, batch = false) => {
        const allWords = getters.getAll;
        const word = wordModel(wordData);

        if (!validateWord(allWords, word)) {
          commit('insertWord', word);
        }
      };

      // if (Array.isArray(data)) {

      //   data.forEach((entry) => {
      //     const word = wordModel(entry);

      //     if (!validateWord(allWords, word)) {
      //       commit('insertWord', word);
      //     }
      //   });

      //   resolve();
      // }

      insertWord(data);
      resolve();
    });
  }
};
