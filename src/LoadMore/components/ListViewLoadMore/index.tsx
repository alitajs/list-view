import React, { FC } from 'react';
import styles from './index.less';

interface ListViewLoadMoreProps {
  onClick: () => void;
  loadingMore: boolean;
}

const ListViewLoadMore: FC<ListViewLoadMoreProps> = ({ loadingMore, onClick = () => {} }) => {
  return (
    <div className={styles.ListViewLoadMore} onClick={onClick}>
      {loadingMore ? <span className={styles.loading}>加载中...</span> : <span>点击加载更多</span>}
    </div>
  );
};

export default ListViewLoadMore;
