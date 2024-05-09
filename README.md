Database --> 1.SQL Database : Structured query language and relational database system we can store data with row and column.
_ type of NoSQL Database : MySQL, PostgreSQL, Oracle, Microsoft SQL etc.
2.NoSQL Database: non relational database where we can data store and access and it work without row and colums.
_ type of NoSQL Database : MongoDB, Redis, RavenDB, CouchDB etc.

# What is MongoDB ?

Ans: is a open source document oriented no-sql database management system, cross-platform, and leading NoSQL Database, MongoDB is written C++

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
