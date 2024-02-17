import { useState } from "react";

// component for Phonebook filter
const Filter = (props) => {
  return (
    <>
      filter shown with{" "}
      <input value={props.filter} onChange={props.handleFilterChange} />
    </>
  );
};

// component to handle input fields
const PersonForm = (props) => {
  return (
    <>
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
const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
            <Person key={person.id} name={person.name} number={person.number} />
        ))}
    </>
  );
};

// component to display person information
const Person = (props) => {
  return (
      <p key={props.id}>
        {props.name} {props.number}
      </p>
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
    const newObj = { name: newName, number: newNumber, id: persons.length + 1 }; // Generating unique ID
  
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
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={handleAddingPeople}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
