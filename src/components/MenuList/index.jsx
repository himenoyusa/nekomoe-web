import React, { memo, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Badge } from 'antd';
import useGlobal from '../../myHooks/useGlobal';
import './index.scss';

const colorList = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const category = ['anime', 'movie', 'ova', 'shortAnime', 'other'];

const MenuList = memo((props) => {
  const [{ lang, theme }] = useGlobal();
  const history = useHistory();
  const [menuKey, setMenuKey] = useState(['homepage']);

  /**
   * @description 点击菜单，跳转到首页，带上菜单参数对首页列表进行筛选
   * @param {Object} e 点击事件
   */
  const changeMenu = (e) => {
    setMenuKey([e.key]);
    if (e.key === 'homepage') {
      history.push('/');
    } else if (category.includes(e.key)) {
      history.push({
        pathname: `/category/${e.key}`,
        state: { isMenu: true, type: 'type', value: e.key },
      });
    } else {
      history.push({
        pathname: `/category/${e.key}`,
        state: { isMenu: true, type: 'time', value: e.key },
      });
    }
  };

  const menuOption = () => {
    const typeList = category.map((item) => ({ key: item, name: lang[item] }));
    return (
      <>
        <Menu.Item key="homepage">
          <css-icon class="icon-bookmark" />
          {lang.homepage}
        </Menu.Item>
        <Menu.SubMenu
          title={
            <span>
              {lang.type}
              <css-icon class="icon-caret" />
            </span>
          }
        >
          {typeList.map((item, index) => (
            <Menu.Item key={item.key}>
              <Badge color={colorList[index]} />
              {item.name}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu
          title={
            <span>
              {lang.time}
              <css-icon class="icon-caret" />
            </span>
          }
        >
          <Menu.Item key="2021">
            <Badge status="processing" />
            2021
          </Menu.Item>
          <Menu.Item key="2020">
            <Badge status="processing" />
            2020
          </Menu.Item>
          <Menu.Item key="2019">
            <Badge status="processing" />
            2019
          </Menu.Item>
          <Menu.Item key="2018">
            <Badge status="processing" />
            2018
          </Menu.Item>
          <Menu.Item key="2017">
            <Badge status="processing" />
            2017
          </Menu.Item>
          <Menu.Item key="otherTime">
            <Badge status="processing" />
            {lang.otherTime}
          </Menu.Item>
        </Menu.SubMenu>
      </>
    );
  };

  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };

  return (
    <>
      <div className={`main-menu-screen ${props.className || ''}`}>
        <Menu
          mode={props.mode || 'horizontal'}
          triggerSubMenuAction="click"
          getPopupContainer={(e) => e}
          onClick={(val) => changeMenu(val)}
          selectedKeys={menuKey}
          style={{ background: 'transparent' }}
        >
          {menuOption()}
        </Menu>
      </div>
    </>
  );
});

export default MenuList;
