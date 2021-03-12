import React from 'react';
import cupWhite from '../../images/cup-white.png';
import cupDark from '../../images/cup-dark.png';
import useGlobal from '../../myHooks/useGlobal';
import './index.scss';

const Footer = () => {
  const [{ theme, lang }] = useGlobal();

  const style = {
    color: theme === 'white' ? '#777' : '#aaa',
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };
  const logoStyle = {
    backgroundImage: `url(${theme === 'white' ? cupWhite : cupDark})`,
  };

  return (
    <footer style={style}>
      <div className="footer-note">
        <span className="float-left">{lang.copyright}</span>
        <span className="float-right">{lang.note}</span>
      </div>
      <div className="footer-logo" style={logoStyle} />
    </footer>
  );
};

export default Footer;