<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Recuperar contraseña</h1>
          <p class="subtitle">Introduce tu correo-e para iniciar el proceso de recuperación.</p>
          <hr />
          <form @submit.prevent="recuperarPassword">
              <p class="control has-icons-left has-icons-right">
                <b-field>
                  <b-input
                    placeholder="Correo Electrónico"
                    v-model.trim="email"
                    required
                    type="email">
                  </b-input>
                </b-field>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </p>
            <div class="field">
              <p class="control">
                <button class="button is-info">Recuperar</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  name: 'Recuperar',
  data() {
    return {
      email: '',
      trabajando: false,
    };
  },
  methods: {
    async recuperarPassword() {
      try {
        // Hacemos el reset
        await AuthService.reset(this.email);
        this.email = '';
        this.alerta('Operación realizada correctamente, chequea tu correo.', 'is-success');
        this.redirigir();
      } catch (error) {
        this.alerta(error, 'is-danger');
      }
    },
    // Redirige a otro lado
    redirigir() {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.$router.push({ name: 'login' });
      }, 2000);
    },
    // alerta
    alerta(mensaje, tipo) {
      this.$buefy.notification.open({
        message: `${mensaje}`,
        type: `${tipo}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: lightgray;
  flex-grow: 1;
  padding: 1rem;
  padding-top: 100px;
  padding-bottom: 60px;
}
</style>
