<template>
  <section class="section">
    <div class="container">
      <EntryItem v-for="entrada in EntradasService"
        :entry="entrada"
        :key="entrada.cuando" />
    </div>
  </section>
</template>

<script>
import EntryItem from '@/components/EntryItem.vue';
import EntradasService from '@/services/EntradasService';

export default {
  name: 'EntryList',
  components: {
    EntryItem,
  },
  // Modelo de datos
  data() {
    return {
      EntradasService,
    };
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
