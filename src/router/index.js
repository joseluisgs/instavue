import Vue from 'vue';
import VueRouter from 'vue-router';
import EntryList from '../views/EntryList.vue';
import Registro from '../views/Registro.vue';
import Login from '../views/Login.vue';
import Recuperar from '../views/Recuperar.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'portada',
    component: EntryList,
    alias: '/EntryList',
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/recuperar',
    name: 'recuperar',
    component: Recuperar,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
