import {createStore, combineReducers} from 'redux';
import { boardReducer, filtersReducer } from '../reducers';

export default () => {
  const store = createStore(
      combineReducers({
        boards: boardReducer,
        filters: filtersReducer
      }),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};