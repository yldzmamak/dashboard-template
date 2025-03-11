
import { ConfigProvider } from 'antd'

import AppRoutes from './routes/routes'

import './App.scss'


function App() {
  return (
    <ConfigProvider>
      {/* <ApplicationLoader>
        <AuthGuard> */}
          <AppRoutes />
        {/* </AuthGuard>
      </ApplicationLoader> */}
    </ConfigProvider>
  )
}

export default App
