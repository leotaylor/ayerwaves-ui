import axios from 'axios';

const getStage = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://ayerwavesapi.azurewebsites.net/api/stage`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getStage};
