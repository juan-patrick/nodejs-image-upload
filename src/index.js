require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(require('./routes'));

app.listen(process.env.PORT || 3333, () => {
  console.log({
    status: 'OK',
    app: 'AWS Images',
    database: 'MongoDB',
    company: 'Public',
  });
});
