import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../../myHooks/useGlobal';

import CardList from '../../../../components/CardList';
import logoWhite from '../../../../images/logo-white.webp';
import logoDark from '../../../../images/logo-dark.webp';
import './index.scss';

const SearchPage = memo((props) => {
  const [{ lang, theme }] = useGlobal();
  const { keyword } = useParams();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [total, setTotal] = useState(0);

  const getSearchResult = () => {
    myAxios('testData/list.json')
      .then((res) => {
        if (res.status === 200) {
          const filtered = res.data.filter((item) => {
            let flag = false;
            ['scTitle', 'tcTitle', 'jpTitle'].forEach((key) => {
              item[key].forEach((title) => {
                if (title.indexOf(keyword) !== -1) {
                  flag = true;
                }
              });
            });
            return flag;
          });
          setList(filtered);
          setTotal(filtered.length);
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
  };

  useEffect(() => {
    getSearchResult();
  }, [page, pageSize, keyword]);

  const changePage = (current, size) => {
    setPage(current);
    setPageSize(size);
  };

  const onSearch = (key) => {
    if (key !== '') {
      props.history.push(`/search/${key}`);
    }
  };

  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };

  const logoStyle = {
    backgroundImage: `url(${theme === 'white' ? logoWhite : logoDark})`,
  };

  // 前端伪分页
  const tempList = list.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="search-content" style={borderTop}>
      <div className="search-column">
        <div className="search-logo" style={logoStyle} />
        <span className="search-input">
          <Input.Search
            size="large"
            defaultValue={keyword}
            enterButton={lang.search}
            style={{ width: 400, maxWidth: '60vw', marginLeft: 10 }}
            placeholder={lang.searchPlaceholder}
            onSearch={(val) => onSearch(val)}
          />
        </span>
      </div>
      <CardList
        data={tempList}
        page={page}
        pageSize={pageSize}
        total={total}
        changePage={changePage}
      />
    </div>
  );
});

export default SearchPage;
