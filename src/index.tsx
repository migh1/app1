import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import App from './App';
import reportWebVitals from './reportWebVitals';

const main = (state = {}, action: any) => {
  switch (action.type) {
    case 'CREATE_USER':
      return { ...state, user: { id: 1, ...action.payload } };
    case 'SAVE_USER':
      return { ...state, user: action.payload };
    default:
      return { ...state };
  }
};

const combinedReducers = combineReducers({
  main,
});

const store = createStore(combinedReducers);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
