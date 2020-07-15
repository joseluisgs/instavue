<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Perfil</h1>
          <!-- Nombre y apellidos -->
          <form @submit.prevent="updateName">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  v-model.trim="perfil.nombre"
                  class="input"
                  type="text"
                  :placeholder="userProfile.nombre"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  v-model.trim="perfil.apellidos"
                  class="input"
                  type="text"
                  :placeholder="userProfile.apellidos"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button
                  :disabled="!perfil.nombre.length || !perfil.apellidos.length"
                  class="button is-info"
                  :class="{'is-loading': actualizandoDatos}"
                >Actualizar nombre y apellidos</button>
              </p>
            </div>
          </form>

          <hr />

          <!-- Correo-e -->
          <form @submit.prevent="updateEmail">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="perfil.email" class="input" type="email" :placeholder="user.email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button
                  :disabled="!perfil.email.length"
                  class="button is-info"
                  :class="{'is-loading': actualizandoEmail}"
                >Actualizar e-mail</button>
              </p>
            </div>
          </form>

          <hr />

          <!-- Contraseña -->
          <form @submit.prevent="updatePassword">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  v-model.trim="perfil.password"
                  class="input"
                  type="password"
                  placeholder="Nueva contraseña"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-unlock-alt"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button
                  :disabled="!perfil.password.length"
                  class="button is-info"
                  :class="{'is-loading': actualizandoPassword}"
                >Actualizar contraseña</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
// import AuthService from '@/services/AuthService';
import UsuariosService from '@/services/UsuariosService';
import EntradasService from '@/services/EntradasService';

export default {
  name: 'UserProfile',
  data() {
    return {
      perfil: {
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
      },
      actualizandoDatos: false,
      actualizandoEmail: false,
      actualizandoPassword: false,
    };
  },
  methods: {
    // Actualizo nombre y apellidos.
    async updateName() {
      // Actualizamos datos personales
      this.actualizandoDatos = true;
      const nuevoPerfil = {
        nombre: this.perfil.nombre,
        apellidos: this.perfil.apellidos,
      };
      try {
        // Se actualiza el perfil
        await UsuariosService.put(this.user.uid, nuevoPerfil);
        // su actualiza las entradas que tienen el nombre del usuario
        const entradas = await EntradasService.getByUser(this.user.uid);
        // Actualizamos todo los entradas/fotos
        entradas.forEach(async (entrada) => {
          const data = { username: `${this.nombre} ${this.apellidos}` };
          await EntradasService.put(entrada.id, data);
        });
        // Podíamos usar una promesa, pero no es necesario en este caso.
        // Actualizamos las fotos
        this.alerta('Datos actualizados', 'is-success');
      } catch (error) {
        console.error(error.message);
        this.alerta(error, 'is-danger');
      } finally {
        this.actualizandoDatos = false;
      }
    },
    // Actualizar Email
    async updateEmail() {
      this.actualizandoCorreoe = true;
      try {
        await UsuariosService.updateEmail(this.perfil.email);
        this.alerta('E-Mail actualizado', 'is-success');
      } catch (error) {
        console.error(error.message);
        this.alerta(error, 'is-danger');
      } finally {
        this.actualizandoEmail = false;
      }
    },
    // Actualozacion del password
    async updatePassword() {
      this.actualizandoPassword = true;
      try {
        await UsuariosService.updateEmail(this.perfil.password);
        this.alerta('E-Mail actualizado', 'is-success');
      } catch (error) {
        console.error(error.message);
        this.alerta(error, 'is-danger');
      } finally {
        this.actualizandoPassword = false;
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
    ...mapState(['userProfile', 'user']),
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
