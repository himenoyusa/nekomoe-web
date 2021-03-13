import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import myAxios from 'utils/myAxios';
import useGlobal from '../../myHooks/useGlobal';

import Header from '../../components/Header';
import Carousel from './components/Carousel';
import Footer from '../../components/Footer';

import './index.scss';
import '../../theme.scss';

import backgroundWhite from '../../images/wp_white.webp';
import backgroundDark from '../../images/wp_dark.webp';

const Homepage = () => {
  const [list, setList] = useState([]);
  const [{ lang, theme }] = useGlobal();

  useEffect(() => {
    myAxios('testData/list.json')
      .then((res) => {
        if (res.status === 200) {
          setList(res.data);
        } else {
          setList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setList([]);
    };
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${theme === 'white' ? backgroundWhite : backgroundDark})`,
  };
  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };

  return (
    <div className={`${theme}-theme home-background`} style={backgroundStyle}>
      <Header />
      <div className="homepage">
        <div style={borderTop}>
          <Carousel />
        </div>
        <div className="content" style={borderTop}>
          <div className="flex-box">
            {list.map((item) => (
              <div className="flex-item anime-card" key={item.jpTitle}>
                <div
                  className="anime-card-img"
                  style={{ backgroundImage: `url(${item.posterUrl})` }}
                >
                  {/* <img src={item.posterUrl} style={{ width: 200, height: 200 }} alt="" /> */}
                </div>
                <Tooltip
                  placement="topLeft"
                  color={theme === 'white' ? '' : '#2db7f5'}
                  title={item.jpTitle[0]}
                >
                  <div className="anime-card-title">{item[`${lang.lang}Title`][0]}</div>
                </Tooltip>
                <div className="anime-card-note">
                  <span>
                    {item.year}-{item.month}
                  </span>
                  <div>
                    {lang.status}: {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
