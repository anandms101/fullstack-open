import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  function handleNameChange(event) {
    console.log("new Name", event.target.value);
    setNewName(event.target.value);
  }

  function handleAddingNames(event) {
    event.preventDefault();

    const copy = [...persons];
    const newObj = { name: newName };

    for (var i = 0; i < persons.length; i++) {
      if (JSON.stringify(persons[i]) === JSON.stringify(newObj)) {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        return;
      }
    }

    copy.push(newObj);
    setPersons(copy);
    setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br></br>
          number: <input />
        </div>
        <div>
          <button onClick={handleAddingNames} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
