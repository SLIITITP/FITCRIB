# node-pickle
Convert between JSON object and python pickled object. It reads/wrie python pickled objects to Javascript objects using promise.
This package is based on [mattrobenolt](https://github.com/mattrobenolt)'s [node_pickle](https://github.com/mattrobenolt/node_pickle).

The functions are both promise based.

### Usage
```
const nodePickle = require('node-pickle');

// Convert pickled object to JSON object
nodePickle.load(pickledData)
.then(data => ({
// data is a JSON object here
})

// Convert JSON object to pickled object
nodePickle.dump(jsonData)
.then(data => ({
// data is a pickled object here
})
```
