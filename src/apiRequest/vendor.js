import axios from 'axios';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://ayerwavesapi.azurewebsites.net/api/vendor`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://ayerwavesapi.azurewebsites.net/api/vendor/deleteVendor/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getRequest, deleteRequest};
