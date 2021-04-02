import React, { memo, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../../myHooks/useGlobal';

import MenuList from '../../../../components/MenuList';
import CardList from '../../../../components/CardList';
import Carousel from '../Carousel';
import './index.scss';

const MainPage = memo((props) => {
  const [{ lang, theme, menuKey }] = useGlobal();
  // const history = useHistory();
  const [rawData, setRawData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [total, setTotal] = useState(0);

  const getDataList = () => {
    myAxios('testData/list.json')
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;
          setRawData(data);
          setTempData(data);
          setTotal(data.length);
        } else {
          setRawData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setRawData([]);
    };
  };

  /**
   * 列表的各项筛选操作
   */
  const filterData = () => {
    // 根据当前菜单选项进行筛选
    const { type = '', value = 'homepage' } = menuKey;
    let result = rawData;
    if (type === 'type') {
      result = rawData.filter((item) => item.type === value);
    } else if (type === 'time') {
      result = rawData.filter((item) => item.year === value);
      if (value === 'otherTime') {
        result = rawData.filter((item) => item.year < 2017);
      }
    }
    // 前端伪分页
    setTotal(result.length);
    const tempList = result.slice((page - 1) * pageSize, page * pageSize);
    setTempData(tempList);
  };

  const changePage = (current, size) => {
    setPage(current);
    setPageSize(size);
  };

  /**
   * 初始化时获取列表
   */
  useEffect(() => {
    getDataList();
  }, []);

  /**
   * 点击菜单选项时，筛选相应的列表内容
   */
  useEffect(() => {
    setPage(1);
    filterData();
  }, [menuKey, rawData]);

  useEffect(() => {
    filterData();
  }, [page, pageSize]);

  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
    display: props.match ? 'block' : 'none',
  };

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
          data={tempData}
          total={total}
          changePage={changePage}
        />
      </div>
    </>
  );
});

export default MainPage;
