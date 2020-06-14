import Vue from 'vue';
import shortid from 'shortid';

export const state = () => ({
  entities: {}
});

export const getters = {
  getAll: (state) => Object.values(state.entities),
  getBy: (state, getters) => (key) => {
    if (typeof key === 'function') {
      return getters.getAll.filter(key);
    }

    return state.entities[key];
  }
};

export const mutations = {
  insertLearn(state, language) {
    Vue.set(state.entities, language.id, language);
  },
  deleteLearn(state, languageId) {
    Vue.delete(state.entities, languageId);
  }
};

export const actions = {
  insert({ commit }, data) {
    return new Promise((resolve) => {
      const language = {
        id: shortid.generate(),
        languageId: data
      };

      commit('insertLearn', language);

      resolve();
    });
  },
  delete({ commit, state }, languageId) {
    return new Promise((resolve, reject) => {
      if (typeof state.entities[languageId] === 'undefined') {
        reject(new Error(`Can't find data with ${languageId} id`));
      }

      commit('deleteLearn', languageId);
      resolve();
    });
  }
};
