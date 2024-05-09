# MongoDB Guide

## Introduction

MongoDB is a leading open-source document-oriented NoSQL database management system. It provides a flexible and scalable solution for storing and managing data.

### Types of Databases

1. **SQL Database**:

   - Uses Structured Query Language (SQL) and follows a relational database model.
   - Examples: MySQL, PostgreSQL, Oracle, Microsoft SQL, etc.

2. **NoSQL Database**:
   - Non-relational databases that store and access data differently, often without rows and columns.
   - Examples: MongoDB, Redis, RavenDB, CouchDB, etc.

# Manging database and collection --> we can create database or collection and check databse, delete db or collection

--> show dbs / show databases
--> show collection
--> db.createCollection
--> use <database-name> --> for create database
--> db.dropDatabase() --> for delete databse
--> db.<collection-name>.drop() --> for delete collection

# mongosh -> clear -> showdbs

# insert document in mongodb

--> db.<collection-name>.insertOne({data}) --> to create single document
--> db.<collection-name>.insertMany([{data}]) --> to create multiple document
---> db.<collection-name>.find() ---> to show collection document.

### Comprison Operator

#### comparison operators are used to compare values in documents.

$eq: Matches values that are equal to a specified value.
$ne: Matches all values that are not equal to a specified value.
$gt: Matches values that are greater than a specified value.
$gte: Matches values that are greater than or equal to a specified value.
$lt: Matches values that are less than a specified value.
$lte: Matches values that are less than or equal to a specified value.
$in: Matches any of the values specified in an array.
$nin: Matches none of the values specified in an array.

for example :
db.collectionName.find({'filename': ${operator: value}})
db.produtcts.find({'price': ${$eq: 600}})
db.category.find({'price': ${$in:[100, 300, 700]}})

### Cursor Methods

count()
sort()
limit()
skip()

for example :
db.collectionName.find({'filename': ${operator: value}}).method()
db.produtcts.find({'price': ${$gt: 256}}).count() &rarr this mean how much document have this query
db.prods.find({'price': ${$gt: 256}}).limit(10).skip(5) &rarr Limit the number of documents returned by the cursor and skip 5 document
db.category.find({'price': ${$gt:100}}).sort({price: 1}) &rarr sort(1) means assending and sort(-1) means desacending

### Logical Operator

$and: Joins query clauses with a logical AND.
$or: Joins query clauses with a logical OR.
$not: Inverts the effect of a query expression.
$nor: Joins query clauses with a logical NOR.

{$and: {[condition1, condition2]}, ...}

### Complex Expresssion

1. The $expr operator allow using aggregation expression within a query

2. useful when you need to compare to field from the same document in a more complex manner.

Syntax:: {$expr: {operator: [field, value]} }
         db.products.find({$expr:{$gt:['$price', 22]}})

### Element Operator

$exists
$type
$size

example:

```
db.users.find({ phone: { $exists: true } });
db.products.find({ price: { $type: "double" } })
db.comments.find({ tags: { $size: 3 } });

```

### Projection

db.collecion.find({}, {field1: 1, field2: 2})

- to include specific field, use projection with value 1 for the field you want.
- to exclude field, use projection with value of 0 for the field you want to exclude.
- you cannot include exclude field simultaneously in the same question projection.

### Embedded Documents

- query document inside embedded document using dot notation.
  db.collection.find({"parent.child": value})
