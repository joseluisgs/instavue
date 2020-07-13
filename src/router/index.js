import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthService from '@/services/AuthService';
import EntryList from '@/views/EntryList.vue';
import Registro from '@/views/Registro.vue';
import Login from '@/views/Login.vue';
import Recuperar from '@/views/Recuperar.vue';
import Perfil from '@/views/Perfil.vue';

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
    meta: { publico: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { publico: true },
  },
  {
    path: '/recuperar',
    name: 'recuperar',
    component: Recuperar,
    meta: { publico: true },
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Perfil,
    meta: { privado: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Filtros de Middleware
router.beforeEach((to, from, next) => {
  const privado = to.matched.some((destino) => destino.meta.privado);
  const publico = to.matched.some((destino) => destino.meta.publico);
  const usuarioActual = AuthService.getUsuarioActivo();

  if (privado && !usuarioActual) {
    console.info('Se necesita autentificación');
    next({ name: 'login' });
  } else if (publico && usuarioActual) {
    console.info('Ruta para usuarios anónimos');
    next({ name: 'portada' });
  } else if (privado && usuarioActual) {
    console.info('Autentificación establecida');
    next(); // Lo dejamos pasar
  } else {
    console.info('Cualquiera de las otras combinaciones posibles');
    next();
  }
});

export default router;
