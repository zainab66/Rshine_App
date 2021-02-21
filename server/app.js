const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const env = require("dotenv");
env.config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const categoryRouter = require('./routes/category');
const crouselRouter = require('./routes/crousel');
const cartRouter = require('./routes/cart');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'uploads')));

//mongodb connection
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.amlpj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  {
     useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
  }
).then(() => {
  console.log('Database connected')
});

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/category', categoryRouter);
app.use('/api/crousel', crouselRouter);
app.use('/api/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;