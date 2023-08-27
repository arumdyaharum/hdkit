# Human Design Kit (hdkit)

Welcome to human design kit. This package will generate human design data such as defined gates of each planets, defined centers, channels, and variables. This package is for you who have want to use open source human design resources and have passion in technology and human design.

> North node and south node is still an experimental code. Both gates and its variables data might be wrong. You can contribute your solution to this issue.

## How to use this

### 1. Install package

for now you can download manually and link the package to your project. Run this command from the package

```npm link```

then run this command to your project

```npm link hdkit```

### 2. Setup the project

This package use ES6 Modules with .js extension. if you have trouble with this, add ```"type": "module"``` to your package.json

### 3. Use the package

Import the package

```import hdkit from "hdkit"```

call the function

```js
const UTCDate = "2023-07-16T00:00:00Z";
const option = {
  raw: true,
  centers: false,
  channels: false,
  gates: false,
  variables: false,
  basic: false,
}; // default value

hdkit(new Date(UTCDate), option);
```
