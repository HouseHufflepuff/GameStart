const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', router);

app.listen(8000, () => {
  console.log('server started on port 8000')
});
