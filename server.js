let mongoose = require("mongoose");
let express = require("express");
const connectDB = require("./database");
let app = express();
let port = 5000;

connectDB();

app.listen(port, (err) =>
  err ? console.log("error in server running", err) : console.log(`server is running on ${port}`)
);

app.get("/add", (req, res) => {
  const person1 = new Person({
    name: "aicha",
    age: 28,
    favoriteFoods: ["pizza", "burgers", "fries"],
  });
  person1.save((err) => {
    err ? console.log("error while saving", err) : console.log("successfully saved");
  });
});

app.get("/add_many", (req, res) => {
  Person.create([
    { name: "John", age: 14, favoriteFoods: ["fruits", "lasagna", "poisson"] },
    { name: "Jane", age: 28, favoriteFoods: ["sushi", "thai food"] },
    { name: "Tim", age: 18, favoriteFoods: ["snacks", "chicken wing", "spaghetti"] },
  ]);
});

let name = "mostfa";
app.get("/search", (req, res) => {
  Person.find({ name: name })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});

app.get("/findOne", (req, res) => {
  Person.findOne({ favoriteFoods: { $in: ["chicken wings", "spaghetti"] } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});

let id = "5f7fd6f9ae24612cece2466a";
app.get("/findById", (req, res) => {
  Person.findById(id, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", doc);
    }
  });
});

const personId = "5f7fd6f9ae24612cece2466a";
app.get("/update", (req, res) => {
  Person.findById(personId, (err, personFound) => {
    if (err) {
      console.log("error while searching", err);
    } else {
      personFound.favoriteFoods.push("burrito");
      personFound
        .save()
        .then((response) => {
          console.log("person saved successfully", personFound);
        })
        .catch((err) => console.log("error occured while saving", err));
    }
  });
});

const personName = "samar";
app.get("/findOneAndUpdate", (req, res) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, personUpdated) => {
      err
        ? console.log("error while updating", err)
        : console.log("the new updated person :", personUpdated);
    }
  );
});

const personId2 = "5f7fd6f9ae24612cece24669";
app.get("/findByIdAndRemove", (req, res) => {
  Person.findByIdAndRemove(personId2, (err, deletedPerson) => {
    err
      ? console.log("error occured while deleting")
      : console.log("this object is deleted with succes", deletedPerson);
  });
});

app.get("/LikeBurrito", (req, res) => {
  Person.find({ favoriteFoods: { $in: "burrito" } })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err
        ? console.log("error while looking for people who like burrito", err)
        : console.log("people who like burrito", data);
    });

  app.get("/deleteAllMary", (req, res) => {
    Person.remove({ name: "Mary" }, (err, result) => {
      err ? console.log("error while deleting") : console.log("deleted successfully", result);
    });
  });
});
