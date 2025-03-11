import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { createRoot } from 'react-dom/client'

import store from "@/store/ConfigStore";

import App from './App'

import './index.scss'

createRoot(document.getElementById('root')!).render(
  <Router basename={`${process.env.VITE_BASE_PATH}`}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
)
