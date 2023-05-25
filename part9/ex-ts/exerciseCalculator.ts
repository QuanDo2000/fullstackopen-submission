interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): number[] => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const daily_exercises = args.slice(3).map((d) => Number(d));

  if (!isNaN(target) && !daily_exercises.some((d) => isNaN(d))) {
    return [target, ...daily_exercises];
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const exerciseCalculator = (
  daily_exercises: number[],
  target: number
): Result => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((d) => d > 0).length;
  const average = daily_exercises.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const rating = average >= target + 1 ? 3 : average >= target ? 2 : 1;
  const ratingDescription =
    rating === 3 ? 'awesome' : rating === 2 ? 'good' : 'bad';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const [target, ...daily_exercises] = parseArguments(process.argv);
  console.log(exerciseCalculator(daily_exercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
