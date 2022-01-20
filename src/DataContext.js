import React, { createContext, useReducer, useContext } from 'react';
import {
  createAsyncDispatcher,
  createAsyncHandler,
  initialAsyncState
} from './asyncActionUtils';
import * as api from './api';

const initialState = {
  data: initialAsyncState,
};

const dataHandler = createAsyncHandler('GET_DATA', 'data');

function dataReducer(state, action) {
  switch (action.type) {
    case 'GET_DATA':
    case 'GET_DATA_SUCCESS':
    case 'GET_DATA_ERROR':
      return dataHandler(state, action);
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

const DataStateContext = createContext(null);
const DataDispatchContext = createContext(null);

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  return (
      <DataStateContext.Provider value={state}>
        <DataDispatchContext.Provider value={dispatch}>
          {children}
        </DataDispatchContext.Provider>
      </DataStateContext.Provider>
  );
}

export function useDataState() {
  const state = useContext(DataStateContext);
  if (!state) {
    throw new Error('Cannot find DataProvider');
  }
  return state;
}

export function useDataDispatch() {
  const dispatch = useContext(DataDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find DataProvider');
  }
  return dispatch;
}

export const getData = createAsyncDispatcher('GET_DATA', api.getDataList);
