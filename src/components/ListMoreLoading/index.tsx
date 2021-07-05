import React, { FC } from 'react';
import './index.less';

interface ListMoreLoadingProps {}

const ListMoreLoading: FC<ListMoreLoadingProps> = ({}) => {
  return <div className="loading">正在刷新</div>;
};

export default ListMoreLoading;
