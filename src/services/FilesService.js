import Service from './Service';

// Recurso
const Storage = Service.storage;
// Operaciones
export default {
  // Sube un fichero en base 64, data_url
  async upload(fileBase64) {
    const fileName = `photo_${Date.now()}.jpg`;
    return Storage
      .ref(fileName)
      .putString(fileBase64, 'data_url');
  },
  // devuelve el url del fichero
  async getURL(fileStorageRef) {
    return fileStorageRef.getDownloadURL();
  },
};
