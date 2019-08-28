"use-strict";
const {
	assoc,
	omit,
	filter,
	join,
	defaultTo,
	isEmpty,
	prop
} = require("ramda");

const extract = (cls, classes) =>
	defaultTo("", classes.split(" ").find(x => x.includes(cls))).replace(cls, "");
const notEmpty = value => !isEmpty(value);
const filterEmptyProp = filter(notEmpty);
const renameProp = (oldProp, newProp, obj) =>
	assoc(newProp, prop(oldProp, obj), omit([oldProp], obj));
const rules = [
	{
		is: e => e.name === "div" && e.attributes && e.attributes.class,
		build: e => ({
			type: "element",
			name: "div",
			elements: e.elements || [],
			attributes: renameProp("class", "className", e.attributes)
		})
	},
	{
		is: e =>
			e.name === "div" &&
			e.attributes &&
			e.attributes.className &&
			e.attributes.className.includes("container"),
		build: e => ({
			type: "element",
			name: "Container",
			elements: e.elements || [],
			attributes: filterEmptyProp({
				className: join(
					" ",
					filter(
						x => !x.includes("container"),
						e.attributes.className.split(" ")
					)
				)
			})
		})
	},
	{
		is: e =>
			e.name === "div" &&
			e.attributes &&
			e.attributes.className &&
			e.attributes.className.includes("row"),
		build: e => {
			const attributes = join(
				" ",
				filter(x => !x.includes("row"), e.attributes.className.split(" "))
			);
			return {
				type: "element",
				name: "Row",
				elements: e.elements || [],
				attributes:
					attributes.length > 0
						? assoc(
								"className",
								join(attributes),
								omit(["className"], e.attributes)
						  )
						: omit(["className"], e.attributes)
			};
		}
	},
	{
		is: e =>
			e.name === "div" &&
			e.attributes &&
			e.attributes.className &&
			e.attributes.className.includes("col-"),
		build: e => ({
			type: "element",
			name: "Col",
			elements: e.elements || [],
			attributes: filterEmptyProp({
				className: join(
					" ",
					filter(x => !x.includes("col-"), e.attributes.className.split(" "))
				),
				md: extract("col-md-", e.attributes.className),
				sm: extract("col-sm-", e.attributes.className),
				xs: extract("col-xs-", e.attributes.className),
				lg: extract("col-lg-", e.attributes.className)
			})
		})
	}
];

module.exports = rules;
