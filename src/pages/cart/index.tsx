import React, { FC, useState, useRef } from 'react';
import { List, SearchBar, Button } from 'antd-mobile';
import { query } from '@/services/api';
import Logo from '@/assets/logo.png';
import CartListView, { CartListAttributes } from '@/LoadMore/CartListView';
import SelectIcon from '@/assets/select.png';
import UnSelectIcon from '@/assets/unSelect.png';

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
  ) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src={isSelected ? SelectIcon : UnSelectIcon}
          style={{
            marginLeft: '0.3rem',
            height: '0.5rem',
            width: '0.5rem',
          }}
          onClick={() => {
            if (isSelected) {
              unSelectItem(rowData);
            } else {
              selectItem(rowData);
            }
          }}
        />
        <Item
          arrow="horizontal"
          thumb={<img src={Logo} style={{ width: '1.5rem', height: '1.5rem' }} />}
          multipleLine
          style={{
            flex: '1',
          }}
        >
          {isSelected ? '已选中' : '未选中'}
        </Item>
      </div>
    );
  };

  const req = {
    search,
    abc: '123',
    token: 'alita',
    pagesize: 20,
    page: 1,
  };

  // 下面加了一个div是为了测试正确获取了距离屏幕的高度
  return (
    <>
      <SearchBar onSubmit={setSearch} onClear={setSearch} />
      <CartListView
        ref={cartList}
        requestFunc={query}
        renderCartRow={row}
        requestParams={req}
        onSelectChange={(selectData: any, isSelectAll: boolean) => {
          setSelectAll(isSelectAll);
        }}
        // height={400}
        isTabsPage
        alias={{
          offset: 'abc',
          pageSize: 'pagesize',
          page: 'pageNum',
          data: 'data',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '1rem',
          background: '#fff',
          position: 'fixed',
          width: '100%',
          bottom: 0,
          borderTop: '1px solid #ddd',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={selectAll ? SelectIcon : UnSelectIcon}
            alt=""
            style={{
              marginLeft: '0.3rem',
              height: '0.5rem',
              width: '0.5rem',
            }}
            onClick={() => {
              cartList.current.toggleAll();
            }}
          />
          <h3 style={{ paddingLeft: '0.2rem' }}>全选</h3>
        </div>
        <div
          style={{
            height: '80%',
            width: '2rem',
            background: '#1890ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0.3rem',
            borderRadius: '0.5rem',
            color: '#fff',
          }}
          onClick={() => {
            const selectData = cartList.current.getSelectDate();
            console.log(selectData);
          }}
        >
          <h4>提交</h4>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
