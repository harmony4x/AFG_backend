require('dotenv').config()
const port = process.env.port || 8888;
const express = require('express')
const app = express()
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');
const connection = require('../src/config/database')
const createError = require('http-errors')
require('./config/redis')
const { uploadFile } = require('./models/upload')
const cors = require('cors');
// uploadFile({ shared: true })

configViewEngine(app)

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/', webRouter);
app.use('/v1/api', apiRouter);

// app.use((req, res, next) => {
//     next(createError.NotFound('Alo'))
// })
// app.use((err, req, res, next) => {
//     res.json({
//         status: err.status || 500,
//         message: err.message
//     })
// });


app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    })

});

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

