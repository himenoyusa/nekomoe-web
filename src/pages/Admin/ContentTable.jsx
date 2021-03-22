import React, { useEffect, useState } from 'react';
import { Form, Table, Select, Input, Button, Divider, Popconfirm } from 'antd';
import axios from 'axios';

import useGlobal from '../../myHooks/useGlobal';

const data = {
  scTitle: '熊熊勇闯异世界',
  tcTitle: '',
  jpTitle: 'くまクマ熊ベアー',
  officialSite: 'https://kumakumakumabear.com/',
  year: '2020',
  month: '10',
  posterUrl: ['images/2020-10/熊四poster.jpg'],
  thumbUrl: 'images/2020-10/thumb_熊四poster.webp',
  status: 'finished',
  type: 'anime',
  subType: ['tc', 'sc'],
  videoType: 'WEB',
  key: Date.now(),
};
const sub = {
  subName: '千夏',
  subNameEng: 'Airota',
  subType: 'sub',
  subUrl: '',
};

const ContentTable = () => {
  const [{ token }] = useGlobal();
  const [subData, setSubData] = useState([sub]);
  const [dataSources, setDataSources] = useState([data]);
  // 新增时默认会添加的参数
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [autoSaveTime, setAutoSaveTime] = useState('');

  // useEffect(() => {
  //   // axios('URL_getSubData').then((res) => {});
  //   setSubData([sub]);
  // });

  /**
   * @description 查询列表
   * @param {boolean} search 是否筛选
   */
  const getData = (search) => {
    let params = null;
    if (search) {
      params = { type, year, month };
    }
    axios('', { params });
  };

  const add = () => {
    const newItem = {
      key: Date.now(),
      type,
      year,
      month,
      subType: ['sc', 'tc'],
      posterUrl: [],
    };
    dataSources.unshift(newItem);
    setDataSources([...dataSources]);
  };

  const save = () => {
    setLoading(true);
    console.log(dataSources);
    setLoading(false);
  };

  const deleteOne = (index) => {
    dataSources.splice(index, 1);
    setDataSources([...dataSources]);
    save();
    setPage(1);
  };

  // useEffect(() => {});

  // 年份选择列
  const yearSelector = () => {
    const now = new Date();
    const yearNow = now.getFullYear();
    const yearList = [];
    for (let i = yearNow; i >= 1970; i -= 1) {
      yearList.push(
        <Select.Option value={i} key={i}>
          {i}
        </Select.Option>
      );
    }
    return yearList;
  };

  // 月份选择列
  const monthSelector = () => {
    const monthList = [];
    for (let i = 1; i <= 12; i += 1) {
      let mon = i.toString();
      if (i < 10) {
        mon = `0${i}`;
      }
      monthList.push(<Select.Option key={mon}>{mon}</Select.Option>);
    }
    return monthList;
  };

  const columns = [
    {
      title: '日文标题',
      align: 'center',
      dataIndex: 'jpTitle',
      width: 150,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].jpTitle = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: '简体标题',
      align: 'center',
      dataIndex: 'scTitle',
      width: 150,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].scTitle = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: '繁体标题',
      align: 'center',
      dataIndex: 'tcTitle',
      width: 120,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].tcTitle = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: '英文/罗马音标题',
      align: 'center',
      dataIndex: 'engTitle',
      width: 130,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].engTitle = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: 'HP',
      align: 'center',
      dataIndex: 'officialSite',
      width: 120,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].officialSite = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: '年份',
      align: 'center',
      dataIndex: 'year',
      width: 90,
      render: (v, r, i) => {
        return (
          <Select
            defaultValue={v}
            style={{ width: 75 }}
            onChange={(val) => {
              dataSources[i].year = val;
              setDataSources(dataSources);
            }}
          >
            {yearSelector()}
          </Select>
        );
      },
    },
    {
      title: '月份',
      align: 'center',
      dataIndex: 'month',
      width: 80,
      render: (v, r, i) => {
        return (
          <Select
            defaultValue={v}
            style={{ width: 60 }}
            onChange={(val) => {
              dataSources[i].month = val;
              setDataSources(dataSources);
            }}
          >
            {monthSelector()}
          </Select>
        );
      },
    },
    {
      title: '海报URL',
      align: 'center',
      dataIndex: 'posterUrl',
      width: 120,
      render: (v, r, i) => {
        const urlList = v.toString();
        return (
          <Input
            placeholder="多张海报用英文逗号分隔"
            defaultValue={urlList}
            title={urlList || '多张海报用英文逗号分隔'}
            onChange={(e) => {
              const list = e.target.value.split(',');
              dataSources[i].posterUrl = list;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: '海报缩略图URL',
      align: 'center',
      dataIndex: 'thumbUrl',
      width: 120,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].thumbUrl = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      width: 120,
      render: (v, r, i) => {
        return (
          <Select
            defaultValue={v}
            style={{ width: 100 }}
            onChange={(val) => {
              dataSources[i].status = val;
              setDataSources(dataSources);
            }}
          >
            <Select.Option key="">无</Select.Option>
            <Select.Option key="finished">完结</Select.Option>
            <Select.Option key="update">更新中</Select.Option>
          </Select>
        );
      },
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'type',
      width: 120,
      render: (v, r, i) => {
        return (
          <Select
            defaultValue={v}
            style={{ width: 100 }}
            onChange={(val) => {
              dataSources[i].type = val;
              setDataSources(dataSources);
            }}
          >
            <Select.Option key="">无</Select.Option>
            <Select.Option key="anime">季番</Select.Option>
            <Select.Option key="shortAnime">泡面</Select.Option>
            <Select.Option key="ova">OVA</Select.Option>
            <Select.Option key="movie">剧场版</Select.Option>
            <Select.Option key="other">其他</Select.Option>
          </Select>
        );
      },
    },
    {
      title: '字幕类型',
      align: 'center',
      dataIndex: 'subType',
      width: 220,
      render: (v, r, i) => {
        return (
          <Select
            maxTagCount={2}
            mode="multiple"
            defaultValue={v}
            style={{ width: 200 }}
            onChange={(val) => {
              dataSources[i].subType = val;
              setDataSources(dataSources);
            }}
          >
            <Select.Option key="jp">日文</Select.Option>
            <Select.Option key="sc">简中</Select.Option>
            <Select.Option key="tc">繁中</Select.Option>
            <Select.Option key="sc-jp">简日</Select.Option>
            <Select.Option key="tc-jp">繁日</Select.Option>
          </Select>
        );
      },
    },
    {
      title: '压制类型',
      align: 'center',
      dataIndex: 'videoType',
      width: 120,
      render: (v, r, i) => {
        return (
          <Select
            defaultValue={v}
            style={{ width: 100 }}
            onChange={(val) => {
              dataSources[i].videoType = val;
              setDataSources(dataSources);
            }}
          >
            <Select.Option key="">无</Select.Option>
            <Select.Option key="TVRip">TVRip</Select.Option>
            <Select.Option key="WebRip">WebRip</Select.Option>
            <Select.Option key="BDRip">BDRip</Select.Option>
          </Select>
        );
      },
    },
    {
      title: '合作字幕组',
      align: 'center',
      dataIndex: 'coSub',
      width: 120,
      render: (v, r, i) => {
        return (
          <Select
            maxTagCount={2}
            mode="multiple"
            defaultValue={v}
            style={{ width: 100 }}
            onChange={(val) => {
              dataSources[i].coSub = val;
              setDataSources(dataSources);
            }}
          >
            {subData.map((item) => (
              <Select.Option key={item.subName}>{item.subName}</Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '萌番组外链',
      align: 'center',
      dataIndex: 'bgm',
      width: 120,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].bgm = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: '动漫花园外链',
      align: 'center',
      dataIndex: 'dmhy',
      width: 120,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].dmhy = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: 'nyaa外链',
      align: 'center',
      dataIndex: 'nyaa',
      width: 120,
      render: (v, r, i) => {
        return (
          <Input
            defaultValue={v}
            title={v}
            onChange={(e) => {
              dataSources[i].nyaa = e.target.value;
              setDataSources(dataSources);
            }}
          />
        );
      },
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 100,
      dataIndex: 'cz',
      render: (v, r, i) => {
        return (
          <span>
            <Popconfirm title="确认删除？" onConfirm={() => deleteOne(i)}>
              <Button danger type="primary">
                删除
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  let tableWidth = 0;
  columns.forEach((column) => {
    if (column.width) {
      tableWidth += column.width;
    }
  });

  return (
    <div style={{ border: '1px solid #ccc', padding: 5 }}>
      <Form layout="inline">
        <Form.Item label="选择类型">
          <Select value={type} style={{ width: 100 }} onChange={(val) => setType(val)}>
            <Select.Option key="">全部</Select.Option>
            <Select.Option key="anime">季番</Select.Option>
            <Select.Option key="shortAnime">泡面</Select.Option>
            <Select.Option key="ova">OVA</Select.Option>
            <Select.Option key="movie">剧场版</Select.Option>
            <Select.Option key="other">其他</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="选择年份">
          <Select value={year} style={{ width: 100 }} onChange={(val) => setYear(val)}>
            {yearSelector()}
          </Select>
        </Form.Item>
        <Form.Item label="选择月份">
          <Select value={month} style={{ width: 100 }} onChange={(val) => setMonth(val)}>
            {monthSelector()}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => getData(true)}>
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => add()}>
            新增
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={loading} onClick={() => save()}>
            {loading ? '自动保存中' : '保存'}
          </Button>
        </Form.Item>
        {autoSaveTime && <Form.Item label="自动保存时间">{autoSaveTime}</Form.Item>}
      </Form>
      <Table
        style={{ marginTop: 5 }}
        columns={columns}
        dataSource={dataSources}
        rowKey="key"
        scroll={{ x: tableWidth, y: window.innerHeight - 250 }}
        pagination={{
          current: page,
          pageSize,
          total,
          showTotal: (totals) => `共 ${totals} 条`,
          onChange: (current, size) => {
            setPage(current);
            setPageSize(size);
          },
          pageSizeOptions: ['10', '15', '20', '25', '30', '50'],
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setPage(1);
            setPageSize(size);
          },
        }}
        bordered
        size="small"
      />
    </div>
  );
};

export default ContentTable;
