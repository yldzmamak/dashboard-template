import { Button, Layout, Row, Space } from 'antd';

import { browserHistory } from '@/components/History';
import Text from '@/components/UI/General/Typography/Text';

import { useAppSelector } from '@/hooks';

import { AuthService } from '@/services/AuthService';

import { authSelector } from '@/store/auth/authSelectors';

import { pathNames } from '@/types/constants';

import './Header.scss';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { me } = useAppSelector(authSelector);

  const handleLogout = () => {
    AuthService.logoutAuth();
    browserHistory.push(pathNames.authentication.loginPage);
  };

  return (
    <AntHeader className="headerHolder">
      <Row justify="end" align="middle">
        <Space size="middle">
          <Text strong>{`${me.data.resultData.firstName} ${me.data.resultData.lastName}`}</Text>
          <Button type="primary" onClick={handleLogout}>Çıkış Yap</Button>
        </Space>
      </Row>
    </AntHeader>
  );
};

export default Header;
