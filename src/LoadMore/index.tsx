import React, { FC, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { PullToRefresh, ListView } from 'antd-mobile-v2';
import { useRequest, useSetState } from 'ahooks-v2';
import { ListViewNoData, ListViewLoadMore, ListMoreLoading } from '@/components';
import {
  asyncFn,
  getAliasWithPropsAlias,
  getInitialListSize,
  px2hd,
  isBrowser,
} from '@/Utils/index';
import { LoadMoreListViewProps } from './PropType';
import './index.less';

// 滚动到底部的距离阈值
const HTRESHOLD = 100;

const LoadMoreListView: FC<LoadMoreListViewProps> = forwardRef((props, ref) => {
  const {
    height,
    requestFunc,
    requestParams = {},
    alias = {},
    renderFooter,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    container = '',
    noData,
    isTabsPage = false,
    onChange = () => {},
    initialListSize,
    autoFullViewPort = false,
    startPage = 1,
    style = {},
    onLoadMoreFunc = () => {},
    onRefreshFunc = () => {},
    ...otherProps
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const listViewRef = useRef(null);
  const statusRef = useRef<'loading' | 'loadmore'>('loading');
  const [state, setState] = useSetState({
    autoFullLoadingMore: false,
    // viewHeight: document.documentElement.clientHeight,
    // height: document.documentElement.clientHeight,
    isInitial: true,
    dataSet: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  });

  const trueAlias = getAliasWithPropsAlias(alias);

  const requestResult = useRequest(
    () => asyncFn(requestFunc, requestParams, alias, statusRef.current, startPage),
    {
      loadMore: true,
      ref: containerRef,
      threshold: HTRESHOLD,
      formatResult: d => ({
        total: d[trueAlias.total],
        list: d[trueAlias.data],
      }),
      isNoMore: d => (d ? d.list.length >= d.total : false),
    },
  );

  const {
    data: { list = [] } = {},
    loading,
    loadingMore,
    reload,
    loadMore,
    noMore,
  } = requestResult;
  const onLoadMore = () => {
    if (!loading && (!loadingMore || !state.autoFullLoadingMore)) {
      statusRef.current = 'loadmore';
      loadMore();
      onLoadMoreFunc();
    }
  };

  const onRefresh = () => {
    statusRef.current = 'loading';
    reload();
    onRefreshFunc();
  };

  const onReloadHeight = () => {
    if (isBrowser()) {
      const offsetTop = containerRef.current.getBoundingClientRect().top;
      setState({
        height: document.documentElement.clientHeight - offsetTop - px2hd(isTabsPage ? 100 : 0),
      });
    }
  };

  useImperativeHandle(ref, () => ({
    reloadDataSource: onRefresh,
    reloadHeight: onReloadHeight,
  }));

  useEffect(() => {
    if (isBrowser()) {
      const offsetTop = containerRef.current.getBoundingClientRect().top;
      setState({
        height: document.documentElement.clientHeight - offsetTop - px2hd(isTabsPage ? 100 : 0),
      });
    }
  }, []);

  useEffect(() => {
    onChange(list);
    // 已经加载完成 && 不是正在刷新 && 不是初始化 && 数组数量 > 0 && 用户设置了自动填充屏幕 && 有更多数据
    // 解决ListView初始化数据未占满屏幕无法下拉刷新问题: https://github.com/ant-design/ant-design-mobile/issues/3553
    if (listViewRef.current && !loading && list.length > 0 && autoFullViewPort && !noMore) {
      const containerDom = containerRef.current;
      const listViewDom = listViewRef.current.getInnerViewNode();
      if (containerDom.clientHeight >= listViewDom.scrollHeight) {
        onLoadMore();
        setState({ autoFullLoadingMore: true });
      } else {
        setState({ autoFullLoadingMore: false });
      }
    }
    setState({ isInitial: false });
  }, [JSON.stringify(list)]);

  const showNoData = () => !loading && list.length === 0 && !!noData;

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
          initialListSize={getInitialListSize(requestParams[trueAlias.pageSize], initialListSize)}
          dataSource={state.dataSet.cloneWithRows(list)}
          renderFooter={() => {
            if (renderFooter) {
              return renderFooter(noMore, loadingMore, loadMore);
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

export default LoadMoreListView;
