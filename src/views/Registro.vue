<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Registro</h1>
          <hr />
          <form @submit.prevent="registerUser">
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input v-model.trim="usuario.nombre" placeholder="Nombre" required type="text"></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input
                  v-model.trim="usuario.apellidos"
                  placeholder="Apellidos"
                  required
                  type="text"
                ></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input
                  v-model.trim="usuario.email"
                  placeholder="Correo electrónico"
                  required
                  type="email"
                ></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </p>
            <p class="control has-icons-left">
              <b-field>
                <b-input
                  v-model.trim="usuario.password"
                  placeholder="Contraseña"
                  required
                  type="password"
                ></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-unlock-alt"></i>
              </span>
            </p>
            <div class="buttons">
              <b-button tag="input" type="is-info" native-type="submit" value="Registrar" />
            </div>
          </form>
              <router-link :to="{ name: 'recuperar' }">Recuperar contraseña.</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from '@/services/AuthService';
import UsuariosService from '@/services/UsuariosService';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'AppRegister',
  data() {
    return {
      usuario: {},
    };
  },
  methods: {
    // Métodos de vuex a usar
    ...mapMutations(['saveUser']),
    ...mapActions(['getUserProfile']),
    // Registro usuario
    async registerUser() {
      try {
        // registramos el usuario
        // registramos, res tiene ya el objeto user
        const res = await AuthService.register(this.usuario.email, this.usuario.password);
        // Establecemos el usuario
        this.saveUser(res);
        // creamos el peerfil de usuarios
        const perfil = {
          nombre: this.usuario.nombre,
          apellidos: this.usuario.apellidos,
          registro: new Date(),
        };
        // Insertamos en la base de datos
        UsuariosService.post(res.uid, perfil);
        // Obtenemos su perfil
        this.getUserProfile();
        this.alerta('Registro completado', 'is-success');
        this.$router.push({ name: 'portada' });
      } catch (error) {
        console.log(error);
        this.alerta(error, 'is-danger');
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
