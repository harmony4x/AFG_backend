const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload')

const configViewEngine = (app) => {
    //Config template
    app.set('views', path.join('./src', './views/'))
    app.set('view engine', 'pug')

    //Config statis file 
    app.use(express.static(path.join('./src', 'public')))


    // Config req.body
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // Config uploadfile 
    app.use(fileUpload());

}

module.exports = configViewEngine;