import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Pagination } from 'antd';
import useGlobal from '../../myHooks/useGlobal';

import './index.scss';

/**
 * @class 作品列表展示容器
 * @param {number} page 当前页
 * @param {number} pageSize 分页大小
 * @param {number} total 总数
 * @param {array} data 数据数组
 */
const CardList = memo((props) => {
  const [{ lang, theme }] = useGlobal();

  return (
    <>
      <div className="flex-box">
        {props.data?.map((item) => (
          <div className="flex-item anime-card" key={item.jpTitle}>
            {/* 跳转参数 state 暂未使用 */}
            <Link to={{ pathname: `/detail/${item.jpTitle}`, state: item }}>
              <div className="anime-card-img">
                <div style={{ backgroundImage: `url(${item.thumbUrl || 'images/蓝色001.png'})` }} />
              </div>
            </Link>
            <Tooltip
              placement="topLeft"
              color={theme === 'white' ? '#1890ff' : ''}
              title={item[`${lang.lang}Title`]}
            >
              <div className="anime-card-title">
                {item.coSub ? `【${lang.co}】` : ''}
                {item[`${lang.lang}Title`]}
              </div>
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
          current={props.page || 1}
          pageSize={props.pageSize || 16}
          defaultPageSize={16}
          pageSizeOptions={[8, 16, 24, 30]}
          total={props.total || 0}
          showSizeChanger
          showTotal={() => `Total ${props.total}`}
          onChange={(current, size) => props.changePage(current, size)}
          onShowSizeChange={(current, size) => props.changePage(1, size)}
        />
      </div>
      <div className="screen-invisible" style={{ textAlign: 'center', margin: '10px auto' }}>
        <Pagination
          current={props.page}
          pageSize={props.pageSize}
          simple
          total={props.total}
          onChange={(current, size) => props.changePage(current, size)}
        />
      </div>
    </>
  );
});

export default CardList;
