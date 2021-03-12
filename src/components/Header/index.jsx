import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, Switch } from 'antd';
import useGlobal from '../../myHooks/useGlobal';
import logoWhite from '../../images/logo-white.png';
import logoDark from '../../images/logo-dark.png';
import titleDark from '../../images/title-dark.png';
import titleWhite from '../../images/title-white.png';
import './index.scss';

const Header = () => {
  const [{ lang, theme }, { changeLang, changeTheme }] = useGlobal();
  const [showNav, setShowNav] = useState(false);

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

  return (
    <>
      <header>
        <div className="header-body">
          <Link to="/">
            <div className="header-logo" style={logoStyle} />
            <div className="header-title" style={titleStyle} />
          </Link>
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
          <div className="header-button-group header-mobile">
            <div className="header-button-switch" onClick={() => switchNav()}>
              <div className={showNav ? ' switch-on' : ''}>&lt;</div>
            </div>
          </div>
        </div>
      </header>
      <div className={`mobile-navbar${showNav ? ' mobile-navbar-show' : ''}`}>
        <div className="mobile-navbar-item">
          <Switch
            style={{ marginRight: 10 }}
            checked={theme === 'white'}
            checkedChildren="☀"
            unCheckedChildren="🌙"
            onChange={(val) => switchTheme(val)}
          />
        </div>
        <div className="mobile-navbar-item">
          <Select
            style={{ width: 85 }}
            value={lang.lang}
            getPopupContainer={() => document.getElementsByClassName('header-body')[0]}
            onChange={(val) => changeLang(val)}
          >
            {langOption()}
          </Select>
        </div>
      </div>
    </>
  );
};

export default Header;
