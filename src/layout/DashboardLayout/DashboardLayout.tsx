import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { authSelector } from '@/store/auth/authSelectors';
import { AuthActions } from '@/store/auth/authSlices';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Sider from './components/Sidebar/Sider';

import './DashboardLayout.scss';

const { Content } = Layout;

const DashboardLayout: React.FC = () => {
  const { me } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!me.loading && !me.error && me.data.resultData.firstName === '') {
      dispatch(AuthActions.auth());
    }
  }, [])

  return (
    <Layout hasSider className='dashboardLayoutHolder'>
      <Sider />
      <Layout className='insideLayoutHolder'>
        <Header />
        <Content className='contentHolder'>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;