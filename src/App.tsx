import { ConfigProvider } from 'antd';

import AppRoutes from './routes/routes';

import './App.scss';

function App() {
  return (
    <ConfigProvider>
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
