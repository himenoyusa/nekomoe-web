import React, { useState, useEffect } from 'react';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../../myHooks/useGlobal';

import MenuList from '../../../../components/MenuList';
import CardList from '../../../../components/CardList';
import Carousel from '../Carousel';
import './index.scss';

const MainPage = () => {
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

  // 前端伪分页
  const tempList = list.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className="carousel-wrap" style={borderTop}>
        <Carousel />
      </div>
      <div className="content" style={borderTop}>
        <MenuList className="mobile-invisible" />
        <CardList data={tempList} total={total} changePage={changePage} />
      </div>
    </>
  );
};

export default MainPage;
