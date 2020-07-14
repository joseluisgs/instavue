<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar captura</p>
      </header>
      <section class="modal-card-body">
        <!-- Imagen con filtro -->
        <div :class="selectedFilter">
          <img class="submittedImage" :src="photoSubmission" />
        </div>
        <!-- Caption -->
        <div class="field">
          <div class="control">
            <h4 class="subtitle">Título</h4>
            <input
              v-model.trim="caption"
              class="input"
              type="text"
              placeholder="Describe la foto que estas subiendo"
            />
          </div>
        </div>
         <!-- Filtro -->
        <h4 class="subtitle">Selecciona filtro</h4>
        <div class="select">
          <select v-model="selectedFilter">
            <option
              v-for="filter in filters"
              :value="filter.name"
              :key="filters.indexOf(filter)"
            >{{ filter.name }}</option>
          </select>
        </div>
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
  // al crearme
  created() {
    this.selectedFilter = this.filters[0].name;
  },
  data() {
    return {
      trabajando: false,
      downloadURL: '',
      caption: '',
      selectedFilter: '',
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
          caption: this.caption,
          filtro: this.selectedFilter,
          url: photoURL,
          likes: 0,
          userId: this.user.uid,
          username: `${this.userProfile.nombre} ${this.userProfile.apellidos}`,
        };
        // insertamos la entrada
        await EntradasService.post(nuevaEntrada);

        // Movemos el scroll arriba suvemente
        // Cuando todo esté recien pintado en el DOM
        this.$nextTick(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        });

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
  // Propiedades de Vuex
  computed: {
    ...mapState(['photoSubmission', 'user', 'userProfile', 'filters']),
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
.submittedImage {
  width: 100%;
  height: auto;
}
</style>
