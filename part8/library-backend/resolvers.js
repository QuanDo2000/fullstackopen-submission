const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const { ObjectId } = require('mongoose').Types;
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });

        return Book.find({
          author: new ObjectId(author.id),
          genres: { $in: [args.genre] },
        }).populate('author');
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });

        return Book.find({ author: new ObjectId(author.id) }).populate(
          'author'
        );
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author');
      }

      return Book.find({}).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }

      if (args.title.length < 5) {
        throw new GraphQLError('Title must be at least 5 characters');
      }

      const authorExists = await Author.exists({ name: args.author });
      if (!authorExists) {
        if (args.author.length < 4) {
          throw new GraphQLError('Author name must be at least 4 characters');
        }

        const newAuthor = new Author({ name: args.author, bookCount: 1 });

        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              error: error.message,
              error,
            },
          });
        }
      }
      const author = await Author.findOne({ name: args.author });
      const book = new Book({ ...args, author: author });

      try {
        author.bookCount += 1;
        await author.save();
        await book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            error: error.message,
            error,
          },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }

      const updatedAuthor = await Author.findByIdAndUpdate(
        author.id,
        { born: args.setBornTo },
        { new: true }
      );

      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error: error.message,
            error,
          },
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Author: {
    bookCount: async (root) => {
      if (root.bookCount) {
        return root.bookCount;
      }

      const author = await Author.findById(root.id);
      const count = await Book.find({ author: author.id }).countDocuments();
      author.bookCount = count;
      await author.save();
      return count;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
