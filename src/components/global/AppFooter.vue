<template>
  <section class="section">
    <div class="container">
      <!-- Zona para ver la foto -->
      <div v-show="streaming" id="stream-container" class="has-text-centered">
        <hr />
        <div id="stream"></div>
        <hr />
        <a href="#" @click="snapPhoto">
          <i class="fas fa-dot-circle"></i>
        </a>
        <br>
          <a href="#" @click="cancelPhoto">Cancelar</a>
        <hr />
      </div>
      <div class="columns is-mobile">
        <!-- Perfil -->
        <div class="profile column has-text-centered">
          <a href="#" @click="openProfile">
            <i class="fas fa-user"></i>
          </a>
        </div>
        <div class="capture column has-text-centered">
           <!-- Capturar foto -->
          <i @click="capturePhoto" class="fas fa-camera"></i>
            <!-- Al meter el icono dentro del label asociado al input
            y luego poner el inpit invisible simulamos el botón de carga de ficheros-->
            <input type="file" name="file" id="file" class="inputfile" @change="uploadFile" />
            <!-- Solo si esta identificado -->
            <label v-if="user" for="file">
              <i class="fas fa-file-image"></i>
            </label>
            <i v-else @click="uploadFile" class="fas fa-camera"></i>
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
  // Modelo de datos
  data() {
    return {
      streaming: false,
    };
  },
  methods: {
    // Metodos de Vuex
    // ...mapMutations(['assingSubmission', 'setSubmitting']),
    ...mapActions(['cleanUser', 'uploadPhoto']),
    // Cerrar sesión
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
      // comprobamos que está identificado
      // si no lo mandamos a login
      if (!this.user) {
        if (this.$route.name !== 'login') {
          this.$router.push({ name: 'login' });
        }
        return;
      }
      const { files } = event.target;
      if (!files.length) return;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]); // Solo es un fichero

      reader.onload = (data) => {
        // this.assingSubmission(data.target.result);
        // this.setSubmitting(true);
        // Lo hago con una acción para englobar las dos mutaciones
        // Obtiene el fichero en Base64
        this.uploadPhoto(data.target.result);
      };
      // Lo limpiamos
      document.querySelector('#file').value = '';
    },
    // capturamos foto
    capturePhoto() {
      // Si estamos logueados
      if (!this.user) {
        if (this.$route.name !== 'login') {
          this.$router.push({ name: 'login' });
        }
        return;
      }

      this.streaming = true;

      // WebcamJS, indicamos la calidad
      setTimeout(() => {
        window.Webcam.set({
          image_format: 'jpeg',
          width: 320,
          height: 240,
          jpeg_quality: 90,
        });
        // Lo acoplamos en streamo
        window.Webcam.attach('#stream');
      }, 500);
    },
    // Toma la foto
    snapPhoto() {
      // Los datos vienen en ur base64
      window.Webcam.snap((data) => {
        this.uploadPhoto(data);
        this.cancelPhoto();
      });
    },
    // Cancela la foto
    cancelPhoto() {
      this.streaming = false;
      window.Webcam.reset();
    },
    // Abrir perfil
    openProfile() {
      this.$router.push({ name: 'perfil' });
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
  font-size: 40px;
}

#file {
  display: none;
}

#stream {
  margin: 0 auto;
}

.capture i {
  color: #3273dc;
  cursor: pointer;
  margin: 0 10px;
  &:last-of-type {
    font-size: 40px;
  }
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
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 40px;
    color: #999999;
  }
}
</style>
