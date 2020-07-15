/* eslint-disable max-len */
import Service from './Service';

// Operaciones
export default {
  // Crea uno nuevo
  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#web
  async post(data) {
    const res = await Service.entriesCollection.add(data);
    return res;
  },
  // Actualiza una entrada
  async put(id, data) {
    return Service.entriesCollection.doc(id).update(data);
  },
  // elimina una entrada
  async delete(id) {
    return Service.entriesCollection.doc(id).delete();
  },
  // Obtiene los recursos de un usuario
  async getByUser(uid) {
    return Service.entriesCollection.where('userId', '==', uid).get();
  },
};
