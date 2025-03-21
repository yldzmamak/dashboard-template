import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';

import { history } from "@/components/History";
import HistoryRouter from '@/components/History/HistoryRouter';

import store from '@/store/ConfigStore';

import App from './App';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <HistoryRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </HistoryRouter>,
);
