<template>
  <section class="section">
    <PhotoSubmission v-if="submitting" />
    <div class="container">
      <EntryItem v-for="(entry, $index) in entries" :entry="entry" :key="$index" />
    </div>
  </section>
</template>

<script>
import EntryItem from '@/components/EntryItem.vue';
import PhotoSubmission from '@/components/PhotoSubmission.vue';
import { mapState } from 'vuex';

export default {
  name: 'EntryList',
  components: {
    EntryItem,
    PhotoSubmission,
  },
  computed: {
    // Campos de Vuex
    ...mapState(['submitting', 'entries']),
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: lightgray;
  flex-grow: 1;
  padding: 1rem;
  padding-top: 50px;
  padding-bottom: 5px;
  &:last-of-type {
    padding-bottom: 150px;
  }
}
</style>
