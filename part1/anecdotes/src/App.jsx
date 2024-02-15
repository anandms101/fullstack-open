import { useState } from "react";

// component to display heading
const Heading = (props) => {
  return <h1>{props.text}</h1>;
};

// component to display content
const Content = (props) => {
  return <p>{props.content}</p>;
};

// component to display button
const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.buttonLabel}</button>
    </>
  );
};

// component to display most voted anecdote
const MostVotedAnecdote = (props) => {
  var maxPoints = Math.max(...props.points);
  var indexOfLargestAnec = props.points.indexOf(maxPoints);
  var largestAnecdote = props.anecdotes[indexOfLargestAnec];

  return (
    <>
      <Content content={largestAnecdote} />
      <Content content={maxPoints} />
    </>
  );
};

const App = () => {
  // array of anecdotes
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // state to store the selected anecdote
  const [selected, setSelected] = useState(0);

  //creating an array filled with zeros
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  // store most votes
  const mostVotes = 0;

  // function to get random index
  function getRandomIntInclusive(min, max, currentSelectedValue) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    var newSelectedValue = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled
    );
    // if the new selected value is the same as the current selected value, then call the function again
    if (currentSelectedValue === newSelectedValue) {
      return getRandomIntInclusive(min, max, currentSelectedValue);
    }
    return newSelectedValue; // The maximum is inclusive and the minimum is inclusive
  }

  // function to handle vote
  const handleVote = (selected) => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  // function to get the most voted anecdote
  function mostVotedAnecdoteFetcher() {
    var indexOfLargestAnec = points.indexOf(Math.max(...points));
    return anecdotes[indexOfLargestAnec];
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Content content={anecdotes[selected]} />
      <Content content={`has ${points[selected]} votes`} />
      <Button
        buttonLabel={"vote"}
        onClick={() => {
          handleVote(selected);
        }}
      />
      <Button
        buttonLabel={"next anecdote"}
        onClick={() =>
          setSelected(getRandomIntInclusive(0, anecdotes.length - 1, selected))
        }
      />
      <Heading text="Anecdote with most votes" />
      <MostVotedAnecdote points={points} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
