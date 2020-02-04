# LoadMoreListView

移动端的加载更多页面封装，简化业务流程。

## 最简 Demo

```ts | pure
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

<code src="./pages/index/index.tsx" />
