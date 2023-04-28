const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain('Browser can execute only Javascript');
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Name 3',
      url: 'name3.com',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).toContain('async/await simplifies making async calls');
  });
});

describe('blog with missing properties', () => {
  test('blog has id property', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });

  test('a blog without likes property will default to 0 likes', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Name 3',
      url: 'name3.com',
    };

    await api.post('/api/blogs').send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    const addedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title);
    expect(addedBlog.likes).toBe(0);
  });

  test('a blog without title and url properties will return 400 Bad Request', async () => {
    const newBlog = {
      author: 'Name 3',
      likes: 3,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('a blog without title property will return 400 Bad Request', async () => {
    const newBlog = {
      author: 'Name 3',
      url: 'name3.com',
      likes: 3,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('a blog without url property will return 400 Bad Request', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Name 3',
      likes: 3,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.delete(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const updatedBlogInDb = blogsAtEnd.find(
      (blog) => blog.title === blogToUpdate.title
    );
    expect(updatedBlogInDb.likes).toBe(blogToUpdate.likes + 1);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.put(`/api/blogs/${invalidId}`).send({}).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
