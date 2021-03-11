import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myAxios from 'utils/myAxios';
import useGlobal from '../../myHooks/useGlobal';
import './index.scss';

import Footer from '../../components/Footer';

const Homepage = () => {
  const [list, setList] = useState([]);
  const [{ lang }, { changeLang }] = useGlobal();

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

  return (
    <div className="homepage">
      homepage
      <Link to="/admin">
        <button type="button" onClick={() => changeLang('sc')}>
          跳转
        </button>
      </Link>
      {list.map((item) => (
        <>
          <div>{item.scTitle[0]}</div>
          <div>{item.jpTitle}</div>
          <div>
            {item.year}-{item.month}
          </div>
        </>
      ))}
      <div>counter:{lang.title}</div>
      <Footer />
    </div>
  );
};

export default Homepage;
