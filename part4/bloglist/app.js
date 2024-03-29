const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGO_URI;
mongoose.connect(mongoUrl).then(() => {
  logger.info('connected to MongoDB');
}).catch((error) => {
  logger.error('error connecting to MongoDB:', error.message);
},
);

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog
      .find({})
      .then((blogs) => {
        response.json(blogs);
      }).catch((error) => {
        logger.error(error);
      });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
      .save()
      .then((result) => {
        response.status(201).json(result);
      }).catch((error) => {
        logger.error(error);
      });
});

module.exports = app;
