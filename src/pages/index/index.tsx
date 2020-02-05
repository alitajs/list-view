import React, { FC } from 'react';
import { List } from 'antd-mobile';
import { query } from '@/services/api';
import LoadMoreListView from '@/LoadMoreListView';
import Logo from '@/assets/logo.png';

const { Item } = List;
const { Brief } = Item;

const IndexPage: FC = () => {
  const row = (rowData: any, sectionID: string | number, rowID: string | number) => (
    <Item
      arrow="horizontal"
      thumb={<img src={Logo} style={{ width: '1.5rem', height: '1.5rem' }} />}
      multipleLine
      onClick={() => {}}
    >
      {rowData.title} <Brief>{rowID}</Brief>
    </Item>
  );
  return (
    <LoadMoreListView
      requestFunc={query}
      renderRow={row}
      requestParams={{
        abc: '123',
        token: 'alita',
        pageSize: 0,
        offset: 0,
      }}
    />
  );
};

export default IndexPage;
