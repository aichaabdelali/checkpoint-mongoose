let mongoose = require("mongoose");
let express = require("express");
let app = express();
let port = 5000;
/*mongoose
  .connect(`mongodb://localhost:${port}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });*/
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on ${port}`);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [
    {
      type: Array,
    },
  ],
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "John Doe",
  age: 28,
  favoriteFoods: ["burgers", "fries", "pizza"],
});

person.save(function (err, data) {
  if (err) console.log(err);
  else console.log("new person");
});

await arrayOfPeople.create([{ name: "John" }, { name: "Jane" }, { name: "Tarzan" }]);
await people.find({ name: "John" });
