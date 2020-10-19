ESLint-plugin-React
===================


Alloy specific linting rules for ESLint

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
$ npm install eslint --save-dev
```

If you installed `ESLint` globally, you have to install Alloy plugin globally too. Otherwise, install it locally.

```sh
$ npm install eslint-plugin-alloy --save-dev
```


Add "alloy" to the plugins section.

```json
{
  "plugins": [
    "alloy"
  ]
}
```

Enable the rules that you would like to use.

```json
  "rules": {
    "alloy/no-unused-vars": "error",
  }
```

# List of supported rules

* [alloy/no-unused-vars](docs/rules/no-unused-vars.md): Extension of the built in [no-unused-vars](https://github.com/eslint/eslint/blob/master/docs/rules/no-unused-vars.md) that also looks up functions used in view files.



## License

This project is open source and provided under the Apache Public License (version 2). Please make
sure you see the LICENSE file included in this distribution for more details on the license. Also,
please take notice of the privacy notice at the end of the file.

(C) Copyright 2017-2018, [Axway, Inc](http://www.axway.com) All Rights Reserved.