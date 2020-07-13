<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/global/AppHeader.vue';
import AppFooter from '@/components/global/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-width: 320px;
}
</style>
