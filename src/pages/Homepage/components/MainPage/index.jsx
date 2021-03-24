import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../../myHooks/useGlobal';

import MenuList from '../../../../components/MenuList';
import CardList from '../../../../components/CardList';
import Carousel from '../Carousel';
import './index.scss';

const MainPage = memo((props) => {
  const [{ lang, theme }] = useGlobal();
  const history = useHistory();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (history.location.state?.isMenu) {
      // 点击菜单选项时，筛选相应的列表内容
      setCategory(history.location.state);
    }
  }, [history.location.state]);

  useEffect(() => {
    const { type = '', value = '' } = category;
    myAxios('testData/list.json', { params: { type, value } })
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;
          let result = data;
          // 根据当前菜单选项进行筛选
          if (type === 'type') {
            result = data.filter((item) => item.type === value);
          } else if (type === 'time') {
            result = data.filter((item) => item.year === value);
            if (value === 'otherTime') {
              result = data.filter((item) => item.year < 2017);
            }
          }
          setList(result);
          setTotal(result.length);
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
  }, [page, pageSize, category]);

  const changePage = (current, size) => {
    setPage(current);
    setPageSize(size);
  };

  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
    display: props.match ? 'block' : 'none',
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
        <CardList
          page={page}
          pageSize={pageSize}
          data={tempList}
          total={total}
          changePage={changePage}
        />
      </div>
    </>
  );
});

export default MainPage;
