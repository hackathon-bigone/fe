// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/foodbox", "/recipe", "/groupbuy", "/mypage", "/uploads"],
    createProxyMiddleware({
      target: "http://43.203.179.188",
      changeOrigin: true,
      secure: false,
      // logLevel: "debug", // 디버깅 원하면 주석 해제
    })
  );
};
