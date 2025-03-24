import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';

import { browserHistory } from '@/components/History';
import HistoryRouter from '@/components/History/HistoryRouter';

import store from '@/store/ConfigStore';

import App from './App';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <HistoryRouter history={browserHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </HistoryRouter>,
);
