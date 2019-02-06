import firebase from 'firebase';
import axios from 'axios';

axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (err) {
  return Promise.reject(err);
});

// const loginUser = (user) => {
//   return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
// };

const loginUser = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
    cred.user.getIdToken()
      .then(token => sessionStorage.setItem('token',token));
  });
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default {loginUser, logoutUser, getUid};
