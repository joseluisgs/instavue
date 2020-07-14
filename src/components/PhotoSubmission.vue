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
      console.log('Guardando imagen...');
    },
    cancelUpload() {
      // Como lo ponemos el estado en false en Vuex
      // de submitting se cierra la ventana :)
      this.cancelSubmission();
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
