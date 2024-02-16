import { useState } from "react";

// component for Phonebook filter
const PhonebookFilter = () => {
  return (
    <>
      <Heading text={"Phonebook"} />
      filter shown with <input />
    </>
  );
};

// component to handle input fields
const PersonInput = (props) => {
  return (
    <>
      <Heading text="Add a new" />
      <form>
        <div>
          name <input value={props.newName} onChange={props.handleNameChange} />
          <br />
          number{" "}
          <input
            value={props.newNumber === null ? "" : props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <Button handleClick={props.handleClick} text={"add"} />
        </div>
      </form>
    </>
  );
};

// component to display number stored
const Numbers = ({ persons }) => {
  return (
    <>
      <Heading text="Numbers" />
      <People persons={persons} />
    </>
  );
};

// component to add headings
const Heading = ({ text }) => {
  return <h2>{text}</h2>;
};

// component to display people added
const People = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <>
          <p>
            {person.name} {person.number}
          </p>
        </>
      ))}
    </>
  );
};

// component to handle button
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick} type="submit">
      {text}
    </button>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(null);

  // function to handle name change
  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  // function to handle number change
  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  // function to handle adding people
  function handleAddingPeople(event) {
    event.preventDefault();

    const copy = [...persons];
    const newObj = { name: newName, number: newNumber };

    // check if the person is already added
    for (var i = 0; i < persons.length; i++) {
      if (JSON.stringify(persons[i]) === JSON.stringify(newObj)) {
        alert(`${newName} is already added to phonebook`);
        // clear the input fields
        setNewName("");
        setNewNumber(null);
        return;
      }
    }

    // add the person to the phonebook
    copy.push(newObj);
    setPersons(copy);
    // clear the input fields
    setNewName("");
    setNewNumber(null);
  }

  return (
    <div>
      <PhonebookFilter />
      <PersonInput
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={handleAddingPeople}
      />
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
