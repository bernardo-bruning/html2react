"use strict";
const convertXml = require("xml-js");
const transform = require("./transform");
const rules = require("./rules");

const convert = (data, options = { spaces: 0 }, argRules = rules) =>
	convertXml.js2xml(transform(argRules, convertXml.xml2js(data)), options);

module.exports = {
	rules,
	convert,
	transform
};
