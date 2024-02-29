const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://anandms01:${password}@fullstackopen.zwni0qv.mongodb.net/?retryWrites=true&w=majority&appName=fullstackopen`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phone = mongoose.model("Phone", phoneBookSchema);

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  morgan(function (tokens, req, res) {
    // create a new token to display post request body
    tokens["post-body"] = function (req, res) {
      return JSON.stringify(req.body);
    };

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["post-body"](req, res),
    ].join(" ");
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  Phone.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  // const person = req.body;
  // console.log(req.body);

  // if (!person) {
  //   return res.status(400).json({
  //     error: "content missing",
  //   });
  // }

  // persons.forEach((p) => {
  //   if (p.name === person.name) {
  //     return res.status(400).json({
  //       error: "name must be unique",
  //     });
  //   }
  // });

  // person.id = Math.floor(Math.random() * 1000);
  // persons = persons.concat(person);
  // res.json(person);

  // code for saving the data
  const person = req.body;
  const phone = new Phone({
    name: person.name,
    number: person.number,
  });

  phone.save().then((result) => {
    res.json(result);
  });
});

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = req.body;
  persons = persons.map((p) => (p.id === id ? person : p));
  res.json(person);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on PORT ${port}`));
