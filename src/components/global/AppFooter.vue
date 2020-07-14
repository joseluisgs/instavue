<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile">
        <div class="column">
          <!-- Aquí irá el botón del perfil -->
        </div>
        <div class="column has-text-centered">
          <a href="#">
            <!-- Al meter el icono dentro del label asociado al input
            y luego poner el inpit invisible simulamos el botón de carga de ficheros-->
            <input type="file" name="file" id="file" class="inputfile" @change="uploadFile" />
            <label for="file">
              <i class="fas fa-camera"></i>
            </label>
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
    // Metodos de Vuex
    // ...mapMutations(['assingSubmission', 'setSubmitting']),
    ...mapActions(['cleanUser', 'uploadPhoto']),
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
    // Subimos el fichero
    uploadFile(event) {
      const { files } = event.target;
      if (!files.length) return;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (data) => {
        // this.assingSubmission(data.target.result);
        // this.setSubmitting(true);
        // Lo hago con una acción para englobar las dos mutaciones
        this.uploadPhoto(data.target.result);
      };
      // Lo limpiamos
      document.querySelector('#file').value = '';
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

#file {
  display: none;
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
