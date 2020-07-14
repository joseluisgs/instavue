/* eslint-disable max-len */
import Service from './Service';

// Operaciones
export default {
  // Devuelve por id
  async getAll() {
    return [
      {
        username: 'joseluisgs',
        imagen: 'http://placekitten.com/800/600',
        likes: '32',
        cuando: '1572521779',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus quisquam dignissimos ducimus libero, atque praesentium, itaque hic voluptatem, tempore soluta eum voluptas consectetur culpa debitis. Nostrum obcaecati in architecto non.',
        filtro: '',
      },
      {
        username: 'pablomarmol',
        imagen: 'http://placekitten.com/800/600',
        likes: '32',
        cuando: '1572521809',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus quisquam dignissimos ducimus libero, atque praesentium, itaque hic voluptatem, tempore soluta eum voluptas consectetur culpa debitis. Nostrum obcaecati in architecto non.',
        filtro: '',
      },
      {
        username: 'pedropicapiedra',
        imagen: 'http://placekitten.com/800/600',
        likes: '32',
        cuando: '1572521814',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus quisquam dignissimos ducimus libero, atque praesentium, itaque hic voluptatem, tempore soluta eum voluptas consectetur culpa debitis. Nostrum obcaecati in architecto non.',
        filtro: '',
      },
    ];
  },
  // Crea uno nuevo
  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#web
  async post(data) {
    const res = await Service.entriesCollection.add(data);
    return res;
  },
};
