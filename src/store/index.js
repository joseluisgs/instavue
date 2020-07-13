import Vue from 'vue';
import Vuex from 'vuex';
// Servicio Firebase
// import Service from '../services/Service';
import UsuariosService from '../services/UsuariosService';

Vue.use(Vuex);

const store = new Vuex.Store({
  // Nuestro estado
  state: {
    entries: null,
    user: null,
    userProfile: {},
  },
  // Mutaciones de nuestro estado
  // Son las únicas encargadas de mutar el estado
  mutations: {
    loadEntries(state, val) {
      state.entries = val;
    },
    saveUser(state, val) {
      state.user = val;
    },
    saveUserProfile(state, val) {
      state.userProfile = val;
    },
  },
  // acciones y peticiones asíncronas
  // todas hacen mutaciones
  actions: {
    // Obtiene el perfil de usuario
    async getUserProfile({ commit, state }) {
      try {
        // Buscamos los datos del usuario
        const res = await UsuariosService.getById(state.user.uid);
        // Establecemos su perfil
        commit('saveUserProfile', res);
      } catch (error) {
        console.error(error);
      }
    },
    // Limpia el estado
    cleanUser({ commit }) {
      commit('saveUser', null);
      commit('saveUserProfile', {});
    },
  },
});

// Exportamos
export default store;
