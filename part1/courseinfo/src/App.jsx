const App = () => {
  // header component
  const Header = ({ courseName }) => {
    return <h1>{courseName}</h1>;
  };

  // content component
  const Content = (props) => {
    return (
      <>
        <Part
          partName={props.partDetails[0].name}
          exerciseCount={props.partDetails[0].excercise}
        />
        <Part
          partName={props.partDetails[1].name}
          exerciseCount={props.partDetails[1].excercise}
        />
        <Part
          partName={props.partDetails[2].name}
          exerciseCount={props.partDetails[2].excercise}
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
    for(var i = 0; i < props.partDetails.length; i++){
      exerciseTotal += props.partDetails[i].excercise;
    }

    return <p>Number of exercises {exerciseTotal}</p>;
  };

  // new structure of data
  const coursedetails = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        excercise: 10,
      },
      {
        name: "Using props to pass data",
        excercise: 7,
      },
      {
        name: "State of a component",
        excercise: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={coursedetails.name} />
      <Content partDetails={coursedetails.parts} />
      <Total partDetails={coursedetails.parts} />
    </div>
  );
};

export default App;
