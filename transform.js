'use strict';
const {reduce, map} = require('ramda');

function transform(rules, data) {
	const element = reduce((c, r) => (r.is(c) ? r.build(c) : c), data, rules);
	if (element.elements && element.elements.length > 0) {
		element.elements = map(e => transform(rules, e), element.elements);
	}

	return element;
}

module.exports = transform;
