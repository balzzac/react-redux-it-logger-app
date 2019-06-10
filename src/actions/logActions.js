import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from './types';

/**
 * Gets logs from server
 */
export const getLogs = () => {
  // because of import thunk from 'redux-thunk' in state it is possible to make async call to db and return function
  return async (dispatch) => {
    try {
      setLoading();
      const res = await fetch('/logs');
      const data = await res.json();
      // Changes state in logReducer.js
      dispatch({
        type: GET_LOGS,
        payload: data,
      });
    } catch (error) {
      // Changes state in logReducer.js in case of error
      dispatch({
        type: LOGS_ERROR,
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
 * Adds log to db
 * @param {object} log
 */
export const addLog = (log) => {
  return async (dispatch) => {
    try {
      setLoading();
      const res = await fetch('/logs', {
        method: 'POST',
        body: JSON.stringify(log),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      dispatch({
        type: ADD_LOG,
        payload: data,
      });
    } catch (error) {
      // Changes state in logReducer.js in case of error
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };
};

/**
 * Deletes log from db
 * @param {number} id
 */
export const deleteLog = (id) => {
  return async (dispatch) => {
    try {
      setLoading();
      await fetch(`/logs/${id}`, {
        method: 'DELETE',
      });

      dispatch({
        type: DELETE_LOG,
        payload: id,
      });
    } catch (error) {
      // Changes state in logReducer.js in case of error
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };
};

/**
 * Sets current log
 * @param {object} log
 */
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

/**
 * Clears current log
 */
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

/**
 * Updates log in db
 * @param {number} id
 */
export const updateLog = (log) => {
  return async (dispatch) => {
    try {
      setLoading();
      const res = await fetch(`/logs/${log.id}`, {
        method: 'PUT',
        body: JSON.stringify(log),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      dispatch({
        type: UPDATE_LOG,
        payload: data,
      });
    } catch (error) {
      // Changes state in logReducer.js in case of error
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };
};

/**
 * Searches logs from server
 * @param {string} searchText
 */
export const searchLogs = (searchText) => {
  // because of import thunk from 'redux-thunk' in state it is possible to make async call to db and return function
  return async (dispatch) => {
    try {
      setLoading();
      const res = await fetch(`/logs?q=${searchText}`);
      const data = await res.json();
      // Changes state in logReducer.js
      dispatch({
        type: SEARCH_LOGS,
        payload: data,
      });
    } catch (error) {
      // Changes state in logReducer.js in case of error
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };
};
