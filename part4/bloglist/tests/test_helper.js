const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Name 1',
    url: 'myname1.com',
    likes: 23,
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Name 2',
    url: 'name2.com',
    likes: 8,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'notanauthor',
    url: 'notalink',
    likes: 3,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
