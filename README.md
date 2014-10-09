Geometric Mean
=====
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the geometric mean over an array of values.


## Installation

``` bash
$ npm install compute-gmean
```

## Usage

To use the module,

``` javascript
var gmean = require( 'compute-gmean' );
```

#### gmean( arr )

Computes the geometric mean over an `array`.

``` javascript
var data = [ 1, 5, 2, 3, 7 ];

var mu = gmean( data );
// returns ~2.914
```

Note: only calculate the geometric mean over an `array` of __positive__ numbers. The textbook formula for calculating the geometric mean involves taking the product of all `array` elements. If one element is `0`, then the product is `0`, even if all other values are `>>> 0`, yielding a nonsensical geometric mean (and measure of the central tendency). Nonsensical results also arise when an `array` contains negative values leading to a product without positive roots and a geometric mean which does not map to the measure's geometric interpretation. For more information, see *Handbook of Parametric and Nonparametric Statistical Procedures: Third Edition* by David J. Sheskin.

If an `array` contains values less than or equal to `0`, the function returns `NaN`.


## Examples

``` javascript
var gmean = require( 'compute-gmean' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

console.log( gmean( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Notes

For arrays exceeding memory constraints, you are encouraged to use streams; see [flow-gmean](https://github.com/flow-io/flow-gmean).


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Rebekah Smith.



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