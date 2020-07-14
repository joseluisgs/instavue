<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar captura</p>
      </header>
      <section class="modal-card-body">
        <img :src="photoSubmission" alt />
      </section>
      <footer class="modal-card-foot">
        <button
          @click="submitPhoto"
          class="button is-success"
          :class="{'is-loading': trabajando}"
        >Guardar</button>
       <button :disabled="trabajando" @click="cancelUpload" class="button">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FicherosService from '@/services/FicherosService';
import EntradasService from '@/services/EntradasService';

export default {
  name: 'PhotoSubmission',
  data() {
    return {
      trabajando: false,
      downloadURL: '',
    };
  },
  methods: {
    // Metodos de Vuex
    ...mapActions(['cancelSubmission']),
    async submitPhoto() {
      try {
        this.trabajando = true;
        // subimos la foto
        const fileStorage = await FicherosService.upload(this.photoSubmission);
        // obtenemos su url
        const photoURL = await FicherosService.getURL(fileStorage.ref);
        // creamos la entrada
        const nuevaEntrada = {
          cuando: new Date(),
          caption: '',
          filtro: '',
          url: photoURL,
          likes: 0,
          userId: this.user.uid,
          username: `${this.userProfile.nombre} ${this.userProfile.apellidos}`,
        };
        // insertamos la entrada
        await EntradasService.post(nuevaEntrada);
        this.trabajando = false;
        this.alerta('Entrada añadida', 'is-success');
        // Cerramos
        this.cancelSubmission();
      } catch (error) {
        this.alerta(error, 'is-danger');
      } finally {
        this.trabajando = false;
      }
    },
    cancelUpload() {
      // Como lo ponemos el estado en false en Vuex
      // de submitting se cierra la ventana :)
      this.cancelSubmission();
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
    ...mapState(['photoSubmission', 'user', 'userProfile']),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  align-content: center;
  display: block;
  padding-top: 100px;
  .modal-card {
    width: 90%;
    height: 90%;
  }
}
</style>
