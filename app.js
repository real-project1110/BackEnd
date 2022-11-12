const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
app.listen(port, () => {
  console.log('Hi server open :', port);
});
