import axios from 'axios';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://ayerwavesapi.azurewebsites.net/api/vendortype`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postRequest = (newVT) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://ayerwavesapi.azurewebsites.net/api/vendortype`, newVT)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const putRequest = (vtId, updatedvendortype) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`https://ayerwavesapi.azurewebsites.net/api/vendortype/updatevendortype/${vtId}`, updatedvendortype)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getRequest, postRequest, putRequest};
