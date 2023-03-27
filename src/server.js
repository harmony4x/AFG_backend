require('dotenv').config()
const port = process.env.port || 8888;
const express = require('express')
const app = express()
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');
const connection = require('../src/config/database')

configViewEngine(app)


app.use('/', webRouter);
app.use('/v1/api', apiRouter);

(async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Example listening on port ${port}`);
        });
    } catch (error) {
        console.error('>>>>>Check error: ', error);
    }
})();

