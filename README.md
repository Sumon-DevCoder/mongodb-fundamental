## Introduction

MongoDB is a leading open-source document-oriented NoSQL database management system. It provides a flexible and scalable solution for storing and managing data. > google, facebook, eBay etc.

> > noSQL = not only SQL and non-relational databases --> real-time-data-processing, high perfomance, flexible data model, Flexible, schemaless. its not following traditional database.

Scalability- ওয়েব অ্যাপ্লিকেশনের ক্ষেত্রে, স্কেলেবিলিটি নিশ্চিত করে যে অ্যাপ্লিকেশনটি বেশি সংখ্যক ব্যবহারকারী এবং ডেটা ম্যানেজ করতে পারবে।
Flexibility - user এর need এবং condition অনুযায়ী website adapt করতে পারে

# Why MongoDB ?

- scalable hight perfomance and open source.
- document oriented database
- cost-Effective solution.
- rich ecosystem of Tools, Documentation and Community.

# MongoDB vs Traditional Database

- **Data Model**:

  - MongoDB: Document-oriented data model with flexible schemas.
  - Traditional Database: Relational data model with fixed schemas.

- **Query Language**:

  - MongoDB: Query language similar to JSON with support for rich query expressions.
  - Traditional Database: SQL (Structured Query Language) for querying relational data.

- **Scalability**:

  - MongoDB: Designed for horizontal scalability across multiple servers or nodes.
  - Traditional Database: Often scaled vertically by adding more resources to a single server.

- **Flexibility**:

  - MongoDB: Schema-flexible or schema-less, allowing for dynamic changes in data structure.
  - Traditional Database: Schema-driven, requiring predefined schemas for data storage.

- **Performance**:
  - MongoDB: Optimized for high-performance read and write operations, especially for unstructured data.
  - Traditional Database: Offers predictable performance for transactional workloads with ACID properties.

## Use Cases

- MongoDB:

  - Well-suited for applications with flexible data models, rapid development cycles, and scalability requirements.
  - Use cases include content management systems, real-time analytics, and IoT platforms.

- Traditional Database:
  - Suitable for applications with structured data, complex transactions, and strong data consistency requirements.
  - Use cases include financial systems, ERP systems, and CRM applications.

## Scalability

- MongoDB:
  - Horizontally scalable, distributing data across multiple servers or nodes to handle growing data volumes and traffic.
- Traditional Database:
  - Often scaled vertically by adding more resources (CPU, memory) to a single server.

## Flexibility

- MongoDB:
  - Schema-flexible or schema-less, allowing for dynamic changes in data structure without requiring schema migrations.
- Traditional Database:
  - Schema-driven, requiring predefined schemas for data storage. Changes to the schema may require alterations to the database structure.

## Performance

- MongoDB:
  - Optimized for high-performance read and write operations, especially for unstructured data.
- Traditional Database:
  - Offers predictable performance for transactional workloads with ACID properties.

## Data Model

- MongoDB:

  - Document-oriented data model storing data in flexible, JSON-like documents.

- Traditional Database:
  - Relational data model organizing data into tables with predefined schemas consisting of rows and columns.

## Query Language

- MongoDB:

  - Uses a query language similar to JSON with support for rich query expressions and operators.

- Traditional Database:
  - Uses SQL (Structured Query Language) for querying relational data.

## Community and Support

- MongoDB:

  - Active community and strong support from MongoDB Inc. with regular updates, documentation, and online resources.

- Traditional Database:

  - Established community and support from various vendors with extensive documentation and resources.

  ## MongoDB Features

  - JSON Like Documents (BSON)
  - indexing
  - Aggregate Framework
  - Security Featured
  - free atlas database
  - Mongodb Compass (GUI)

## Where MongoDB is good choice

- E-commerce website
- social media website
- gaming application
- web application
- mobile application
- real-time application

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
--> db.createCollection("name")
--> use <database-name> --> for create database
--> db.dropDatabase() --> for delete databse
--> db.<collection-name>.drop() --> for delete collection

# mongosh -> clear -> showdbs

# insert document in mongodb

--> db.getCollection("name").insertOne({data}) --> to create single document
--> db.getCollection("name").insertMany([{data}]) --> to create multiple document
---> db.getCollection("name").findOne() ---> to show collection document.
---> db.getCollection("name").findOne({gender: "Male}, {gender: 1}) ---> field ke filtering korte parbo -> here is 1 mean true.
---> db.getCollection("name").find({gender: "Male}, {gender: 1, name:1}) ---> field ke filtering korte parbo -> here is 1 mean true.
---> db.getCollection("name").find({gender: "Male}).project({name: 1, gender: 1, email: 1}) ---> field filter and only find() kaj kore

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

db.data.find({gender:"Female",age: {$gt: 18,$lte:30}}, {age: 1, name: 1, gender: 1}).sort({age:1}) > comma ke bole empicit and;

db.data.find({gender:"Female",age: {$in:[18, 20, 22, 24, 26]}, interests:{$in:["Cooking", "Reading"]}}, {age: 1, name: 1, gender: 1, interests:1}).sort({age:1})

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
