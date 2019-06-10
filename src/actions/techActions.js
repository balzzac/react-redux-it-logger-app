import {
  TECHS_ERROR,
  ADD_TECH,
  DELETE_TECH,
  GET_TECHS,
  SET_LOADING,
} from './types';

/**
 * Gets techs from server
 */
export const getTechs = () => {
  // because of import thunk from 'redux-thunk' in state it is possible to make async call to db and return function
  return async (dispatch) => {
    try {
      setLoading();
      const res = await fetch('/techs');
      const data = await res.json();
      // Changes state in techReducer.js
      dispatch({
        type: GET_TECHS,
        payload: data,
      });
    } catch (error) {
      // Changes state in techReducer.js in case of error
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.statusText,
      });
    }
  };
};

/**
 * Sets loading to true
 */
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

/**
 * Adds tech to db
 * @param {object} tech
 */
export const addTech = (tech) => {
  return async (dispatch) => {
    try {
      setLoading();
      const res = await fetch('/techs', {
        method: 'POST',
        body: JSON.stringify(tech),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      dispatch({
        type: ADD_TECH,
        payload: data,
      });
    } catch (error) {
      // Changes state in techReducer.js in case of error
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.statusText,
      });
    }
  };
};

/**
 * Deletes tech from db
 * @param {number} id
 */
export const deleteTech = (id) => {
  return async (dispatch) => {
    try {
      setLoading();
      await fetch(`/techs/${id}`, {
        method: 'DELETE',
      });

      dispatch({
        type: DELETE_TECH,
        payload: id,
      });
    } catch (error) {
      // Changes state in techReducer.js in case of error
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.statusText,
      });
    }
  };
};
