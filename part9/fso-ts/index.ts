import express from 'express';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
