<template>
  <section class="section">
    <div class="container has-text-centered">
      <a href="#">
        <i class="fas fa-camera"></i>
      </a>
    </div>
    <div class="content has-text-centered">
      <p>
        <strong>InstaVue</strong> by
        <a href="https://twitter.com/joseluisgonsan" target="_blank">José Luis González</a>. Disponible en
        <a href="https://github.com/joseluisgs/instavue" target="_blank">GitHub</a>. 2020.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppFooter',
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
  font-size: 50px;
}
</style>
