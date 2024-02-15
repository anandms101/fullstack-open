import { useState } from "react";

// component to display all heading texts
const Heading = (props) => {
  return <h1>{props.headingText}</h1>;
};

// component to display all buttons
const Button = (props) => {
  return <button onClick={props.onClick}>{props.buttonLabel}</button>;
};

// component to display all statistics
const Statistics = (props) => {
  // variables to store the total count, average and positive feedback percentage
  var totalCount = props.goodCount + props.neutralCount + props.badCount;
  var average = props.goodCount - props.badCount;
  var positiveFeedPerc = (props.goodCount * 100) / totalCount + " %";

  // if feedback given
  if (totalCount !== 0) {
    return (
      <>
        <table>
          <StatisticLine text={"good"} value={props.goodCount} />
          <StatisticLine text={"neutral"} value={props.neutralCount} />
          <StatisticLine text={"bad"} value={props.badCount} />
          <StatisticLine text={"all"} value={totalCount} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positiveFeedPerc} />
        </table>
      </>
    );
  } else { // if no feedback given
    return (
      <>
        <StatisticLine text={"No feeback given"} value={""} />
      </>
    );
  }
};

// component to display each line of statistics
const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>
          {props.text} {props.value}
        </td>
      </tr>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Heading headingText={"give feedback"} /> 
      <Button buttonLabel={"good"} onClick={() => setGood(good + 1)} />
      <Button buttonLabel={"neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button buttonLabel={"bad"} onClick={() => setBad(bad + 1)} />
      <Heading headingText={"statistics"} />
      <Statistics goodCount={good} badCount={bad} neutralCount={neutral} />
    </div>
  );
};

export default App;
