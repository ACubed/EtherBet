var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const { dbConnect } = require('./models');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

dbConnect().then(async () => {
    app.listen(process.env.PORT, () => {
        console.log(`app listening to ${process.env.PORt}`);
    });
});

app.use('/', indexRouter);

module.exports = app;
