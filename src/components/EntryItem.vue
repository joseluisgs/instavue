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
            <a @click="likePhoto" class="votar" href="#">
              <i class="fas fa-heart"></i>
            </a>
            <span class="votos">{{ entry.likes }} votos</span>
          </div>
          <!-- Borrar foto -->
          <div v-if="photoOwned" class="card-footer-item">
            <a @click.prevent="deletePhoto" href="#">Eliminar</a>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import LikesService from '@/services/LikesService';
import EntradasService from '@/services/EntradasService';
import FicherosService from '@/services/FicherosService';
import { mapState } from 'vuex';

export default {
  name: 'EntryItem',
  // Al crearme
  async created() {
    // Si estoy identificado
    if (this.user) {
      // De esta manera creo la relación entre usurio y entrada
      this.likeId = `${this.user.uid}_${this.entry.id}`;
      try {
        const doc = await LikesService.get(this.likeId);
        // Si ya le hemos dado me gusta pasamos de ella
        this.liked = !!doc.exists;
      } catch (error) {
        console.error(error.message);
        this.alerta(error, 'is-danger');
      }
    }
  },
  // Modelo de datos
  data() {
    return {
      liked: true,
      likeId: '',
    };
  },
  // Propiedades que nos llegan, objeto entrada y es requerido para renderizar
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async likePhoto() {
      // Siempre que no la hayamos pulsado antes
      if (this.liked) return;
      // Salvamos la foto
      const nuevoLike = {
        photoId: this.entry.id,
        userId: this.user.uid,
      };
      // No es necesario poner el wait en cada una, lo harems con la promesa final
      const saveLike = LikesService.post(this.likeId, nuevoLike);
      // Ajustamos el conteo de like en la entrada
      const sumLike = {
        likes: this.entry.likes + 1,
      };
      const addLike = EntradasService.put(this.entry.id, sumLike);
      // Si todo va bien, esperamos a toodas
      await Promise.all([saveLike, addLike]);
      this.liked = true;
      this.alerta('Like contabilizado', 'is-success');
    },
    // Eliminamos la foto
    // no está completo, se debería borrar los likes y el fichero ;)
    async deletePhoto() {
      try {
        // Borramos la entrada...
        const delEntry = EntradasService.delete(this.entry.id);
        // borramos los likes, todos los likes de esta imagen
        const delLike = LikesService.deleteAll(this.entry.id);
        // Borramos la imagen
        const delPhoto = FicherosService.delete(this.entry.photoName);
        // Si todo va bien, esperamos a toodas
        await Promise.all([delEntry, delLike, delPhoto]);
        this.alerta('Entrada eliminada', 'is-success');
      } catch (error) {
        this.alerta(error, 'is-danger');
      }
    },
    // alerta
    alerta(mensaje, tipo) {
      this.$buefy.notification.open({
        message: `${mensaje}`,
        type: `${tipo}`,
      });
    },
  },
  // filtros de datos
  filters: {
    timeAgo(timestamp) {
      return moment(timestamp.toDate()).fromNow();
    },
  },
  computed: {
    // Propiedades de Vuex
    ...mapState(['user']),
    // Mis métodos computados
    // Si la foto es mía
    photoOwned() {
      if (!this.user) return false;
      return this.user.uid === this.entry.userId;
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
