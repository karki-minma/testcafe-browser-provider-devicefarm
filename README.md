# testcafe-browser-provider-devicefarm
[![Build Status](https://travis-ci.org/sushantkarki/testcafe-browser-provider-devicefarm.svg)](https://travis-ci.org/sushantkarki/testcafe-browser-provider-devicefarm)

This is the **devicefarm** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-browser-provider-devicefarm
```

## Usage


You can determine the available browser aliases by running
```
testcafe -b devicefarm
```

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe devicefarm:browser1 'path/to/test/file.js'
```


When you use API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('devicefarm:browser1')
    .run();
```

## Author
Sushant Karki 
