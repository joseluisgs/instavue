<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile">
        <div class="column">
          <!-- Aquí irá el botón del perfil -->
        </div>
        <div class="column has-text-centered">
          <a href="#">
            <i class="fas fa-camera"></i>
          </a>
        </div>
        <div class="logout column has-text-centered">
          <a v-if="user" href="#" @click="cerrarSesion">
            <i class="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>
              <div class="content has-text-centered">
      <p>
        <strong>InstaVue</strong> by
        <a href="https://twitter.com/joseluisgonsan" target="_blank">José Luis González</a>. Disponible en
        <a href="https://github.com/joseluisgs/instavue" target="_blank">GitHub</a>. 2020.
      </p>
    </div>
    </div>
  </section>
</template>

<script>
import AuthService from '@/services/AuthService';
// Vuex
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppFooter',
  methods: {
    ...mapActions(['cleanUser']),
    async cerrarSesion() {
      // Por si hay que hacer algo en el servidor.
      try {
        await AuthService.logout();
        // enviar a la portada (si no estámos ahí)
        if (this.$route.fullPath !== '/') {
          this.$router.push({ name: 'portada' });
        }
        // Limpiamos los datos de nuestro estado
        this.cleanUser();
        this.alerta('Sesión terminada', 'is-success');
      } catch (error) {
        this.alerta(error, 'is-danger');
        console.log(error);
      }
    },
    // alerta
    alerta(mensaje, tipo) {
      this.$buefy.notification.open({
        message: `${mensaje}`,
        type: `${tipo}`,
      });
    },
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 1rem;
  flex-basis: 80px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
}

i {
  font-size: 50px;
}

.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 40px;
    color: #999999;
  }
}
</style>
