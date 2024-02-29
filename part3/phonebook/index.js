const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
const PORT = process.env.PORT;

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

app.get("/", (req, res, next) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (req, res, next) => {
  Phone.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/info", (req, res) => {
  Phone.find({}).then((result) => {
    res.send(`<p>Phonebook has info for ${result.length} people</p>
    <p>${new Date()}</p>`);
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Phone.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (req, res, next) => {
  const person = req.body;
  const phone = new Phone({
    name: person.name,
    number: person.number,
  });

  Phone.findOneAndUpdate({ name: person.name }, phone, { new: true })
    .then((result) => {
      if (result) {
        return res.json(result);
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const person = req.body;
  const phone = {
    name: person.name,
    number: person.number,
  };
  Phone.findByIdAndUpdate(id, phone, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const port = PORT || 3001;
app.listen(port, () => console.log(`listening on PORT ${port}`));
