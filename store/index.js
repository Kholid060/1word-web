import Vue from 'vue';
import VuexORM from '@vuex-orm/core';
import validateUserObject from '~/utils/validateUserObject';
import firestore from '~/utils/firestore';

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
  async nuxtClientInit({ dispatch }) {
    return await dispatch('fetchUser');
  },
  fetchUser({ commit }) {
    return new Promise((resolve) => {
      const data = localStorage.getItem(
        `Auth:User:${process.env.API_KEY}:default`
      );

      if (!data) resolve();

      const userObject = JSON.parse(data);

      if (validateUserObject(userObject)) {
        commit('setUser', userObject);

        resolve(userObject);
      }

      resolve();
    });
  },
  async retrieveData({ dispatch, state }) {
    const references = ['', '/words', '/practices'];
    const [languages, words, practices] = await Promise.allSettled(
      references.map((ref) => {
        return firestore.reference(`users/${state.user.localId}${ref}`).get();
      })
    );
    const getDataPath = (data) => {
      return data.map((item) => ({
        ...item,
        dataPath: item.__meta__.path
      }));
    };

    if (languages.status === 'fulfilled') {
      const languageIds = languages.value.languages;

      await dispatch('entities/create', {
        entity: 'languages',
        data: languageIds.map((languageId) => ({ languageId }))
      });
    }

    if (words.status === 'fulfilled') {
      await dispatch('entities/create', {
        entity: 'words',
        data: getDataPath(words.value.documents)
      });
    }

    if (practices.status === 'fulfilled') {
      await dispatch('entities/create', {
        entity: 'practices',
        data: getDataPath(practices.value.documents)
      });
    }
  },
  async cleanup({ commit, dispatch }) {
    commit('updateState', {
      key: 'user',
      data: null
    });

    await dispatch('entities/deleteAll');
  }
};
