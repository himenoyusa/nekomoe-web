import React from 'react';
import useGlobal from '../../myHooks/useGlobal';

import Header from '../../components/Header';
import Content from './components/Content';
import Footer from '../../components/Footer';

import './index.scss';
import '../../theme.scss';

import backgroundWhite from '../../images/wp_white.webp';
import backgroundDark from '../../images/wp_dark.webp';

const Homepage = () => {
  const [{ lang, theme }] = useGlobal();

  const backgroundStyle = {
    backgroundImage: `url(${theme === 'white' ? backgroundWhite : backgroundDark})`,
  };

  return (
    <div className={`${theme}-theme home-background`} style={backgroundStyle}>
      <Header />
      <div className="homepage">
        <Content />
        <Footer />
        <div style={{ display: 'none' }}>
          <img alt="背景图预加载" src={backgroundWhite} />
          <img alt="背景图预加载" src={backgroundDark} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
