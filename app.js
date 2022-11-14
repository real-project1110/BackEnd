const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
  errorLogger,
  errorHandler,
} = require('./middlewares/error-handler.middleware');
const routes = require('./routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.use(errorLogger);
app.use(errorHandler);
app.listen(port, () => {
  console.log('Hi server open :', port);
});
