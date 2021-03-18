import React, { memo } from 'react';
import { Route } from 'react-router-dom';
import useGlobal from '../../myHooks/useGlobal';

import homepageRouter from './homepageRouter';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import backgroundWhite from '../../images/wp_white.webp';
import backgroundDark from '../../images/wp_dark.webp';
import './index.scss';

const Homepage = memo((props) => {
  const [{ lang, theme }] = useGlobal();

  const backgroundStyle = {
    backgroundImage: `url(${theme === 'white' ? backgroundWhite : backgroundDark})`,
  };

  return (
    <div className={`${theme}-theme`}>
      <div className="home-background" style={backgroundStyle} />
      <div className="home-gap" />
      <Header history={props.history} />
      <div className="homepage">
        {homepageRouter.map((each) => (
          <Route path={each.path} component={each.component} exact key={each.path} />
        ))}
        <Footer />
        <div style={{ display: 'none' }}>
          <img alt="背景图预加载" src={backgroundWhite} />
          <img alt="背景图预加载" src={backgroundDark} />
        </div>
      </div>
    </div>
  );
});

export default Homepage;
