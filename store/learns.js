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
  insertLearn(state, learn) {
    Vue.set(state.entities, learn.id, learn);
  },
  deleteLearn(state, learnId) {
    Vue.delete(state.entities, learnId);
  }
};

export const actions = {
  insert({ commit }, data) {
    return new Promise((resolve) => {
      const learn = {
        id: shortid.generate(),
        learnId: data
      };

      commit('insertLearn', learn);

      resolve();
    });
  },
  delete({ commit, state }, learnId) {
    return new Promise((resolve, reject) => {
      if (typeof state.entities[learnId] === 'undefined') {
        reject(new Error(`Can't find data with ${learnId} id`));
      }

      commit('deleteLearn', learnId);
      resolve();
    });
  }
};
