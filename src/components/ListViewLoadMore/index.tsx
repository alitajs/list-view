import React, { FC } from 'react';
import './index.less';

interface ListViewLoadMoreProps {
  onClick: () => void;
  loadingMore: boolean;
}

const ListViewLoadMore: FC<ListViewLoadMoreProps> = ({ loadingMore, onClick = () => {} }) => {
  return (
    <div className="ListViewLoadMore" onClick={onClick}>
      {loadingMore ? <span className="loading">加载中...</span> : <span>点击加载更多</span>}
    </div>
  );
};

export default ListViewLoadMore;
