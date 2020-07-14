import Service from './Service';

// Operaciones
export default {
  // Devuelve por id
  async get(id) {
    const res = await Service.likesCollection.doc(id).get();
    return res;
  },
  // uno nuevo
  async post(id, data) {
    const res = await Service.likesCollection.doc(id).set(data);
    return res;
  },
};
