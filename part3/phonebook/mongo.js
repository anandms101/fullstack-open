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

// code for saving the data

if (process.argv.length === 5) {
  const phone = new Phone({
    name: process.argv[3],
    number: process.argv[4],
  });

  phone.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

// code for fetching the data

if (process.argv.length === 3) {
  Phone.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((phone) => {
      console.log(phone.name, phone.number);
    });
    mongoose.connection.close();
  });
}
