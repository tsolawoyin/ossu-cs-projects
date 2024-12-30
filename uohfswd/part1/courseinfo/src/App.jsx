const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Content = ({ loc }) => {
  // loc reps list of contents
  // I will know what to do about that one...
  return (
    <>
      {loc.map((l) => {
        return (
          <Part part={l.part} exercise={l.exercise}/>
        );
      })}
    </>
  );
};

const Total = ({ loe }) => {
  // this too
  return (
    <>
      <p>Number of exercises {loe.reduce((a, b) => a + b, 0)}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        loc={[
          { part: part1, exercise: exercises1 },
          { part: part2, exercise: exercises2 },
          { part: part3, exercise: exercises3 },
          // { part: part3, exercise: exercises3 },
        ]}
      />
      <Total loe={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;