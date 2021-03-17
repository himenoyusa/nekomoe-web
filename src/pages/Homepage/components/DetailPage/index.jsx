import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../../myHooks/useGlobal';

import Carousel from '../Carousel';
import './index.scss';

const DetailPage = () => {
  const [{ lang, theme }] = useGlobal();
  const { name } = useParams(); // 获取路由 params
  const [details, setDetails] = useState({});
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    myAxios('testData/list.json').then((res) => {
      if (res.status === 200) {
        let detail = {};
        const poster = [];
        res.data.forEach((data) => {
          if (data.jpTitle[0] === name) {
            detail = data;
            detail.posterUrl.forEach((item) => {
              poster.push({
                description: name,
                original: item,
                originalAlt: name,
                originalTitle: name,
              });
            });
          }
        });
        setImageList(poster);
        setDetails(detail);
      } else {
        setImageList([]);
        setDetails({});
      }
    });

    return () => {
      setDetails({});
    };
  }, [name]);

  const renderStaff = () => {
    if (details && details.staff) {
      const staffObject = [];
      const keyList = Object.keys(details.staff);
      keyList.forEach((key) => {
        if (details.staff[key].length) {
          staffObject.push(
            <Descriptions.Item label={lang[key]} key={lang[key]}>
              {details.staff[key].join('、')}
            </Descriptions.Item>
          );
        }
      });
      return staffObject;
    }
    return null;
  };

  const borderRight = {
    borderRight: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };
  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };

  return (
    <div className="detail-content">
      <div className="left-carousel mobile-invisible" style={borderRight}>
        <Carousel imageList={imageList} />
      </div>
      <div className="left-carousel screen-invisible" style={borderTop}>
        <Carousel imageList={imageList} />
      </div>
      <div className="right-message-box">
        <div className="mobile-invisible" style={{ height: 60 }} />
        <Descriptions column={1} title={lang.info}>
          {Array.isArray(details.jpTitle) && details.jpTitle.length && (
            <Descriptions.Item label={lang.jpName}>
              {details.jpTitle.join('　|　')}
            </Descriptions.Item>
          )}
          {Array.isArray(details.scTitle) && details.scTitle.length && (
            <Descriptions.Item label={lang.scName}>
              {details.scTitle.join('　|　')}
            </Descriptions.Item>
          )}
          {Array.isArray(details.tcTitle) && details.tcTitle.length && (
            <Descriptions.Item label={lang.tcName}>
              {details.tcTitle.join('　|　')}
            </Descriptions.Item>
          )}
          <Descriptions.Item label={lang.type}>{lang[details.type]}</Descriptions.Item>
          <Descriptions.Item label={lang.officialSite}>
            <a href={details.officialSite}>{details.officialSite}</a>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="right-message-box">
        <Descriptions column={1} title={lang.subInfo}>
          <Descriptions.Item label={lang.subType}>
            {Array.isArray(details.subType) && details.subType.map((item) => lang[item]).join('、')}
          </Descriptions.Item>
          <Descriptions.Item label={lang.time}>
            {details.year}-{details.month}
          </Descriptions.Item>
          <Descriptions.Item label={lang.status}>{lang[details.status]}</Descriptions.Item>
          <Descriptions.Item label={lang.bgm}>
            <a href={details.bgm}>{details.bgm}</a>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="right-message-box">
        <Descriptions column={1} title={lang.staff}>
          {renderStaff()}
        </Descriptions>
      </div>
    </div>
  );
};

export default DetailPage;
