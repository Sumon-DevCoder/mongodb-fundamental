//  have to read mongodb documentation ✔✔✔

// db.collection.insertOne() --> Inserts a single document into a collection.
// db.collection.insertMany() --> Inserts multiple documents into a collection.

// db.collection.find() when used with the upsert: true option.
// db.collection.findOne() when used with the upsert: true option.
// db.collection.updateOne() when used with the upsert: true option.
// db.collection.updateMany() when used with the upsert: true option.
// db.collection.findAndModify() when used with the upsert: true option.
// db.collection.findOneAndUpdate() when used with the upsert: true option.
// db.collection.findOneAndReplace() when used with the upsert: true option.
// db.collection.bulkWrite().

// In-Depth Exploration of MongoDB Queries
// MongoDB is a NoSQL database that uses a flexible schema design, allowing data to be stored in JSON-like documents. Here’s an in-depth look at how MongoDB queries work and how to effectively use them.

// 1. Basics of MongoDB Queries
// MongoDB queries are written in JavaScript-like syntax.
// They are executed on collections, which are analogous to tables in relational databases.
// Common methods:
// .find() - Retrieves documents.
// .insertOne() / .insertMany() - Adds new documents.
// .updateOne() / .updateMany() - Modifies existing documents.
// .deleteOne() / .deleteMany() - Removes documents.

// 2. Query Structure
// A MongoDB query typically has three components:
// Collection Method: Specifies the action, e.g., find, update.
// Filter Document: Specifies the selection criteria.
// Projection or Options: Specifies the fields to return or modifies query behavior.
// example:
db.collection("products").find(
  { price: { $gt: 20 } }, // Filter document
  { name: 1, price: 1 } // Projection (only `name` and `price` fields are returned) this is field filtering...
);

// 3. Query Operators
// MongoDB provides comparison, logical, and element operators to build powerful queries.

// Comparison Operators
// Operator	Description	Example
// $eq	Equal	{ price: { $eq: 10 } }
// $ne	Not equal	{ status: { $ne: 'shipped' } }
// $gt	Greater than	{ age: { $gt: 18 } }
// $gte	Greater than or equal to	{ age: { $gte: 18 } }
// $lt	Less than	{ price: { $lt: 100 } }
// $lte	Less than or equal to	{ price: { $lte: 100 } }
// $in	Matches any in array	{ category: { $in: ['Books', 'Toys'] } }
// $nin	Matches none in array	{ status: { $nin: ['completed'] } }

// Logical Operators
// Operator	Description	Example
// $and	Combines conditions with AND	{ $and: [{ age: { $gte: 18 } }, { name: 'John' }] }
// $or	Combines conditions with OR	{ $or: [{ status: 'shipped' }, { price: { $lte: 20 } }] }
// $not	Negates a condition	{ price: { $not: { $gt: 100 } } }
// $nor	Combines conditions, none must match	{ $nor: [{ price: { $gte: 50 } }, { status: 'shipped' }] }

// Element Operators
// Operator	Description	Example
// $exists	Checks for field existence	{ phone: { $exists: true } }
// $type	Checks field type	{ age: { $type: 'number' } }

// ❤ Explicit $and --> sobgula condition fulfill korba jara sei data object gula daw.
db.data
  .find({
    $and: [{ gender: "Female" }, { age: { $ne: 15 } }, { age: { $lte: 30 } }],
  })
  .project({ age: 1, gender: 1 }) // this is field filtering to return value
  .sort({ age: 1 });

// Explicit $or --> jokono akta condition fulfill  korlei sei data dau.
db.data
  .find({ $or: [{ interests: "Cooking" }, { interests: "Reading" }] })
  .project({ interests: 1, gender: 1 })
  .sort({ age: 1 });

db.data
  .find({ $or: [{ "skills.name": "JAVASCRIPT" }, { "skills.name": "PYTHON" }] })
  .project({ skills: 1, gender: 1 })
  .sort({ age: 1 });

//  $Exists --> sei document ar modde sei field exist kore kina. value hisabe (true / false)
// .project --> means which field we want to show - one or rather than.
// .sort -----> ar value (1  / -1). here 1 is assending, and -1 is descending.
db.data
  .find({ age: { $exists: true } })
  .project({ skills: 1, gender: 1 })
  .sort({ age: 1 });

// $Type --> atair madomeui amra chile kono field ar type dore tar datagula niya aste pari. (string, number, null etc)
db.data.find({ age: { $type: "string" } }).project({ age: 1 });

// $size --> amra chile kono akta array empty array ase kina check korte pari and konogula value ola array chai seta nite pari.
db.data.find({ friends: { $size: 0 } }).project({ friends: 1 });
db.data.find({ skills: { $eq: [] } }).project({ skills: 1 }); // to get empty array ola field.

//  kono array ar position ar madome o amora sei field ta pete pari.
db.data.find({ "interests.2": "Cooking" }).project({ interests: 1 });

// $all --> position ultapalta thakleu jei jei array value gula chilbo sei value field gula pabo
db.data
  .find({ interests: { $all: ["Reading", "Writing", "Cooking"] } })
  .project({ interests: 1 });

// $elemMatch --> element match korar jonno use kora hoi object.
db.data
  .find({
    skills: { $elemMatch: { name: "JAVASCRIPT", level: "Intermidiate" } },
  })
  .project({ skills: 1 });

// # update Document --> kono akta document ar ak ba ar beshi field ke update korte pari $set ar maddome.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") }, // kake updte korbo
  { $set: { age: 36 } } // kon kon field ke update korbo and $set primitive data ok but non-primitive data entrily replace korte chile use korbo.
);

// $AddToSet --> array ar modde value set kore dibe but it not add to duplicate value and only ata value set korte parbo.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $addToSet: { interests: "Playing" } } // notun notun value add korsi array ar modde
);

// tahole duplicate value add korte parbo $push.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  {
    $push: { interests: { $each: ["Watching Movies", "Watching Motivation"] } },
  }
);

// tahole array ar vitor akadik value set korar jonno $each use korte hobe.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  {
    $addToSet: {
      interests: { $each: ["Watching Movies, Watching Motivation"] },
    },
  }
);

// in this way amra array ar modde notunvabe aro akta array add korte parbo
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $addToSet: { interests: ["Driving, Drinking"] } }
);

// $unset --> kono akta field ke remove kore dite pari.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $unset: { birthday: "" } } // aikhane "" / 1 use kore dite pari karon 1 mean true bujai.
);

// $pop --> array ar last position means pison theke sei value ke remove kore dite parbo.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $pop: { friends: 1 } }
);

// $pop --> array ar first position means samner dik theke sei value ke remove kore dite parbo.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $pop: { friends: -1 } }
);

// $pull --> means tene ber kore niya asa that means kono akta field ar specific value ke amra sekhan theke tene ber kre niya aste pari.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $pull: { friends: "Tanmoy Parvez" } }
);

// $putAll --> mean array akadik value ke tene ber kore niya aso.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  {
    $pullAll: {
      interests: ["Cooking", "Writing", "Reading", "Coding", "Playing"],
    },
  }
);

// # object ar khetre $set ar use korbo. that means amra chile kono akta object ar nested property ar value change korte pari.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $set: { "name.firstName": "sumon" } }
);

// # array of object ar property ke modify korbo
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000066"), "skills.name": "RUBY" },
  {
    $set: { "skills.$.name": "JAVASCRIPT EXPERT" },
  }
);

// # Delete a single document from collection.
db.data.deleteOne({ _id: ObjectId("6406ad63fc13ae5a40000065") });

// # Delete Collection
db.posts.drop();

// # $inc --> kono akta value ke increment korte pari
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000066") },
  {
    $inc: { age: 3 }, // that means tumi koto kore increment korte chachi
  }
);
