import React, { memo, useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
import { Input } from 'antd';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../../myHooks/useGlobal';

import CardList from '../../../../components/CardList';
import logoWhite from '../../../../images/logo-white.webp';
import logoDark from '../../../../images/logo-dark.webp';
import './index.scss';

const SearchPage = memo((props) => {
  const [{ lang, theme, searchWord }, { changeSearchWord }] = useGlobal();
  // const { keyword } = useParams();
  // const history = useHistory();
  const [rawData, setRawData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [total, setTotal] = useState(0);

  const getSearchResult = () => {
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
   * 对全列表进行搜索
   */
  const filterSearchResult = () => {
    const filtered = rawData.filter((item) => {
      let flag = false;
      ['scTitle', 'tcTitle', 'jpTitle', 'engTitle'].forEach((key) => {
        if (item[key] && item[key].indexOf(searchWord) !== -1) {
          flag = true;
        }
      });
      return flag;
    });

    // 前端伪分页
    setTotal(filtered.length);
    const tempList = filtered.slice((page - 1) * pageSize, page * pageSize);
    setTempData(tempList);
  };

  const changePage = (current, size) => {
    setPage(current);
    setPageSize(size);
  };

  const onSearch = (key) => {
    changeSearchWord(key);
  };

  /**
   * 初始化时获取列表
   */
  useEffect(() => {
    getSearchResult();
  }, []);

  /**
   * 分页时筛选相应内容
   */
  useEffect(() => {
    filterSearchResult();
  }, [page, pageSize]);

  /**
   * 搜索时筛选相应内容
   */
  useEffect(() => {
    setPage(1);
    filterSearchResult();
  }, [searchWord]);

  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
    display: props.match ? 'block' : 'none',
  };

  const logoStyle = {
    backgroundImage: `url(${theme === 'white' ? logoWhite : logoDark})`,
  };

  return (
    <div className="search-content" style={borderTop}>
      <div className="search-column">
        <div className="search-logo" style={logoStyle} />
        <span className="search-input">
          <Input.Search
            size="large"
            defaultValue={searchWord}
            enterButton={lang.search}
            style={{ width: 400, maxWidth: '60vw', marginLeft: 10 }}
            placeholder={lang.searchPlaceholder}
            onSearch={(val) => onSearch(val)}
          />
        </span>
      </div>
      <CardList
        data={tempData}
        page={page}
        pageSize={pageSize}
        total={total}
        changePage={changePage}
      />
    </div>
  );
});

export default SearchPage;
