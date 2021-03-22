import React, { useEffect, useState } from 'react';
import { Form, Table, Select, Input, Button, Divider, Popconfirm } from 'antd';
import axios from 'axios';

import useGlobal from '../../myHooks/useGlobal';

const data = {
  subName: '千夏',
  subNameEng: 'Airota',
  subType: 'sub',
  subUrl: '',
};
const CoSub = () => {
  const [{ token }] = useGlobal();
  const [dataSources, setDataSources] = useState([data]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [autoSaveTime, setAutoSaveTime] = useState('');

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
      type,
      year,
      month,
    };
    dataSources.unshift(newItem);
    setDataSources([...dataSources]);
  };

  const save = () => {
    setLoading(true);
  };

  const deleteOne = (index) => {
    dataSources.splice(index, 1);
    setDataSources([...dataSources]);
    save();
    setPage(1);
  };

  useEffect(() => {});

  const columns = [
    {
      title: '组名',
      align: 'center',
      dataIndex: 'subName',
      width: 120,
      render: (v, r, i) => {
        return <Input value={v} title={v} />;
      },
    },
    {
      title: '组名(英/日)',
      align: 'center',
      dataIndex: 'subNameEng',
      width: 120,
      render: (v, r, i) => {
        return <Input value={v} title={v} />;
      },
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'subType',
      width: 120,
      render: (v, r, i) => {
        return (
          <Select value={v} style={{ width: 180 }} onChange={(val) => setType(val)}>
            <Select.Option key="">无</Select.Option>
            <Select.Option key="sub">字幕组</Select.Option>
            <Select.Option key="rip">压制组</Select.Option>
          </Select>
        );
      },
    },
    {
      title: '链接',
      align: 'center',
      dataIndex: 'subUrl',
      width: 120,
      render: (v, r, i) => {
        return <Input value={v} title={v} />;
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

  return (
    <div style={{ border: '1px solid #ccc', padding: 5 }}>
      <Form layout="inline">
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
        rowKey="subName"
        scroll={{ y: window.innerHeight - 250 }}
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

export default CoSub;
