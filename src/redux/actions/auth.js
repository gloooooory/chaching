import store from '../store';
import { setUserData, apiPost, clearUserData } from '../../utils/utils';
import types from '../types';
import { LOGIN_API, SIGNUP_API, SOCIAL_LOGIN, FORGOT_PASSWORD } from '../../config/urls';
const { dispatch } = store;

const saveUserData = (data) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export function signUp(data) {
  return apiPost(SIGNUP_API, data);
}


export const login = (data) => {
  console.log(data, 'the given data')
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data)
      .then((res) => {
        saveUserData(res.data);
        setUserData(res.data).then((suc) => {
          resolve(res);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export function socialLogin(data) {
  return new Promise((reslove, reject) => {
    apiPost(SOCIAL_LOGIN, data).then(res => {
      console.log("res from action", res)
      if (res) {
        console.log("yashu enter")
        saveUserData(res.user)
        setUserData(res.user).then(saved => {
          reslove(res);
        })
      }

      reslove(res)
    }).catch(error => {
      console.log("rejected ===>>>>>>>>#######")
      reject(error);

    })
  })
}

export function forgotPassword(data) {
  return apiPost(FORGOT_PASSWORD, data)
}

export function logout() {
  dispatch({ type: types.CLEAR_REDUX_STATE });
  clearUserData();
}

