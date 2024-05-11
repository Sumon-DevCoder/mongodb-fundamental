// $And, $Or, Implicit Vs Explicit

// Explicit $and --> sobgula condition fulfill korba jara sei data object gula daw.
db.data
  .find({
    $and: [{ gender: "Female" }, { age: { $ne: 15 } }, { age: { $lte: 30 } }],
  })
  .project({ age: 1, gender: 1 })
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

// update Document --> kono akta document ar ak ba ar beshi field ke update korte pari $set ar maddome.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") }, // kake updte korbo
  { $set: { age: 36 } } // kon kon field ke update korbo and $set primitive data ok but non-primitive data entrily replace korte chile use korbo.
);

// $AddToSet --> array ar modde value set kore dibe but it not add to duplicate value and only ata value set korte parbo.
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $addToSet: { interests: "Playing" } } // notun notun value add korsi array ar modde
);

// in this way amra array ar modde notunvabe aro akta array add korte parbo
db.data.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $addToSet: { interests: ["Driving, Drinking"] } }
);
