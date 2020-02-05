import React, { FC, useRef, useEffect, useState } from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
import { ListViewProps } from 'antd-mobile/es/list-view';
import { useLoadMore } from '@umijs/hooks';

interface Result {
  total: number;
  data: any[];
}

interface AliasProps {
  data?: string;
  pageSize?: string;
  offset?: string;
  total?: string;
}

interface LoadMoreListViewProps
  extends Omit<ListViewProps, 'renderFooter' | 'onEndReached' | 'pullToRefresh' | 'dataSource'> {
  height?: string;
  alias?: AliasProps;
  requestFunc: (params: any) => Promise<any>;
  requestParams?: object;
  renderRow: (
    rowData: any,
    sectionID: string | number,
    rowID: string | number,
    highlightRow?: boolean,
  ) => React.ReactElement<any>;
  renderFooter?: (
    noMore: boolean,
    loadingMore: boolean,
    loadMore?: () => void,
  ) => React.ReactElement<any>;
}

const defaultAlias = {
  data: 'data',
  pageSize: 'pageSize',
  offset: 'offset',
  total: 'total',
};
const LoadMoreListView: FC<LoadMoreListViewProps> = ({
  height,
  requestFunc,
  requestParams = {},
  alias = {},
  renderFooter,
  ...otherProps
}) => {
  const trueAlias = { ...defaultAlias, ...alias };
  const asyncFn = ({ pageSize, offset }): Promise<Result> =>
    new Promise(resolve => {
      const reqParams = requestParams;
      reqParams[trueAlias.pageSize] = pageSize;
      reqParams[trueAlias.offset] = offset;
      requestFunc(reqParams).then(res => {
        resolve({
          total: res[trueAlias.total],
          data: res[trueAlias.data],
        });
      });
    });
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewHeight, setViewHeight] = useState(document.documentElement.clientHeight);
  const [dataSet] = useState(
    new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  );
  useEffect(() => {
    setViewHeight(viewHeight - containerRef.current.offsetTop);
  }, []);
  const { data, loading, loadingMore, reload, loadMore, noMore } = useLoadMore<Result, any>(
    asyncFn,
    {
      ref: containerRef,
      initPageSize: 10,
      incrementSize: 10,
    },
  );
  const touchLoadMore = () => {
    if (!noMore) loadMore();
  };
  return (
    <div ref={containerRef}>
      <ListView
        dataSource={dataSet.cloneWithRows(data)}
        renderFooter={() => {
          if (renderFooter) {
            return renderFooter(noMore, loadingMore, loadMore);
          }
          if (noMore) {
            return (
              <div style={{ padding: 30, textAlign: 'center' }} onClick={touchLoadMore}>
                已全部加载
              </div>
            );
          }
          return (
            <div style={{ padding: 30, textAlign: 'center' }} onClick={touchLoadMore}>
              {loadingMore ? '加载中...' : '加载完成'}
            </div>
          );
        }}
        style={{
          height: height || viewHeight,
          overflow: 'auto',
        }}
        pageSize={10}
        onEndReached={loadMore}
        pullToRefresh={
          <PullToRefresh
            refreshing={loading}
            onRefresh={reload}
            damping={300}
            distanceToRefresh={50}
          />
        }
        onEndReachedThreshold={100}
        {...otherProps}
      />
    </div>
  );
};

export default LoadMoreListView;
