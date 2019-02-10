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

const postStage = (newStage) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://ayerwavesapi.azurewebsites.net/api/stage`, newStage)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const putStage = (stageId, updatedStage) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`https://ayerwavesapi.azurewebsites.net/api/stage/updateStage/${stageId}`, updatedStage)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteStage = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://ayerwavesapi.azurewebsites.net/api/stage/deletestage/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getStage, postStage, putStage, deleteStage};
