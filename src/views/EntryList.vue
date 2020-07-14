<template>
  <section class="section">
    <PhotoSubmission v-if="submitting" />
    <div class="container">
      <EntryItem v-for="entrada in entradas"
        :entry="entrada"
        :key="entrada.cuando" />
    </div>
  </section>
</template>

<script>
import EntryItem from '@/components/EntryItem.vue';
import EntradasService from '@/services/EntradasService';
import PhotoSubmission from '@/components/PhotoSubmission.vue';
import { mapState } from 'vuex';

export default {
  name: 'EntryList',
  components: {
    EntryItem,
    PhotoSubmission,
  },
  // Al crearme, consigo las entradas... por ahora...
  async created() {
    this.entradas = await EntradasService.getAll();
  },
  // Modelo de datos
  data() {
    return {
      entradas: [],
    };
  },
  computed: {
    // Campos de Vuex
    ...mapState(['submitting']),
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: lightgray;
  flex-grow: 1;
  padding: 1rem;
  padding-top: 50px;
  padding-bottom: 10px;
  &:last-of-type {
    padding-bottom: 100px;
  }
}
</style>
