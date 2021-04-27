import React, { FC } from 'react';
import './index.less';

interface ListViewNoDataProps {}

const ListViewNoData: FC<ListViewNoDataProps> = ({}) => {
  return <div className="ListViewNoData">没有更多数据了</div>;
};

export default ListViewNoData;
