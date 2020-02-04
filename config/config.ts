export default {
  appType: 'h5',
  plugins: process.env.CUSTOM_DEV ? [['umi-plugin-father-doc']] : [],
};
