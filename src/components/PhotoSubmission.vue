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
        <button @click="cancelUpload" class="button">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FilesService from '@/services/FilesService';

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
        const fileStorage = await FilesService.upload(this.photoSubmission);
        const photoURL = await FilesService.getURL(fileStorage.ref);
        this.trabajando = false;
        console.log(photoURL);
        this.alerta('Fichero subido', 'is-success');
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
    ...mapState(['photoSubmission']),
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
