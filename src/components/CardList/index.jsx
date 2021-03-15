import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Pagination } from 'antd';
import myAxios from 'utils/myAxios';
import useGlobal from '../../myHooks/useGlobal';

import './index.scss';

const CardList = () => {
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

  // 前端伪分页
  const tempList = list.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className="flex-box">
        {tempList.map((item) => (
          <div className="flex-item anime-card" key={item.jpTitle[0]}>
            {/* 跳转参数 state 暂未使用 */}
            <Link to={{ pathname: `/detail/${item.jpTitle[0]}`, state: item }}>
              <div className="anime-card-img">
                <div style={{ backgroundImage: `url(${item.posterUrl})` }} />
              </div>
            </Link>
            <Tooltip
              placement="topLeft"
              color={theme === 'white' ? '' : '#2db7f5'}
              title={item[`${lang.lang}Title`][0]}
            >
              <div className="anime-card-title">{item[`${lang.lang}Title`][0]}</div>
            </Tooltip>
            <div className="anime-card-note">
              <span>
                {item.year}-{item.month}
              </span>
              <div>
                {lang.status}: {lang[item.status]}
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
    </>
  );
};

export default CardList;
