import React, { FC } from 'react';
import styles from './index.less';

interface ListViewNoDataProps {}

const ListViewNoData: FC<ListViewNoDataProps> = ({}) => {
  return <div className={styles.ListViewNoData}>没有更多数据了</div>;
};

export default ListViewNoData;
