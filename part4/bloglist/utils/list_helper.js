const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  return blogs.reduce((max, blog) => (
        max.likes > blog.likes ? max : blog
  ), blogs[0]);
};

const mostBlogs = (blogs) =>{
  if (blogs.length === 0) {
    return {};
  }

  const authorGroups = _.groupBy(blogs, 'author');
  const authorBlogCounts = _.map(authorGroups, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));
  const authorWithMostBlogs = _.maxBy(authorBlogCounts, 'blogs');

  return {
    author: authorWithMostBlogs.author,
    blogs: authorWithMostBlogs.blogs,
  };
};

const mostLikes = (blogs) =>{
  if (blogs.length === 0) {
    return {};
  }

  const authorLikes = _.reduce(blogs, (result, blog) => {
    if (result[blog.author]) {
      result[blog.author] += blog.likes;
    } else {
      result[blog.author] = blog.likes;
    }
    return result;
  }, {});

  const authorWithMostLikes = _.chain(authorLikes)
      .keys()
      .maxBy((author) => authorLikes[author])
      .value();

  return {
    author: authorWithMostLikes,
    likes: authorLikes[authorWithMostLikes],
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
