const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
  errorLoger,
  errorHandler,
} = require('./middlewares/error-handler.middleware');
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.use(errorLoger);
app.use(errorHandler);
app.listen(port, () => {
  console.log('Hi server open :', port);
});
