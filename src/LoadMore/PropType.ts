import { ListViewProps } from 'antd-mobile/es/list-view';

export interface Result {
  total: number;
  data: any[];
}

export interface AliasProps {
  data?: string;
  pageSize?: string;
  offset?: string;
  total?: string;
  page?: string;
}
export interface LoadMoreListAttributes {
  reloadDataSource: () => void;
}

export interface LoadMoreListViewProps
  extends Omit<ListViewProps, 'renderFooter' | 'onEndReached' | 'dataSource'>,
    Omit<React.ForwardRefExoticComponent<React.RefAttributes<any>>, '$$typeof'> {
  ref?: any;
  height?: string;
  isTabsPage?: boolean;
  alias?: AliasProps;
  container?: any;
  requestFunc: (params: any) => Promise<any>;
  onLoadMoreFunc: () => void;
  onRefreshFunc: () => void;
  requestParams?: object;
  autoFullViewPort?: boolean;
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
  noData?: React.ReactNode | string;
  onChange?: (data: any) => void;
  /**
   * @description 开始页码
   * @default 1
   */
  startPage?: number;
}
