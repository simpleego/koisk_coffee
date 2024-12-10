const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'http://www.aladin.co.kr',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/ttb/api/ItemSearch.aspx',
    },
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`프록시 서버가 포트 ${PORT}에서 실행 중입니다.`);
});
