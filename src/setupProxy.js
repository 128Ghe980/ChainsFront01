const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'api/pools/ltc/accounts/3832/miners/stats?group_id=',
    createProxyMiddleware({
      target: 'https://www.dxpool.com',
      changeOrigin: true,
      pathRewrite: {
        '^api/pools/ltc/accounts/3832/miners/stats?group_id=': 'api/pools/ltc/accounts/3832/miners/stats?group_id=',
      },
    }),
  );
};
