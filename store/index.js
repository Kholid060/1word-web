import Vue from 'vue';
import VuexORM from '@vuex-orm/core';
import validateUserObject from '~/utils/validateUserObject';

const database = new VuexORM.Database();

// Get all model inside models folder
const requireModels = require.context('../models', false, /\.js$/);

// Register all model
requireModels.keys().forEach((modelName) => {
  database.register(requireModels(modelName).default);
});

export const plugins = [VuexORM.install(database)];

export const state = () => ({
  practice: {
    valid: false,
    length: 0
  },
  openProfile: false,
  user: null
});

export const mutations = {
  updateState(state, { key, data }) {
    Vue.set(state, key, data);
  },
  setUser(state, authUser) {
    const { localId, email, emailVerified, displayName } = authUser;

    state.user = {
      localId,
      email,
      emailVerified,
      displayName
    };
  },
  deleteEntity(state, key) {
    Vue.delete(state[key], 'entities', {});
  }
};

export const actions = {
  nuxtClientInit({ commit }) {
    return new Promise((resolve) => {
      const userKey = Object.keys(localStorage).find((key) =>
        key.startsWith('Auth:User')
      );

      if (!userKey) resolve();

      const userObject = JSON.parse(localStorage.getItem(userKey));

      if (validateUserObject(userObject)) {
        commit('setUser', userObject);

        resolve();
      }

      resolve();
    });
  },
  async retrieveData({ dispatch }) {
    function randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    }
    function wordGenerator(id, length = 13) {
      return new Array(length).fill().map((nothing) => {
        const randomText = () =>
          Math.random()
            .toString(36)
            .substring(7);
        return {
          title: randomText(),
          meaning: randomText(),
          learnId: id,
          timestamp: randomDate(new Date(2020, 4, 29), new Date()).getTime()
        };
      });
    }
    function practiceGenerator(id, length = 10) {
      const randomNumber = (min = 1, max = 20) =>
        Math.floor(Math.random() * (max - min) + min);
      return new Array(length).fill().map((nothingToo) => {
        return {
          correct: randomNumber(),
          wrong: randomNumber(5, 30),
          score: randomNumber(0, 100),
          question_length: randomNumber(10, 28),
          learnId: id,
          timestamp: randomDate(new Date(2020, 5, 1), new Date()).getTime()
        };
      });
    }
    await dispatch('entities/create', {
      entity: 'learns',
      data: [
        {
          learnId: 'de',
          practices: practiceGenerator('de', 2),
          words: wordGenerator('de', 15)
        },
        {
          learnId: 'es',
          practices: practiceGenerator('es', 6),
          words: wordGenerator('es', 21)
        }
      ]
    });
  },
  cleanup({ commit }) {
    return new Promise((resolve) => {
      commit('deleteEntity', 'learns');
      commit('deleteEntity', 'words');

      resolve();
    });
  }
};
