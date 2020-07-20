import Vue from 'vue';
import VuexORM from '@vuex-orm/core';
import { validateUser } from '~/utils/helper';

const VuexDatabase = new VuexORM.Database();

// Get all model inside models folder
const requireModels = require.context('../models', false, /\.js$/);

// Register all model
requireModels.keys().forEach((modelName) => {
  VuexDatabase.register(requireModels(modelName).default);
});

export const plugins = [VuexORM.install(VuexDatabase)];

export const state = () => ({
  practice: {
    valid: false,
    length: 0
  },
  chart: {
    isRetrieved: false,
    pt: {},
    sa: {},
    w: {},
    practices: []
  },
  dark: false,
  retrieveLanguage: false,
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
  updateUser(state, data) {
    Vue.set(state, 'user', {
      ...state.user,
      ...data
    });
  },
  deleteEntity(state, key) {
    Vue.delete(state[key], 'entities', {});
  }
};

export const actions = {
  async nuxtClientInit({ dispatch, commit }) {
    const dark = localStorage.getItem('dark');

    commit('updateState', {
      key: 'dark',
      data: dark ? JSON.parse(dark) : false
    });

    return await dispatch('fetchUser');
  },
  fetchUser({ commit }) {
    return new Promise((resolve) => {
      const data = localStorage.getItem(
        `Auth:User:${process.env.API_KEY}:default`
      );

      if (!data) resolve();

      const userObject = JSON.parse(data);

      if (validateUser(userObject)) {
        commit('setUser', userObject);

        resolve(userObject);
      }

      resolve();
    });
  },
  async cleanup({ commit, dispatch }) {
    commit('updateState', {
      key: 'user',
      data: null
    });

    await dispatch('entities/deleteAll');
  }
};
