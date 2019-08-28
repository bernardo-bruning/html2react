# html2react [![Build Status](https://travis-ci.com/bernardo-bruning/html2react.svg?branch=master)](https://travis-ci.com/bernardo-bruning/html2react)

> My bedazzling module


## Install

```
$ npm install html2react
```


## Usage

```js
const html2react = require('html2react');

html2react('unicorns');
//=> 'unicorns & rainbows'
```


## API

### html2react(input, options?)

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `object`

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global html2react
```

```
$ html2react --help

  Usage
    html2react [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ html2react
    unicorns & rainbows
    $ html2react ponies
    ponies & rainbows
```
