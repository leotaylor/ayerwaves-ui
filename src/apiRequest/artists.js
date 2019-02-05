import axios from 'axios';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://ayerwavesapi.azurewebsites.net/api/artist/artists`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getSingleArtist = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://ayerwavesapi.azurewebsites.net/api/artist/${id}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postArtist = (newArtist) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://ayerwavesapi.azurewebsites.net/api/artist`, newArtist)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getRequest, getSingleArtist, postArtist};
