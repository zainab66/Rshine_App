const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const env = require("dotenv");
env.config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//mongodb connection
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.amlpj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
   {
     useNewUrlParser: true,
      useUnifiedTopology: true
    }
    ).then(() => {
      console.log('Database connected')
    });


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
