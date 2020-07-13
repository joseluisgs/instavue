import Service from './Service';

// Operaciones
export default {
  // Devuelve por id
  async getById(uid) {
    const res = await Service.usersCollection.doc(uid).get();
    return res.data();
  },
  // Crea uno nuevo
  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#web
  async post(uid, data) {
    const res = await Service.usersCollection.doc(uid).set(data);
    return res;
  },
  // Actualiza un usuario
  async put(uid, data) {
    return Service.usersCollection.doc(uid).update(data);
  },
  // Actualiza el email
  async updateEmail(email) {
    return Service.auth.currentUser.updateEmail(email);
  },
  // Actualiza el password
  async updatePassword(password) {
    return Service.auth.currentUser.updatePassword(password);
  },
};
