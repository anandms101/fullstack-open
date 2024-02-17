import { useState } from "react";

// component for Phonebook filter
const PhonebookFilter = (props) => {
  return (
    <>
      <Heading text={"Phonebook"} />
      filter shown with{" "}
      <input value={props.filter} onChange={props.handleFilterChange} />
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
const Numbers = ({ persons, filter }) => {
  return (
    <>
      <Heading text="Numbers" />
      <People persons={persons} filter={filter} />
    </>
  );
};

// component to add headings
const Heading = ({ text }) => {
  return <h2>{text}</h2>;
};

// component to display people added
const People = ({ persons, filter }) => {
  console.log("filter", persons);
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <>
            <Person
              key={person.name}
              name={person.name}
              number={person.number}
            />
          </>
        ))}
    </>
  );
};

// component to display person information
const Person = (props) => {
  return (
    <>
      <p>
        {props.name} {props.number}
      </p>
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
  const [filter, setFilter] = useState("");

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

  // function to handle filter change
  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  return (
    <div>
      <PhonebookFilter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <PersonInput
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={handleAddingPeople}
      />
      <Numbers persons={persons} filter={filter}/>
    </div>
  );
};

export default App;
