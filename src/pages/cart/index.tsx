import React, { FC, useState, useRef, useEffect } from 'react';
import { List, SearchBar, Button } from 'antd-mobile';
import { query } from '@/services/api';
import Logo from '@/assets/logo.png';
import CartListView, { CartListAttributes } from '@/CartListView';

const { Item } = List;

const IndexPage: FC = () => {
  const [search, setSearch] = useState();
  const [selectAll, setSelectAll] = useState(false);

  const cartList = useRef<CartListAttributes>(null);
  const row = (
    rowData: any,
    isSelected: boolean,
    selectItem: (key: any) => void,
    unSelectItem: (key: any) => void,
  ) => (
    <Item
      arrow="horizontal"
      thumb={<img src={Logo} style={{ width: '1.5rem', height: '1.5rem' }} />}
      multipleLine
      onClick={() => {
        if (isSelected) {
          unSelectItem(rowData);
        } else {
          selectItem(rowData);
        }
      }}
    >
      {isSelected ? '已选中' : '未选中'}
    </Item>
  );
  const req = {
    search,
    abc: '123',
    token: 'alita',
    pageSize: 10,
    page: 1,
  };

  // 下面加了一个div是为了测试正确获取了距离屏幕的高度
  return (
    <>
      <SearchBar onSubmit={setSearch} onClear={setSearch} />
      <Button
        onClick={() => {
          cartList.current.toggleAll();
        }}
      >
        {selectAll ? '已全选' : '未全选'}
      </Button>
      <Button
        onClick={() => {
          const selectData = cartList.current.getSelectDate();
          console.log(selectData);
        }}
      >
        提交
      </Button>
      <CartListView
        ref={cartList}
        requestFunc={query}
        renderCartRow={row}
        requestParams={req}
        onSelectChange={(selectData: any, isSelectAll: boolean) => {
          setSelectAll(isSelectAll);
        }}
        alias={{
          offset: 'abc',
        }}
      />
    </>
  );
};

export default IndexPage;
