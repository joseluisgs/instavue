<template>
  <section class="section">
    <div class="container">
      <EntryItem />
    </div>
  </section>
</template>

<script>
import EntryItem from '@/components/EntryItem.vue';

export default {
  name: 'EntryList',
  components: {
    EntryItem,
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: lightgray;
  flex-grow: 1;
  padding: 1rem;
  padding-top: 50px;
  padding-bottom: 60px;
}
</style>
