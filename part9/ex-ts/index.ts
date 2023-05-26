import calculateBmi from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

import express from 'express';
const app = express();

app.use(express.json());

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
app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = exerciseCalculator(daily_exercises, Number(target));
  return res.json(result);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
