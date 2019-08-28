import test from 'ava';
import {transform, convert, rules} from '.';

test('transform div with class row to Row', t => {
	const input = '<div class="row"></div>';
	const expected = '<Row/>';
	t.is(convert(input), expected);
});

test('transform span', t => {
	const input = '<span class="test" />';
	const expected = '<span className="test"/>';
	t.is(convert(input), expected);
});

test('transform div with class row to Row and div with col to Col', t => {
	const input = `<div class="row">
	<div class="col-md-6 col-sm-12 col-xs-12 col-lg-6 other-class">
		<span>this is a test</span>
	</div>
</div>`;
	const expected = '<Row><Col className="other-class" md="6" sm="12" xs="12" lg="6"><span>this is a test</span></Col></Row>';
	t.is(convert(input, false), expected);
});

test('tranform div to Row with className', t => {
	const input = '<div class="row teste" />';
	const expected = '<Row className="teste"/>';
	t.is(convert(input, false), expected);
});

test('crawle object and parse value', t => {
	const input = {
		type: 'element',
		name: 'div',
		attributes: {
			class: 'row'
		}
	};

	const expected = {
		attributes: {},
		elements: [],
		type: 'element',
		name: 'Row'
	};

	t.deepEqual(transform(rules, input), expected);
});

test('transform div row and div col to Row and Col', t => {
	const input = {
		type: 'element',
		name: 'div',
		attributes: {
			class: 'row'
		},
		elements: [
			{
				type: 'element',
				name: 'div',
				attributes: {
					class: 'col-md-6'
				}
			}
		]
	};

	const expected = {
		attributes: {},
		type: 'element',
		name: 'Row',
		elements: [
			{
				elements: [],
				type: 'element',
				name: 'Col',
				attributes: {
					md: '6'
				}
			}
		]
	};

	t.deepEqual(transform(rules, input), expected);
});
