import Vue from 'vue';
// Bulma
import Buefy from 'buefy';
// Moment
import VueMoment from 'vue-moment';
import moment from 'moment'; // Moment en español
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// importamos Buefy
import 'buefy/dist/buefy.css';
// Usamos Buefy
Vue.use(Buefy);
// require('./assets/main.scss'); // Pos i cambiamos el estilo de Bulma
// Usamos moment
require('moment/locale/es');

Vue.use(VueMoment, { moment });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
