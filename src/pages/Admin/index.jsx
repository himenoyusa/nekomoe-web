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
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          height: '64px',
          lineHeight: '64px',
          paddingLeft: '24px',
          backgroundColor: '#001529',
          borderBottom: '1px solid #ccc',
        }}
      >
        <Link to="/">
          <Button type="primary">返回首页</Button>
        </Link>
        <Button style={{ marginLeft: 10 }} type="primary" onClick={() => logout()}>
          注销
        </Button>
      </div>
      <Layout style={{ height: window.innerHeight - 64 }}>
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
    </div>
  );
};

export default Admin;
