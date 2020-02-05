export default {
  appType: process.env.CUSTOM_DEV ? 'pc' : 'h5',
  plugins: process.env.CUSTOM_DEV
    ? [
        [
          'umi-plugin-father-doc',
          {
            logo:
              'https://user-images.githubusercontent.com/11746742/60695674-2bd4b280-9f15-11e9-9e71-a93b44504c0c.png',
          },
        ],
      ]
    : [],
};
