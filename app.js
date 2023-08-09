const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Успешное подключение к MongoDB');
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
  });

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(express.json());

app.listen(PORT);
