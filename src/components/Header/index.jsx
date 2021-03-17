import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, Switch, Input, Drawer } from 'antd';
import { debounce } from 'utils/toolFunction';
import useGlobal from '../../myHooks/useGlobal';

import MenuList from '../MenuList';
import logoWhite from '../../images/logo-white.png';
import logoDark from '../../images/logo-dark.png';
import titleDark from '../../images/title-dark.png';
import titleWhite from '../../images/title-white.png';
import './index.scss';

const Header = (props) => {
  const [{ lang, theme }, { changeLang, changeTheme }] = useGlobal();
  const [showNav, setShowNav] = useState(false);
  const [searchKey, setSearchKey] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('inherit');

  // 监听页面滚动，改变头部背景色
  useEffect(() => {
    const func = debounce(() => {
      if (window.scrollY > 100) {
        setBackgroundColor(theme === 'white' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)');
      } else {
        setBackgroundColor('inherit');
      }
    }, 100);
    window.onscroll = func;
    return () => {
      window.onscroll = null;
    };
  }, [theme]);

  const switchTheme = (checked) => {
    if (checked) {
      changeTheme('white');
    } else {
      changeTheme('dark');
    }
  };

  const switchNav = () => {
    setShowNav(!showNav);
  };

  const onSearch = (keyword) => {
    if (!keyword) {
      return;
    }
    props.history.push(`/search/${keyword}`);
    setSearchKey('');
  };

  const langOption = () => {
    return (
      <>
        <Select.Option key="sc" value="sc">
          简体
        </Select.Option>
        <Select.Option key="tc" value="tc">
          繁體
        </Select.Option>
        <Select.Option key="jp" value="jp">
          日本語
        </Select.Option>
      </>
    );
  };

  const logoStyle = {
    backgroundImage: `url(${theme === 'white' ? logoWhite : logoDark})`,
  };
  const titleStyle = {
    backgroundImage: `url(${theme === 'white' ? titleWhite : titleDark})`,
  };
  const borderLeft = {
    borderLeft: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };

  return (
    <>
      <header style={{ backgroundColor }}>
        <div className="header-body">
          <Link to="/">
            <div className="header-logo" style={logoStyle} />
            <div className="header-title" style={titleStyle} />
          </Link>
          <span className="mobile-invisible">
            <Input.Search
              value={searchKey}
              style={{ width: 200, marginTop: 15, marginLeft: 10 }}
              placeholder={lang.searchPlaceholder}
              onChange={(e) => setSearchKey(e.target.value)}
              onSearch={(val) => onSearch(val)}
            />
          </span>
          <div className="header-button-group mobile-invisible">
            <Switch
              style={{ marginRight: 10 }}
              checked={theme === 'white'}
              checkedChildren="☀"
              unCheckedChildren="🌙"
              onChange={(val) => switchTheme(val)}
            />
            <Select
              style={{ width: 85 }}
              value={lang.lang}
              getPopupContainer={(e) => e}
              onChange={(val) => changeLang(val)}
            >
              {langOption()}
            </Select>
          </div>
          <div className="header-button-group screen-invisible">
            <div className="header-button-switch" style={borderLeft} onClick={() => switchNav()}>
              <div className={showNav ? ' switch-on' : ''}>
                <css-icon class="icon-menu" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <Drawer
        title={lang.option}
        width="60vw"
        getContainer={false}
        placement="right"
        bodyStyle={{ padding: 5 }}
        drawerStyle={{ backgroundColor: 'aaa' }}
        closable
        onClose={() => setShowNav(false)}
        visible={showNav}
      >
        <div className="mobile-navbar-item">
          <Switch
            style={{ marginRight: 10 }}
            checked={theme === 'white'}
            checkedChildren="☀"
            unCheckedChildren="🌙"
            onChange={(val) => switchTheme(val)}
          />
          <Select
            style={{ width: 85, textAlign: 'left' }}
            value={lang.lang}
            getPopupContainer={(e) => e}
            onChange={(val) => changeLang(val)}
          >
            {langOption()}
          </Select>
          <Input.Search
            style={{ width: '80%', marginTop: 15, marginLeft: 10 }}
            placeholder={lang.searchPlaceholder}
            onSearch={(val) => onSearch(val)}
          />
          <MenuList mode="inline" />
        </div>
      </Drawer>
    </>
  );
};

export default Header;
