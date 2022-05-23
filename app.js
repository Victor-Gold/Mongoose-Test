const mongoose = require('mongoose');
const assert = require('assert');

//CONNECT THE URL TO MONGOOSE DB
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true
});
console.log("Listening at port: 27017"); //LOG SUCCESS MESSAGE

const fruitSchema = new mongoose.Schema({

  name: String,
  color: String,
  amount: Number,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Orange",
  color: "Greenish Red",
  amount: 22
} );

const mango = new Fruit({
  name: "Mango",
  color:"Red",
  amount: 44
})


//CREATE THE REQUIRED SCHEMA
const peopleSchema = new mongoose.Schema({
   _id: Number,
  name: String,

  age: Number,
  motto: String,
  favouriteFruit:fruitSchema
});
//CONVERT THE SCHEMA INTO A USABLE MODEL
const People = mongoose.model("People", peopleSchema);
//CREATES THE PERSONS
const people = new People({
  _id:1,
  name: "Jacob",
  age: 5,
  motto: "Omni Codex Expronum",
  favouriteFruit: fruit
}, {
  _id:2,
  name: "Kevin",
  age: 12,
  motto: "Je suis ne",
  favouriteFruit:mango
}, {
  _id:3,
  name: "Alias",
  age: 16,
  motto: "Heraclitus is the way"
})



//DELETE SPECIFIC DATA IN THE MONGO DB DATABASE

function peopleSchemaDelete() {
  People.deleteOne({
    name: "Jacob"
  }, function(err, response) {
    if (err) {
      console.log(err)
    } else {
      console.log(response);
    }
  })
};

//LOOP THROUGH THE DATABASE <<PERSON>> AND RETURN THE CONTENTS

function peopleSchemaFind() {
  People.find(function(err, people) {

    people.forEach((people) => {

      if (err) {
        console.log(err)
      } else {
        console.log(people.name);
      }
    });
    console.log("Found all peoples in the database")
  });

}



//UPDATE PERSONS IN THE DATABASE
function peopleSchemaUpdate() {

  People.updateOne({
    _id:2,
    name: "Kevin",
    age: 12,
    motto: "Je suis ne",
    favouriteFruit:mango
  }, {
    name: 'Siracuse',
    review: "Unknown"
  }, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(response)
      console.log('Successfully updated the database')
    }
  });
};

//FUNCTION CALL <<IN ORDER>>

fruit.save();
people.save();
//SAVE CREATED DATA INTO DATABASE
