import calculateBmi from './bmiCalculator';

import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const heightNum = Number(height);
  const weightNum = Number(weight);
  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(heightNum, weightNum);
  res.json({ weight, height, bmi });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
