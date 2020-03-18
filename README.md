# @alitajs/list-view

移动端的加载更多页面封装，简化业务流程。使用了 `@umijs/hooks` 的 `useLoadMore`。

## 最简 Demo

```ts | pure
import LoadMoreListView from '@alitajs/list-view';
import { request } from 'alita';

export async function query(data): Promise<any> {
  return request('/api/list', { data });
}

const IndexPage: FC = () => {
  const renderRow = rowData => <div style={{ height: 500 }}>{rowData.title}</div>;
  return (
    <LoadMoreListView
      requestFunc={query}
      renderRow={renderRow}
      requestParams={{
        abc: '123',
        token: 'alita',
        pageSize: 0,
        offset: 0,
      }}
    />
  );
};

export default IndexPage;
```

![](https://github.com/alitajs/list-view/raw/master/src/assets/showgif.gif)

## API

更多信息，请查阅[官网](https://alitajs.com/components/list-view)
