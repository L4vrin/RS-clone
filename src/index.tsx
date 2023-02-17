import ReactDOM from 'react-dom/client';
import {ApiProvider} from '@reduxjs/toolkit/dist/query/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import './styles/index.scss';
import App from './App';
import { tasksApi } from './store/tasks/tasksApi';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApiProvider api={tasksApi}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApiProvider>
);
