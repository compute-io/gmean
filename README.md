Geometric Mean
=====
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean).

The [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) is defined as

<div class="equation" align="center" data-raw-text="G = \left(\prod_{i=0}^{N-1} x_i\right)^{1/N}" data-equation="eq:geometric_mean">
	<img src="https://cdn.rawgit.com/compute-io/gmean/3ec3ab46db1ae39b3049c22e9e3d533bb2067d85/docs/img/eqn1.svg" alt="Equation for the geometric mean.">
	<br>
</div>

where `x_0, x_1,...,x_{N-1}` are individual data values and `N` is the total number of values in the data set.

## Installation

``` bash
$ npm install compute-gmean
```

## Usage

``` javascript
var gmean = require( 'compute-gmean' );
```

#### gmean( x[, opts] )

Computes the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean).  `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, mu;

data = [ 1, 5, 2, 3, 7 ];
mu = gmean( data );
// returns ~2.914

data = new Int8Array( data );
mu = gmean( data );
// returns ~2.914
```

Notes:

1. Only calculate the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) of an `array` of __positive__ numbers. The textbook formula for calculating the geometric mean involves taking the product of all `array` elements. If one element is `0`, then the product is `0`, even if all other values are `>>> 0`, yielding a nonsensical geometric mean (and measure of the central tendency). Nonsensical results also arise when an `array` contains negative values leading to a product without positive roots and a geometric mean which does not map to the measure's geometric interpretation. For more information, see *Handbook of Parametric and Nonparametric Statistical Procedures: Third Edition* by David J. Sheskin.
2. If an `array` contains values less than or equal to `0`, the function returns `NaN`.
3. For arrays exceeding memory constraints, you are encouraged to use streams; see [flow-gmean](https://github.com/flow-io/flow-gmean).

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':1},
	{'x':5},
	{'x':2},
	{'x':3},
	{'x':7}
];

function getValue( d, i ) {
	return d.x;
}

var mu = gmean( data, {
	'accessor': getValue
});
// returns ~2.194
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	mu,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

mu = gmean( mat );
/*
	[  NaN
	   6.853
	  11.916
	  16.941
	  21.954 ]
*/
```

To compute the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) along the rows, set the `dim` option to `1`.

``` javascript
mu = gmean( mat, {
	'dim': 1
});
/*
	[ NaN, 7.399, 9.112, 10.525, 11.811 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
mu = gmean( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 0, 7, 9, 10, 11 ]
*/

var dtype = mu.dtype;
// returns 'uint8'
```

Note: `NaN` will be coerced to `0` for [`typed arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) of type integer. Only typed arrays of type `float64` and `float32` can hold `NaN` values.

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 1, 5, 2, 3, 7 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,5], 'int8' );
mu = gmean( mat );
// returns ~2.194

// Column vector:
mat = matrix( new Int8Array( data ), [5,1], 'int8' );
mu = gmean( mat );
// returns ~2.194
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
mu = gmean( [] );
// returns null

mu = gmean( new Int8Array( [] ) );
// returns null

mu = gmean( matrix( [0,0] ) );
// returns null

mu = gmean( matrix( [0,10] ) );
// returns null

mu = gmean( matrix( [10,0] ) );
// returns null
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	gmean = require( 'compute-gmean' );

var data,
	mat,
	mu,
	i;

// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = gmean( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = { 'x': data[ i ] };
}
mu = gmean( data, {
	'accessor': getValue
});

// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = gmean( data );

// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
mu = gmean( mat, {
	'dim': 1
});

// Matrices (along columns)...
mu = gmean( mat, {
	'dim': 2
});

// Matrices (custom output data type)...
mu = gmean( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).

## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-gmean.svg
[npm-url]: https://npmjs.org/package/compute-gmean

[travis-image]: http://img.shields.io/travis/compute-io/gmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/gmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/gmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/gmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/gmean.svg
[dependencies-url]: https://david-dm.org/compute-io/gmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/gmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/gmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/gmean.svg
[github-issues-url]: https://github.com/compute-io/gmean/issues
