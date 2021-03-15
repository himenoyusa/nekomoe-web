import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, Switch, Input } from 'antd';
import { debounce } from 'utils/toolFunction';
import useGlobal from '../../myHooks/useGlobal';
import logoWhite from '../../images/logo-white.png';
import logoDark from '../../images/logo-dark.png';
import titleDark from '../../images/title-dark.png';
import titleWhite from '../../images/title-white.png';
import './index.scss';

const Header = () => {
  const [{ lang, theme }, { changeLang, changeTheme }] = useGlobal();
  const [showNav, setShowNav] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('inherit');

  // 监听页面滚动，改变头部背景色（仅适用于桌面端）
  // TODO: 移动端改成页头自适应
  useEffect(() => {
    if (window.innerWidth > 768) {
      const func = debounce(() => {
        if (window.scrollY > 100) {
          setBackgroundColor(theme === 'white' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)');
        } else {
          setBackgroundColor('inherit');
        }
      }, 100);
      window.onscroll = func;
    }
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
  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
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
              style={{ width: 200, marginTop: 15, marginLeft: 10 }}
              placeholder={lang.searchPlaceholder}
            />
          </span>
          <div className="header-button-group header-screen">
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
                <css-icon class="icon-arrow-left" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`mobile-navbar${showNav ? ' mobile-navbar-show' : ''}`}>
        <div className="mobile-navbar-item" style={borderTop}>
          <div style={{ textAlign: 'right' }}>
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
              getPopupContainer={() => document.getElementsByClassName('header-body')[0]}
              onChange={(val) => changeLang(val)}
            >
              {langOption()}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
