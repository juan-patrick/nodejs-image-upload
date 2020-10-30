require('dotenv').config();

const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(routes);

(async () => {
  await connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
})();

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.listen(process.env.PORT || 3333, () => {
  console.log({
    status: 'OK',
    app: 'AWS Images',
    database: 'MongoDB',
    company: 'Public',
  });
});
