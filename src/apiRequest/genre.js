import axios from 'axios';

const getGenre = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://ayerwavesapi.azurewebsites.net/api/genre`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postGenre = (newGenre) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://ayerwavesapi.azurewebsites.net/api/genre`, newGenre)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://ayerwavesapi.azurewebsites.net/api/genre/deletegenre/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getGenre, postGenre, deleteRequest};
