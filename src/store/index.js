import Vue from 'vue';
import Vuex from 'vuex';
// Servicio Firebase
import Service from '../services/Service';
import UsuariosService from '../services/UsuariosService';

Vue.use(Vuex);

const store = new Vuex.Store({
  // Nuestro estado
  state: {
    entries: null,
    user: null,
    userProfile: {},
    photoSubmission: null,
    submitting: false,
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
    assingSubmission(state, val) {
      state.photoSubmission = val;
    },
    setSubmitting(state, val) {
      state.submitting = val;
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
    // Sube un fichero
    async uploadPhoto({ commit }, file) {
      commit('assingSubmission', file);
      commit('setSubmitting', true);
    },
  },
});

// MANEJO EN TIEMPO REAL DE FIREBASE
//  No perder la sesión si se recarga la página
Service.auth.onAuthStateChanged((user) => {
  if (user) {
    // Almacenamos el usuario, mutacion
    store.commit('saveUser', user);
    // obtenemos el perfil de usuario, accion
    store.dispatch('getUserProfile');
  }
});

// Exportamos
export default store;
