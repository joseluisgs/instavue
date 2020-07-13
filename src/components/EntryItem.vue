<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <div class="card-content is-paddingless">
          <div class="imagen"></div>
          <div class="datos">
            <p class="username is-size-7">Por @joseluisgs hace 20 minutos</p>
            <p class="caption">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Possimus quisquam dignissimos ducimus libero,
              atque praesentium, itaque hic voluptatem, tempore soluta
              eum voluptas consectetur culpa debitis. Nostrum obcaecati in architecto non.
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <a class="votar" href="#">
              <i class="fas fa-heart"></i>
            </a>
            <span class="votos">0 votos</span>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EntryItem',
};
</script>

<style lang="scss" scoped>
.imagen {
  background-image: url("../assets/blackcat.jpg");
  background-size: cover;
  background-position: center;
  height: 45vmax;
  margin-bottom: 10px;
}

.datos {
  padding: 10px;

  .caption {
    font-style: italic;
  }
}

.card-footer {
  padding: 0;
  &-item {
    padding: 3px;
  }
}

.votar {
  font-size: 20px;
  color: red;
}

.votos {
  font-size: 10px;
  padding: 5px;
}
</style>
