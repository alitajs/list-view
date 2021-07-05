import React, { FC, useState, useRef, useEffect } from 'react';
import { List, SearchBar, Button } from 'antd-mobile';
import { useSetState } from 'ahooks';
import { query } from '@/services/api';
import { DataSourceList, DataSourceListAttributes } from '@/index';
import Logo from '@/assets/logo.png';

const { Item } = List;
const { Brief } = Item;

const IndexPage: FC = () => {
  const [search, setSearch] = useState();
  const [state, setState] = useSetState({
    loading: true,
    loadingMore: false,
    noMore: false,
    pageNum: 1,
    dataSource: [],
  });
  const loadMoreList = useRef<DataSourceListAttributes>(null);
  const row = (rowData: any, sectionID: string | number, rowID: string | number) => (
    <Item
      arrow="horizontal"
      thumb={<img src={Logo} style={{ width: '1.5rem', height: '1.5rem' }} />}
      multipleLine
      onClick={() => {}}
    >
      {rowData.title} <Brief>{rowID}</Brief>
    </Item>
  );

  const onLoadMore = () => {
    setState({
      loading: false,
      loadingMore: true,
      noMore: false,
    });
    query({
      search,
      abc: '123',
      token: 'alita',
      pagesize: 40,
      page: state.pageNum + 1,
    }).then(res => {
      const dataSource = state.dataSource.concat(res.data);
      console.log(
        dataSource.length,
        Number(res.total),
        res.total,
        dataSource.length >= Number(res.total),
      );
      setState({
        loading: false,
        loadingMore: false,
        noMore: dataSource.length >= Number(res.total),
        dataSource,
        pageNum: state.pageNum + 1,
      });
    });
  };

  const onRefresh = () => {
    setState({
      loading: true,
      loadingMore: false,
      noMore: false,
      pageNum: 1,
    });
    query({
      search,
      abc: '123',
      token: 'alita',
      pagesize: 40,
      page: 1,
    }).then(res => {
      setState({
        loading: false,
        dataSource: res.data,
      });
    });
  };

  useEffect(() => {
    onRefresh();
  }, []);
  console.log(state);

  // 下面加了一个div是为了测试正确获取了距离屏幕的高度
  return (
    <>
      <SearchBar onSubmit={setSearch} onClear={setSearch} />
      <Button
        onClick={() => {
          loadMoreList.current.reloadDataSource();
        }}
      >
        重新加载
      </Button>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <DataSourceList
            {...state}
            ref={loadMoreList}
            renderRow={row}
            onRefreshFunc={onRefresh}
            onLoadMoreFunc={onLoadMore}
            noData={<div style={{ height: '100px', backgroundColor: '#f40' }}>123456</div>}
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
