#!/usr/bin/env node
"use strict";
const meow = require("meow");
const html2react = require(".");

const cli = meow(`
	Usage
	  $ html2react [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ html2react
	  unicorns & rainbows
	  $ html2react ponies
	  ponies & rainbows
`);

console.log(html2react(cli.input[0] || "unicorns"));
