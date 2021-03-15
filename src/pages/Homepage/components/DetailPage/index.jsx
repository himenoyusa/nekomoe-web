import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../../myHooks/useGlobal';

import Carousel from '../Carousel';
import './index.scss';

const DetailPage = () => {
  const [{ lang, theme }] = useGlobal();
  const { name } = useParams(); // 获取路由 params
  const [details, setDetails] = useState({});

  useEffect(() => {
    myAxios('testData/list.json').then((res) => {
      if (res.status === 200) {
        let detail = {};
        res.data.forEach((data) => {
          if (data.jpTitle[0] === name) {
            detail = data;
          }
        });
        setDetails(detail);
      } else {
        setDetails({});
      }
    });

    return () => {
      setDetails({});
    };
  }, [name]);

  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };

  return (
    <div className="detail-content" style={borderTop}>
      <div>{details.jpTitle}</div>
      <Carousel />
    </div>
  );
};

export default DetailPage;
