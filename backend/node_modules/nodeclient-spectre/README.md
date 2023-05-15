# node client for Spectre
A node.js client to connect to the web application [Spectre](https://github.com/wearefriday/spectre).

## Installation
> Install via npm as usual
```bash
$ npm install nodeclient-spectre --save
```

## Usage Example

```js
const fs = require('fs');
const path = require('path');

const SpectreClient = require('nodeclient-spectre');

const spectreUrl = 'http://localhost:3000';

// read binary data
const bitmap1 = fs.readFileSync(path.join(__dirname, 'img/img1.png'));
// convert binary data to base64 encoded string
const screenshot1Base64 = new Buffer(bitmap1).toString('base64');

// read binary data
const bitmap2 = fs.readFileSync(path.join(__dirname, 'img/img2.png'));
// convert binary data to base64 encoded string
const screenshot2Base64 = new Buffer(bitmap2).toString('base64');

const spectreClientInstance = new SpectreClient(spectreUrl);

Promise
    .resolve()
    .then(() => {
        return spectreClientInstance.createTestrun("Projekt", "Suite");
    })
    .then((result) => {
        return spectreClientInstance.submitScreenshot("Testimage", "Testbrowser", 480, screenshot1Base64, result.id)
    })
    .then(() => {
        return spectreClientInstance.createTestrun("Projekt", "Suite");
    })
    .then((result) => {
        return spectreClientInstance.submitScreenshot("Testimage", "Testbrowser", 480, screenshot2Base64, result.id)
    });
```
