import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const MenuList = memo((props) => {
  const [{ lang, theme }] = useGlobal();
  const [menuKey, setMenuKey] = useState(['homepage']);

  const changeMenu = (e) => {
    setMenuKey([e.key]);
  };

  const menuOption = () => {
    const typeList = [
      {
        key: 'anime',
        name: lang.anime,
      },
      {
        key: 'movie',
        name: lang.movie,
      },
      {
        key: 'ova',
        name: lang.ova,
      },
      {
        key: 'shortAnime',
        name: lang.shortAnime,
      },
      {
        key: 'other',
        name: lang.other,
      },
    ];
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
