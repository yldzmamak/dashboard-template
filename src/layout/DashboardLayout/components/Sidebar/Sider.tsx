import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';

import { pathNames } from '@/types/constants';

import './Sider.scss';

const { Sider: AntSider } = Layout;

const items: MenuProps['items'] = [
  { key: '/dashboard', icon: <HomeOutlined />, label: <Link to={pathNames.dashboardPage}>Dashboard</Link> },
  { key: '/profile', icon: <UserOutlined />, label: <Link to={pathNames.profilePage}>Profil</Link> },
  { key: '/users', icon: <TeamOutlined />, label: <Link to={pathNames.userListPage}>Kullanıcılar</Link> },
];

const Sider = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  return (
    <AntSider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="siderHolder">
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
      />
    </AntSider>
  );
};

export default Sider;
