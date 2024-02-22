require("dotenv").config();

/** 1) Install & Set up mongoose */
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/** 2) Create a 'Person' Model */
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, require: true },
  age: Number,
  favoriteFoods: [String],
});

/** 3) Create and Save a Person */
let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var HuyTran = new Person({
    name: "Huy Tran",
    age: 21,
    favoriteFoods: ["Bun_thit_nuong", "Beefsteak"],
  });

  HuyTran.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });// .save() dont allow callback function anymore in mongoose

  // try to use .save().then((data)=>{...}).catch((err)=>{ if (err) ...}); instead
};

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  {
    name: "Jogn",
    age: 19,
    favoriteFoods: ["Pizza"],
  },
  {
    name: "Alice",
    age: 23,
    favoriteFoods: ["Pancake"],
  },
  {
    name: "Anna",
    age: 20,
    favoriteFoods: ["Rice"],
  },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/** 5) Use model.find() to Search Your Database */
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data); //you need to defind function 'done' in real project
  });
};

// 6) Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// 7)Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// 8)Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};
{
}

// 9)Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    },
  );
};

// 10)Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) =>{
    if (err) return console.error(err);
    done(null, data);
  });
};

// 11)Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) =>{
    if (err) return console.error(err);
    done(null, data);
  });
};

// 12)Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  var findQuery=Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0});
  findQuery.exec((err, data) =>{
    if (err) return console.error(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
