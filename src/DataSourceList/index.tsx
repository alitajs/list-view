import React, { FC, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { ListViewNoData, ListViewLoadMore, ListMoreLoading } from '@/components';
import { PullToRefresh, ListView } from 'antd-mobile';
import { useSetState } from 'ahooks';
import { px2hd } from '@/Utils/index';
import { DataSourceListAttributes } from './PropType';
import './index.less';

// 滚动到底部的距离阈值
const HTRESHOLD = 100;
const DataSourceList: FC<DataSourceListAttributes> = forwardRef((props, ref) => {
  const {
    height,
    dataSource = [],
    onLoadMoreFunc = () => {},
    onRefreshFunc = () => {},
    loading = false,
    noData,
    style = {},
    isTabsPage,
    initialListSize = 25,
    renderFooter,
    noMore = false,
    loadingMore = false,
    ...otherProps
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const listViewRef = useRef(null);
  const statusRef = useRef<'loading' | 'loadmore'>('loading');
  const [state, setState] = useSetState({
    autoFullLoadingMore: false,
    viewHeight: document.documentElement.clientHeight,
    height: document.documentElement.clientHeight,
    isInitial: true,
    dataSet: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  });

  const onLoadMore = () => {
    if (!noMore && !loading && (!loadingMore || !state.autoFullLoadingMore)) {
      statusRef.current = 'loadmore';
      onLoadMoreFunc();
    }
  };

  const onRefresh = () => {
    statusRef.current = 'loading';
    onRefreshFunc();
  };

  const showNoData = () => !loading && dataSource.length === 0 && !!noData;
  useEffect(() => {
    const offsetTop = containerRef.current.getBoundingClientRect().top;
    setState({
      height: state.viewHeight - offsetTop - px2hd(isTabsPage ? 100 : 0),
    });
  }, []);

  useImperativeHandle(ref, () => ({
    reloadDataSource: onRefresh,
  }));

  return (
    <>
      <div hidden={!showNoData()}>{noData}</div>
      <div
        style={style.height === '100%' ? { height: '100%' } : {}}
        className="loadMore alita-listview"
        ref={containerRef}
        hidden={showNoData()}
      >
        <ListView
          ref={listViewRef}
          initialListSize={initialListSize}
          dataSource={state.dataSet.cloneWithRows(dataSource)}
          renderFooter={() => {
            if (renderFooter) {
              return renderFooter(noMore, loadingMore, onLoadMoreFunc);
            }
            if (loading) {
              return <></>;
            }
            return noMore ? (
              <ListViewNoData />
            ) : (
              <ListViewLoadMore
                onClick={() => {
                  onLoadMore();
                }}
                loadingMore={state.autoFullLoadingMore || loadingMore}
              />
            );
          }}
          style={{
            height: height || state.height,
            overflow: 'auto',
            ...style,
          }}
          pageSize={10}
          onEndReached={onLoadMore}
          pullToRefresh={
            <PullToRefresh
              refreshing={loading}
              onRefresh={onRefresh}
              damping={px2hd(200)}
              distanceToRefresh={px2hd(80)}
              direction="down"
              indicator={{
                activate: '松开刷新',
                deactivate: '下拉刷新',
                release: <ListMoreLoading />,
                finish: '刷新完成',
              }}
              getScrollContainer={() => containerRef.current}
            />
          }
          onEndReachedThreshold={HTRESHOLD}
          {...otherProps}
        />
      </div>
    </>
  );
});

export { DataSourceListAttributes };
export default DataSourceList;
