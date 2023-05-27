interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Header = (props: { name: string }) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Content = (props: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

const Total = (props: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      </p>
    </div>
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
