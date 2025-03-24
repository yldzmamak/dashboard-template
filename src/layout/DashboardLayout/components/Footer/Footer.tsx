import { Layout } from 'antd';

import './Footer.scss';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </AntFooter>);
};

export default Footer;
