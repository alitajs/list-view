import { ListViewProps } from 'antd-mobile/es/list-view';

export interface DataSourceListAttributes
  extends Omit<ListViewProps, 'renderFooter' | 'onEndReached' | 'dataSource'>,
    Omit<React.ForwardRefExoticComponent<React.RefAttributes<any>>, '$$typeof'> {
  ref?: any;
  height?: string;
  isTabsPage?: boolean;
  container?: any;
  onLoadMoreFunc?: () => void;
  onRefreshFunc?: () => void;
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
   * 数据源
   */
  dataSource: Array<any>;
  loading: boolean;
  noMore: boolean;
  loadingMore: boolean;
}
