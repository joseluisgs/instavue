<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <div class="card-content is-paddingless">
          <!-- Añadimos la imagen y su filtro -->
          <div class="imagen" :class="entry.filtro" :style="{backgroundImage: `url(${entry.url})`}"></div>
          <div class="datos">
            <p class="username is-size-7">Por {{ entry.username }} - {{ entry.cuando | timeAgo }}</p>
            <p class="caption">{{ entry.caption }}</p>
          </div>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <a class="votar" href="#">
              <i class="fas fa-heart"></i>
            </a>
            <span class="votos">{{ entry.likes }} votos</span>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';

export default {
  name: 'EntryItem',
  // Propiedades que nos llegan, objeto entrada y es requerido para renderizar
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  // filtros de datos
  filters: {
    timeAgo(timestamp) {
      return moment(timestamp.toDate()).fromNow();
    },
  },
};
</script>

<style lang="scss" scoped>
.imagen {
  // background-image: url("../assets/blackcat.jpg");
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
