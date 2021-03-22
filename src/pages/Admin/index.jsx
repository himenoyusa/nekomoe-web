import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import useGlobal from '../../myHooks/useGlobal';

import ContentTable from './ContentTable';
import CoSub from './CoSub';

const Admin = () => {
  const [{ token }, { changeUser }] = useGlobal();
  const history = useHistory();
  const [menuKey, setMenuKey] = useState('list');

  if (!token) {
    changeUser('name: yusa');
    return '404';
  }

  const logout = () => {
    changeUser();
    history.push('/');
  };

  const menuList = [
    {
      key: 'list',
      name: '作品列表',
    },
    {
      key: 'coSub',
      name: '合作组列表',
    },
  ];

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Layout.Header style={{ borderBottom: '1px solid #ccc' }}>
        <Link to="/">
          <Button type="primary">返回首页</Button>
        </Link>
        <Button style={{ marginLeft: 10 }} type="primary" onClick={() => logout()}>
          注销
        </Button>
      </Layout.Header>
      <Layout>
        <Layout.Sider>
          <Menu
            onClick={(e) => setMenuKey(e.key)}
            selectedKeys={[menuKey]}
            mode="vertical"
            theme="dark"
          >
            {menuList.map((item) => (
              <Menu.Item key={item.key}>{item.name}</Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          {menuKey === 'list' && <ContentTable />}
          {menuKey === 'coSub' && <CoSub />}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
