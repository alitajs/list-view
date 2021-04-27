import React, { FC, useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { useSet, useToggle } from 'ahooks';
import LoadMoreListView from './index';
import { LoadMoreListViewProps, LoadMoreListAttributes } from './PropType';

export interface CartListAttributes {
  toggleAll: () => void;
  getSelectAll: () => boolean;
  selectItem: (item: any) => void;
  unSelectItem: (item: any) => void;
  getListData: () => any[];
  getSelectDate: () => any[];
  reloadDataSource: () => void;
}
interface CartListViewProps
  extends Omit<LoadMoreListViewProps, 'renderRow' | 'ref'>,
    Omit<React.ForwardRefExoticComponent<React.RefAttributes<any>>, '$$typeof'> {
  ref: any;
  renderCartRow: (
    rowData: any,
    isSelected: boolean,
    selectItem: (key: any) => void,
    unSelectItem: (key: any) => void,
  ) => React.ReactElement<any>;
  onSelectChange: (selectData: any, isSelectAll: boolean) => void;
}

const CartListView: FC<CartListViewProps> = forwardRef((props, ref) => {
  const { renderCartRow, onChange = () => {}, onSelectChange = (a, b) => {}, ...other } = props;
  const [data, setData] = useState([]);
  const [set, { add, has, remove, reset }] = useSet([]);
  const [state, { toggle }] = useToggle(false);
  useEffect(() => {
    onSelectChange(
      data.filter(item => has(item)),
      state,
    );
  }, [set]);
  const loadMoreList = useRef<LoadMoreListAttributes>(null);
  useImperativeHandle(ref, () => ({
    toggleAll: () => {
      if (state) {
        toggle(false);
        reset();
      } else {
        toggle(true);
        data.forEach(item => add(item));
      }
    },
    getSelectAll: () => state,
    selectItem: (item: any) => {
      add(item);
      toggle(data.length === Array.from(set).length + 1);
    },
    unSelectItem: (item: any) => {
      remove(item);
      toggle(false);
    },
    getListData: () => data,
    getSelectDate: () => data.filter(item => has(item)),
    cancelSelect: reset,
    reloadDataSource: loadMoreList.current.reloadDataSource,
  }));
  const row = (rowData: any) => {
    const isSelected = has(rowData);
    const selectItem = (key: any) => {
      add(key);
      toggle(data.length === Array.from(set).length + 1);
    };
    const unSelectItem = (key: any) => {
      remove(key);
      toggle(false);
    };
    return renderCartRow(rowData, isSelected, selectItem, unSelectItem);
  };

  return (
    <>
      <LoadMoreListView
        ref={loadMoreList}
        onChange={res => {
          setData(res);
          toggle(res.length === Array.from(set).length);
          onChange(res);
        }}
        renderRow={row}
        {...other}
      />
    </>
  );
});

export default CartListView;
