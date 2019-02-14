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

export default {getRequest};
