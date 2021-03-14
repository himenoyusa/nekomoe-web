import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Pagination } from 'antd';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../myHooks/useGlobal';

import Carousel from './Carousel';

const Content = () => {
  const [{ lang, theme }] = useGlobal();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    myAxios('testData/list.json')
      .then((res) => {
        if (res.status === 200) {
          setList(res.data);
          setTotal(res.data.length);
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
  }, [page, pageSize]);

  const changePage = (current, size) => {
    setPage(current);
    setPageSize(size);
  };

  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };

  return (
    <>
      <div style={borderTop}>
        <Carousel />
      </div>
      <div className="content" style={borderTop}>
        <div className="flex-box">
          {list.map((item) => (
            <div className="flex-item anime-card" key={item.jpTitle}>
              <div className="anime-card-img" style={{ backgroundImage: `url(${item.posterUrl})` }}>
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
        <div className="mobile-invisible" style={{ textAlign: 'center', margin: '20px auto' }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            defaultPageSize={16}
            pageSizeOptions={[8, 16, 24, 30]}
            total={total}
            hideOnSinglePage
            showSizeChanger
            showTotal={() => `Total ${total}`}
            onChange={(current, size) => changePage(current, size)}
            onShowSizeChange={(current, size) => changePage(1, size)}
          />
        </div>
        <div className="screen-invisible" style={{ textAlign: 'center', margin: '10px auto' }}>
          <Pagination
            current={page}
            simple
            total={total}
            hideOnSinglePage
            showTotal={() => `Total ${total}`}
            onChange={(current, size) => changePage(current, size)}
          />
        </div>
      </div>
    </>
  );
};

export default Content;
