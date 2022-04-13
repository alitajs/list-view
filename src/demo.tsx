import React, { FC } from 'react';
import { List } from 'antd-mobile-v2';
import LoadMoreListView from '@alitajs/list-view';
import Logo from './assets/logo.png';

const { Item } = List;
const { Brief } = Item;
const dataSource = Array.from(new Array(100)).map((_val, i) => ({
  id: i + 1,
  title: `Ant Design Title ${i}`,
}));

interface Item {
  id: number;
  title: string;
}

interface Result {
  total: number;
  data: Item[];
}

const asyncFn = ({ pageSize, page }): Promise<Result> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: dataSource.length,
        data: dataSource.slice((page - 1) * pageSize, page * pageSize),
      });
    }, 1000);
  });

const IndexPage: FC = () => {
  const row = (rowData: any, sectionID: string | number, rowID: string | number) => (
    <Item
      arrow="horizontal"
      thumb={<img src={Logo} style={{ width: '150px', height: '150px' }} />}
      multipleLine
      onClick={() => {}}
    >
      {rowData.title} <Brief>{rowID}</Brief>
    </Item>
  );
  return (
    <LoadMoreListView
      height="600px"
      requestFunc={asyncFn}
      renderRow={row}
      requestParams={{
        abc: '123',
        token: 'alita',
        pageSize: 10,
        page: 1,
      }}
    />
  );
};

export default IndexPage;
