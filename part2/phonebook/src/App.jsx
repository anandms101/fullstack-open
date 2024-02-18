import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

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
const Persons = (props) => {
  return (
    <>
      {props.persons
        .filter((person) =>
          person.name.toLowerCase().includes(props.filter.toLowerCase())
        )
        .map((person) => (
          <Person
            setPersons={props.setPersons}
            key={person.id}
            persons={props.persons}
            person={person}
          />
        ))}
    </>
  );
};

// component to display person information
const Person = (props) => {
  // handle deletion of person from the server
  function handleDeletePerson(id) {
    if (window.confirm(`Delete ${props.person.name}?`)) {
      console.log(id, "id");
      personService.deletePerson(id).then((response) => {
        props.setPersons(props.persons.filter((person) => person.id !== id));
      });
    }
  }

  return (
    <p key={props.id}>
      {props.person.name} {props.person.number}{" "}
      <button onClick={() => handleDeletePerson(props.person.id)}>
        delete
      </button>
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
    const newObj = { name: newName, number: newNumber }; // Generating unique ID

    // check if the person is already added
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === newObj.name) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          personService.update(persons[i].id, newObj).then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== persons[i].id ? person : response
              )
            );
          });
        }
        // clear the input fields
        setNewName("");
        setNewNumber(null);
        return;
      }
    }

    // posting data to the server
    personService.create(newObj).then((response) => {
      setPersons(persons.concat(response));
    });

    // clear the input fields
    setNewName("");
    setNewNumber(null);
  }

  // function to handle filter change
  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  // fetching data from server
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

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
      <Persons setPersons={setPersons} persons={persons} filter={filter} />
    </div>
  );
};

export default App;
