import React, { memo } from 'react';
import cupWhite from '../../images/cup-white.webp';
import cupDark from '../../images/cup-dark.webp';
import useGlobal from '../../myHooks/useGlobal';
import './index.scss';

const Footer = memo(() => {
  const [{ theme, lang }] = useGlobal();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <div className="footer-logo" style={logoStyle} onClick={() => scrollTop()} />
    </footer>
  );
});

export default Footer;
