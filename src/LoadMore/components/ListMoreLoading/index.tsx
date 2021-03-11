import React, { FC } from 'react';
import styles from './index.less';

interface ListMoreLoadingProps {}

const ListMoreLoading: FC<ListMoreLoadingProps> = ({}) => {
  return <div className={styles.loading}>正在刷新</div>;
};

export default ListMoreLoading;
