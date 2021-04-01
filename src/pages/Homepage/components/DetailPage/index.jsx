import React, { memo, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import myAxios from 'utils/myAxios';
import useGlobal from '../../../../myHooks/useGlobal';

import Carousel from '../Carousel';
import './index.scss';

const DetailPage = memo((props) => {
  const [{ lang, theme }] = useGlobal();
  const { name } = useParams(); // 获取路由 params
  const [details, setDetails] = useState({});
  const [coSubList, setCoSubList] = useState([]);
  const [imageList, setImageList] = useState([]);

  /**
   * @description 查询所有合作组信息
   */
  const getCoSub = () => {
    myAxios('testData/subList.json').then((res) => {
      if (res.status === 200) {
        setCoSubList(res.data);
      } else {
        setCoSubList([]);
      }
    });
  };

  useEffect(() => {
    getCoSub();
  }, []);

  useEffect(() => {
    myAxios('testData/list.json').then((res) => {
      if (res.status === 200) {
        let detail = {};
        const poster = [];
        const names = name.replace(/\\/g, '/');
        res.data.forEach((data) => {
          if (data.jpTitle === names) {
            detail = data;
            const url = detail.posterUrl?.split(',');
            url?.forEach((item) => {
              poster.push({
                description: names,
                original: item,
                originalAlt: names,
                originalTitle: names,
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

  const renderCoSub = () => {
    const subs = details.coSub?.split(',');
    const subInfo = coSubList.filter((item) => subs.includes(item.subName));
    return (
      <Descriptions.Item label={lang.coSub}>
        {subInfo.map((sub) => (
          <a href={sub.subUrl}>
            {details.coSub}
            {`【${lang[sub.subType]}】`}
          </a>
        ))}
      </Descriptions.Item>
    );
  };

  const borderRight = {
    borderRight: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };
  const borderTop = {
    borderTop: `1px solid ${theme === 'white' ? '#ddd' : '#444'}`,
  };

  return (
    <div className="detail-content" style={{ display: props.match ? 'block' : 'none' }}>
      <div className="left-carousel mobile-invisible" style={borderRight}>
        <Carousel imageList={imageList} />
      </div>
      <div className="left-carousel screen-invisible" style={borderTop}>
        <Carousel imageList={imageList} />
      </div>
      <div className="right-message-box">
        <div className="mobile-invisible" style={{ height: 60 }} />
        <Descriptions column={1} title={lang.info}>
          {details.jpTitle && (
            <Descriptions.Item label={lang.jpName}>{details.jpTitle}</Descriptions.Item>
          )}
          {details.scTitle && (
            <Descriptions.Item label={lang.scName}>{details.scTitle}</Descriptions.Item>
          )}
          {details.tcTitle && (
            <Descriptions.Item label={lang.tcName}>{details.tcTitle}</Descriptions.Item>
          )}
          {details.engTitle && (
            <Descriptions.Item label={lang.engName}>{details.engTitle}</Descriptions.Item>
          )}
          <Descriptions.Item label={lang.type}>{lang[details.type]}</Descriptions.Item>
          {details.officialSite && (
            <Descriptions.Item label={lang.officialSite}>
              <a href={details.officialSite}>{details.officialSite}</a>
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
      <div className="right-message-box">
        <Descriptions column={1} title={lang.subInfo}>
          {details.coSub && renderCoSub()}
          <Descriptions.Item label={lang.subType}>
            {details.subType
              ?.split(',')
              .map((item) => lang[item])
              .join('、')}
          </Descriptions.Item>
          <Descriptions.Item label={lang.time}>
            {details.year}-{details.month}
          </Descriptions.Item>
          <Descriptions.Item label={lang.status}>{lang[details.status]}</Descriptions.Item>
          <Descriptions.Item label={lang.videoType}>{details.videoType}</Descriptions.Item>
          {details.bgm && (
            <Descriptions.Item label={lang.bgm}>
              <a href={details.bgm}>{details.bgm}</a>
            </Descriptions.Item>
          )}
          {details.dmhy && (
            <Descriptions.Item label={lang.dmhy}>
              <a href={details.dmhy}>{details.dmhy}</a>
            </Descriptions.Item>
          )}
          {details.nyaa && (
            <Descriptions.Item label={lang.nyaa}>
              <a href={details.nyaa}>{details.nyaa}</a>
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
    </div>
  );
});

export default DetailPage;
