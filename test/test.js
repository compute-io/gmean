/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	gmean = require( './../lib' ),

	// Validate modules:
	isNaN = require( 'validate.io-nan' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-gmean', function tests() {

	it( 'should export a function', function test() {
		expect( gmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				gmean( value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				gmean( [1,2,3], value );
			};
		}
	});

	it( 'should compute the geometric mean', function test() {
		var data,
			prod,
			len,
			expected;

		data = [ 2, 4, 5, 3, 8, 2 ];

		prod = 1;
		len = data.length;
		for ( var i = 0; i < len; i++ ) {
			prod *= data[ i ];
		}
		expected = Math.pow( prod, 1/len );

		assert.closeTo( gmean( data ), expected, 0.0001 );
	});

	it( 'should compute the geometric mean using an accessor function', function test() {
		var data, expected;

		data = [
			{'x':3},
			{'x':4},
			{'x':5}
		];

		expected = Math.pow( 60, 1/3 );
		assert.closeTo( gmean( data, getValue ), expected, 0.0001 );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should return NaN if an input array contains a 0', function test() {
		var data, mu;

		data = [ 2, 4, 0, 3, 8, 2 ];
		mu = gmean( data );

		// Check: mu === NaN
		assert.isTrue( isNaN( mu) );
	});

	it( 'should return NaN when an array contains a negative number', function test() {
		var data, mu;

		data = [ 2, 4, 5, 3, -8, 2 ];
		mu = gmean( data );

		// Check: mu === NaN
		assert.isTrue( isNaN( mu) );
	});

	it( 'should return NaN if an input array contains a 0 and an accessor is used', function test() {
		var data, mu;

		data = [
			{'x':3},
			{'x':0},
			{'x':5}
		];

		mu = gmean( data, getValue );

		// Check: mu === NaN
		assert.isTrue( isNaN( mu) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return NaN when an array contains a negative number and an accessor is used', function test() {
		var data, mu;

		data = [
			{'x':3},
			{'x':-4},
			{'x':5}
		];
		mu = gmean( data, getValue );

		// Check: mu === NaN
		assert.isTrue( isNaN( mu) );

		function getValue( d ) {
			return d.x;
		}
	});

});