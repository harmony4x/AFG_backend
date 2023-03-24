require('dotenv').config()
const port = process.env.port || 8888;
const express = require('express')
const app = express()
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web')
configViewEngine(app)
app.use('/', webRouter)

app.listen(port, () => {
    console.log(`Example listening on port ${port}`);
});