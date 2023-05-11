const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes > item.likes ? max : item;
  };

  return blogs.length === 0 ? {} : blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author');
  const author = _.maxBy(_.keys(authors), (o) => {
    return authors[o];
  });

  return blogs.length === 0 ? {} : { author: author, count: authors[author] };
};

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author');
  const author = _.maxBy(_.keys(authors), (o) => {
    return _.sumBy(authors[o], 'likes');
  });

  return blogs.length === 0
    ? {}
    : { author: author, likes: _.sumBy(authors[author], 'likes') };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
