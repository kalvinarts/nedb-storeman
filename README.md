nedb-storeman
=============

nedb-storeman is a simple manager to work with multiple [nedb](https://github.com/louischatriot/nedb) DataStores in the same directory

Usage
-----

```javascript
var StoreMan = require('nedb-storeman')

var db = new StoreMan('/path/to/stores/directory')

// Creating/Loading a DataStore
db.load('articles')

// Creating an in-memory DataStore
db.load('tempStuff', true)

// Usign your DataStores
db.articles.find({author: 'kalvinarts'}, function (err, docs) {
	if (err)
		console.log('ouuuch!')
	else
		console.log(docs)
})
```
