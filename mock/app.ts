const dataSource = Array.from(new Array(100)).map((_val, i) => ({
  id: i + 1,
  title: `Ant Design Title ${i}`,
  namea: '我去',
}));

const newLoadMore = (req, res) => {
  const { body } = req;
  const { pagesize, pageNum } = body;
  const a = dataSource.slice((pageNum - 1) * pagesize, pageNum * pagesize);
  setTimeout(() => {
    res.end(
      JSON.stringify({
        t: dataSource.length,
        a: dataSource.slice((pageNum - 1) * pagesize, pageNum * pagesize),
      }),
    );
  }, 2000);
};

const loadMore = (req, res) => {
  const { body } = req;
  const { pagesize, page } = body;
  setTimeout(() => {
    res.end(
      JSON.stringify({
        total: dataSource.length,
        data: dataSource.slice((page - 1) * pagesize, page * pagesize),
      }),
    );
  }, 2000);
};

export default {
  'GET /api/hello': {
    text: 'Alita',
  },
  'POST /api/list': loadMore,
  'POST /api/loadmore': newLoadMore,
};
