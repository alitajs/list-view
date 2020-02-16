import React, { FC, useState } from 'react';
import { List, SearchBar } from 'antd-mobile';
import { query } from '@/services/api';
import LoadMoreListView from '@/LoadMoreListView';
import Logo from '@/assets/logo.png';

const { Item } = List;
const { Brief } = Item;

const IndexPage: FC = () => {
  const [search, setSearch] = useState();
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
  const req = {
    search,
    abc: '123',
    token: 'alita',
    pageSize: 0,
    offset: 0,
  };

  return (
    <>
      <SearchBar onSubmit={setSearch} onClear={setSearch} />
      <LoadMoreListView requestFunc={query} renderRow={row} requestParams={req} />
    </>
  );
};

export default IndexPage;
