import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    });

    setNewBlog('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={newBlog}
            onChange={({ target }) => setNewBlog(target.value)}
            placeholder="enter title here"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="enter author here"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="enter url here"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
