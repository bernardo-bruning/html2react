'use-strict';
const matcher = require('matcher');
const {
	assoc,
	filter,
	join,
	defaultTo,
	isEmpty,
	prop,
	reject,
	any,
	map,
	split,
	pipe,
	curry,
	uncurryN,
	hasPath,
	omit
} = require('ramda');

const extract = (cls, classes) => defaultTo('', classes.split(' ').find(x => x.includes(cls))).replace(cls, '');
const notEmpty = value => !isEmpty(value);
const filterEmptyProp = filter(notEmpty);
const removeItem = (item, list) => reject(match(item), list);
const removeItens = curry((itens, list) => map(x => removeItem(x, list), itens));
const curriedSkipClass = classesSkipped => pipe(split(' '), removeItens(classesSkipped), join(' '));
const skipClass = uncurryN(2, curriedSkipClass);
const match = curry((pattern, value) => matcher.isMatch(value, pattern));
const renameProp = (oldProp, newProp, obj) => assoc(newProp, prop(oldProp, obj), omit([oldProp], obj));
const anyClass = (pattern, values) => any(match(pattern))(split(' ', values));
const hasProps = (path, obj) => hasPath(split('.', path), obj);
const rules = [
	{
		is: e => hasProps('attributes.class', e),
		build: e => Object.assign(e, {attributes: renameProp('class', 'className', e.attributes)})
	},
	{
		is: e => e.name === 'div' && e.attributes && e.attributes.className && e.attributes.className.includes('container'),
		build: e => (
			{
				type: 'element',
				name: 'Container',
				elements: e.elements || [],
				attributes: filterEmptyProp({
					className: join(' ', filter(x => !x.includes('container'), e.attributes.className.split(' ')))
				})
			})
	},
	{
		is: e => e.name === 'div' && e.attributes && e.attributes.className && anyClass('row', e.attributes.className),
		build: e => {
			return {
				type: 'element',
				name: 'Row',
				elements: e.elements || [],
				attributes: filterEmptyProp({
					className: skipClass(['row'])(e.attributes.className)
				})
			};
		}
	},
	{
		is: e => e.name === 'div' && e.attributes && e.attributes.className && anyClass('col-*', e.attributes.className),
		build: e => (
			{
				type: 'element',
				name: 'Col',
				elements: e.elements || [],
				attributes: filterEmptyProp({
					className: join(' ', filter(x => !x.includes('col-'), e.attributes.className.split(' '))),
					md: extract('col-md-', e.attributes.className),
					sm: extract('col-sm-', e.attributes.className),
					xs: extract('col-xs-', e.attributes.className),
					lg: extract('col-lg-', e.attributes.className)
				})
			})
	}
];

module.exports = rules;
