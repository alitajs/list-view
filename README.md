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

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| height | 滚动容器的高度 | string | 充满剩余容器高度 | 否 |
| alias | 请求参数的别名 | AliasProps | 见表格下方备注 | 否 |
| requestFunc | 请求执行函数 | 异步函数 | 无 | 是 |
| requestParams | 请求参数 | object | {} | 否 |
| renderRow | 从数据源(data source)中接受一条数据，以及它和它所在 section 的 ID。返回一个可渲染的组件来为这行数据进行渲染。默认情况下参数中的数据就是放进数据源中的数据本身，不过也可以提供一些转换器。如果某一行正在被高亮（通过调用 highlightRow 函数），ListView 会得到相应的通知。 | (rowData, sectionID, rowID, highlightRow) => renderable | 无 | 是 |
| renderFooter | 重新渲染页脚，会传入三个参数，表示列表页面的当前状态。 | ( noMore, loadingMore, loadMore?) => React.ReactElement | '' | 否 |
| 其他 ListView 参数 | 能接收 ListView 的其他参数，请注意不要设置 'onEndReached'、 'pullToRefresh'、 'dataSource' | 无 | 否 |

### AliasProps

```ts | pure
interface AliasProps {
  data?: string;
  pageSize?: string;
  offset?: string;
  total?: string;
}
```

### alias 和 requestParams

默认约定请求参数是 `{ pageSize, offset }` ,返回的数据是 `{ data, total }`。如果你的请求参数和返回数据不是按照约定，那你需要手动设置 `alias`。如你的返回数据是 `{ list, count }`，那你需要设置 `alias` 为 `{ data: 'list', total: 'count' }`。如果你的请求参数，除了 `pageSize` 和 `offset` 之外，还有其它的参数，那你需要设置 `requestParams`。`requestParams` 中的 `pageSize` 和 `offset` 会被组件接管和覆盖，在加载更多时，自动产生变化，你无需理会。

`requestParams` 发生改变的时候，会自动执行 `reload`。无需重复编写逻辑。
### 约定出入参

```ts | pure
interface Params {
  pageSize: number;
  offset: number;
}
interface Result {
  total: number;
  data: any[];
}
```

### 模拟真实出入参

如果你的真实出入参如下：

```ts | pure
interface Params {
  pageSize: number;
  offset1: number;
  type: string;
  search: string;
}
interface Result {
  count: number;
  data: any[];
}
```

那你可以这样使用

```html | pure
<LoadMoreListView requestParams={{ type: 'alita', search: 'some search key', }} alias={{ total:
'count', offset: 'offset1' }} />
```

### requestFunc

请求执行函数接收的是一个异步函数，你可以把之前写在 `@/services/api` 中的函数传进去就可以。

如

```ts | pure
import { query } from '@/services/api';
const Page = () => {
  return <LoadMoreListView requestFunc={query} />;
};
export default Page;
```

这样的好处是，依旧享受之前项目中的代理，前缀和请求中间件。
