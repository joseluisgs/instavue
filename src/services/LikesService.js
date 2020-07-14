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
  // elimina una entrada
  async deleteAll(imagenId) {
    // Buscamos todas las imagenes
    const lista = await Service.likesCollection.where('photoId', '==', imagenId);
    // Por cada una la borramos
    return lista.get().then((docs) => {
      docs.forEach((doc) => {
        doc.ref.delete();
      });
    });
  },
};
