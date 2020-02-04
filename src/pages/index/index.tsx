import React, { FC } from 'react';
import { query } from '@/services/api';
import LoadMoreListView from '@/LoadMoreListView';

const IndexPage: FC = () => {
  const renderRow = rowData => <div style={{ height: 500 }}>{rowData.title}</div>;
  return (
    <LoadMoreListView
      requestFunc={query}
      renderRow={renderRow}
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
