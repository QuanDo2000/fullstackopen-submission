/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: 'special';
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const Header = (props: { name: string }) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Part = (props: { coursePart: CoursePart }) => {
  switch (props.coursePart.kind) {
    case 'basic':
      return (
        <p>
          <strong>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </strong>
          <br />
          <em>{props.coursePart.description}</em>
        </p>
      );
    case 'group':
      return (
        <p>
          <strong>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </strong>
          <br />
          project exercises {props.coursePart.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          <strong>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </strong>
          <br />
          <em>{props.coursePart.description}</em>
          <br />
          background material {props.coursePart.backgroundMaterial}
        </p>
      );
    case 'special':
      return (
        <p>
          <strong>
            {props.coursePart.name} {props.coursePart.exerciseCount}
          </strong>
          <br />
          <em>{props.coursePart.description}</em>
          <br />
          required skills: {props.coursePart.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(props.coursePart);
  }
};

const Content = (props: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </div>
  );
};

const Total = (props: { courseParts: CoursePart[] }) => {
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
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ];

  // courseParts.forEach((part) => {
  //   switch (part.kind) {
  //     case 'basic':
  //       console.log(part.name, part.description);
  //       break;
  //     case 'group':
  //       console.log(part.name, part.groupProjectCount);
  //       break;
  //     case 'background':
  //       console.log(part.name, part.backgroundMaterial);
  //       break;
  //     case 'special':
  //       console.log(part.name, part.requirements);
  //       break;
  //     default:
  //       assertNever(part);
  //       break;
  //   }
  // });

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
