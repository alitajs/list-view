export default {
  'GET /api/hello': {
    text: 'Alita',
  },
  'POST /api/list': (req, res) => {
    const dataSource = [
      {
        id: 1,
        title: 'Ant Design Title 1',
      },
      {
        id: 2,
        title: 'Ant Design Title 2',
      },
      {
        id: 3,
        title: 'Ant Design Title 3',
      },
      {
        id: 4,
        title: 'Ant Design Title 4',
      },
      {
        id: 5,
        title: 'Ant Design Title 5',
      },
      {
        id: 6,
        title: 'Ant Design Title 6',
      },
      {
        id: 7,
        title: 'Ant Design Title 7',
      },
      {
        id: 8,
        title: 'Ant Design Title 8',
      },
      {
        id: 9,
        title: 'Ant Design Title 9',
      },
      {
        id: 10,
        title: 'Ant Design Title 10',
      },
    ];
    const { body } = req;

    const { pageSize, offset } = body;
    return res.json({
      total: dataSource.length,
      data: dataSource.slice(offset, offset + pageSize),
    });
  },
};
