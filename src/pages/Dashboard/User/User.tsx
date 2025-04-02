import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button, Card, Col, Divider, Form, Input, Row, Select } from 'antd';

import Typography from '@/components/UI/General/Typography';

import { useAppSelector } from '@/hooks';

import { userSelector } from '@/store/user/userSelectors';
import { UserActions } from '@/store/user/userSlices';

import { CodeType } from '@/types/enums';
import { IUserListDataState } from '@/types/interfaces/store/userState';

import './User.scss';

const { Option } = Select;
const { TextArea } = Input;

const User = () => {
  const { userDetail } = useAppSelector(userSelector);

  const [form] = Form.useForm<IUserListDataState>();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(UserActions.getUserDetail({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!userDetail.loading && !userDetail.error && userDetail.data.resultInfo.code === CodeType.Success) {
      form.setFieldsValue(userDetail.data.resultData);
    }
  }, [userDetail]);

  const onFinish = (values: IUserListDataState) => {
    dispatch(UserActions.saveOrUpdateUser(values));
  };

  return (
    <>
      <Typography.Title level={3}>{id === undefined ? 'Kullanıcı Oluşturma' : 'Kullanıcı Düzenleme'}</Typography.Title>
      <Divider />
      <Card loading={userDetail.loading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            hidden={true}
            label="Id"
            name="id"
          >
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Ad"
                name="firstName"
                rules={[{ required: true, message: 'Zorunlu alan' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Soyad"
                name="lastName"
                rules={[{ required: true, message: 'Zorunlu alan' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Geçersiz email' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Telefon Numarası" name="phoneNumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item label="Adres" name="address">
                <TextArea placeholder="Adres" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Kullanıcı Türü"
                name="userType"
                rules={[{ required: true, message: 'Zorunlu alan' }]}
              >
                <Select>
                  <Option value="USER">Kullanıcı</Option>
                  <Option value="ADMIN">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Şifre"
                name="password"
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row justify='end'>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Kaydet
              </Button>
            </Form.Item>
          </Row>

        </Form>
      </Card>
    </>
  );
};

export default User;
