const express = require('express');
const path = require('path');

const configViewEngine = (app) => {
    //Config template
    app.set('views', path.join('./src', './views/'))
    app.set('view engine', 'pug')

    //Config statis file 
    app.use(express.static(path.join('./src', 'public')))
}

module.exports = configViewEngine;