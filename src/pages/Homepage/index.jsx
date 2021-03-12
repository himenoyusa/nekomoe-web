import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myAxios from 'utils/myAxios';
import useGlobal from '../../myHooks/useGlobal';

import Header from '../../components/Header';
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

  return (
    <div className={`${theme}-theme home-background`} style={backgroundStyle}>
      <Header />
      <div className="homepage">
        <div className="content">
          homepage
          <Link to="/admin">
            <button type="button">跳转</button>
          </Link>
          {list.map((item) => (
            <div key={item.scTitle}>
              <div>
                <img src={item.posterUrl} style={{ width: 200, height: 200 }} alt="" />
              </div>
              <div>{item.scTitle[0]}</div>
              <div>{item.jpTitle}</div>
              <div>
                {item.year}-{item.month}
              </div>
            </div>
          ))}
          <div>counter:{lang.title}</div>
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
