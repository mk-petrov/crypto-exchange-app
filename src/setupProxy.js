const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {

  app.use(
    '/v3',
    createProxyMiddleware({
      target: 'https://api.binance.com/api',
      changeOrigin: true,
    }),
  );

  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://api-pub.bitfinex.com',
      changeOrigin: true,
    }),
  );

  app.use(
    '/0',
    createProxyMiddleware({
      target: 'https://api.kraken.com',
      changeOrigin: true,
    }),
  );

  app.use(
    '/market',
    createProxyMiddleware({
      target: 'https://api.huobi.pro',
      changeOrigin: true,
    }),
  );
};