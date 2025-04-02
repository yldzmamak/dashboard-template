import { useEffect, useState } from 'react';

import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Row, Space, Table } from 'antd';

import { browserHistory } from '@/components/History';
import { Typography } from '@/components/UI';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { userSelector } from '@/store/user/userSelectors';
import { UserActions } from '@/store/user/userSlices';

import { pathNames } from '@/types/constants';
import { IUserListDataState } from '@/types/interfaces/store/userState';
import { UserListPayload } from '@/types/user';

const UserList = () => {
  const { userList } = useAppSelector(userSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    firstName: null,
    lastName: null,
    isEnabled: true,
    pageNumber: 0,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50, 100]
  });
  const [searchFilters, setSearchFilters] = useState(filters);

  const dispatch = useAppDispatch();

  const fetchUsers = (page: number, filters: UserListPayload) => {
    if (!userList.loading && !userList.error) {
      dispatch(UserActions.getUserList({ ...filters, pageNumber: page - 1 }));
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchFilters);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value.trim() || null,
    }));
  };

  const handleSearch = () => {
    setSearchFilters(filters);
    setCurrentPage(1);
    fetchUsers(1, filters);
  };

  const handleEdit = (userId: string | number) => {
    browserHistory.push(`${pathNames.userPage}/${userId}`);
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text: string, record: IUserListDataState) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Typography.Title level={3}>Kullanıcılar</Typography.Title>
      <Divider />
      <Row justify="end" style={{ marginBottom: '20px' }}>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => browserHistory.push(pathNames.userPage)}
          >
            Kullanıcı Ekle
          </Button>
        </Col>
      </Row>

      <Card title="Kullanıcı Filtrele" style={{ marginBottom: '20px' }}>
        <Row gutter={8}>
          <Col span={12}>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px' }}>
              First Name
            </label>
            <Input
              id="firstName"
              value={filters.firstName || ''}
              onChange={(e) => handleFilterChange('firstName', e.target.value)}
            />
          </Col>
          <Col span={12}>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px' }}>
              Last Name
            </label>
            <Input
              id='lastName'
              value={filters.lastName || ''}
              onChange={(e) => handleFilterChange('lastName', e.target.value)}
            />
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: '20px' }}>
          <Col>
            <Button type="primary" onClick={handleSearch}>
              Listele
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={userList.data.resultData.content}
        pagination={{
          current: currentPage,
          total: userList.data.resultData.totalElements,
          pageSize: userList.data.resultData.pageSize,
          onChange: handlePageChange,
          showSizeChanger: true,
          pageSizeOptions: filters.pageSizeOptions
        }}
        rowKey="id"
        loading={userList.loading}
      />
    </>
  );
};

export default UserList;
