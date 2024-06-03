import store from '../store';
import types from '../types';
const { dispatch } = store;

export const isFirstTime = (data) => {
    dispatch({
        type: types.IS_FIRST_TIME,
        payload: data,
    });
};

