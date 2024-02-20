const App = () => {
  // header component
  const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };

  // content component
  const Content = (props) => {
    return (
      <>
        <Part
          partName={props.parts[0].name}
          exerciseCount={props.parts[0].exercises}
        />
        <Part
          partName={props.parts[1].name}
          exerciseCount={props.parts[1].exercises}
        />
        <Part
          partName={props.parts[2].name}
          exerciseCount={props.parts[2].exercises}
        />
      </>
    );
  };

  // content details
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.partName} {props.exerciseCount}
        </p>
      </div>
    );
  };

  // total component
  const Total = (props) => {
    // get the total of exercises
    let exerciseTotal = 0;
    for (var i = 0; i < props.parts.length; i++) {
      exerciseTotal += props.parts[i].exercises;
    }

    return <p>Number of exercises {exerciseTotal}</p>;
  };

  // new structure of data
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
