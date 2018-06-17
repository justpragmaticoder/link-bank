/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const client = axios.create({ // all axios can be used, shown in axios documentation
  baseURL: 'http://localhost:3001',
  responseType: 'json'
});
const axiosMiddlewareOptions = {
  interceptors: {
    request: [
      ({getState, dispatch, getSourceAction}, config) => {
       // let store = state.get('userId').toJS();
        if (localStorage.getItem('token')!==undefined) {
          config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        return config
      }
    ],
    /*response: [
      ({ getState, dispatch }, response) => {
      ...

        return response
      }
    ]*/
  }
}

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    axiosMiddleware(client, axiosMiddlewareOptions),
    sagaMiddleware,
    routerMiddleware(history),
  ];
	const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, createReducer)

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
	  //persistedReducer,
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );
  let persistor = persistStore(store);
  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return {store, persistor};
}
