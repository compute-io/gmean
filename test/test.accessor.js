/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate if a value is equal to NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	gmean = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor geometric mean', function tests() {

	it( 'should export a function', function test() {
		expect( gmean ).to.be.a( 'function' );
	});

	it( 'should compute the geometric mean using an accessor', function test() {
		var data, expected, prod, len;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		prod = 1;
		len = data.length;
		for ( var i = 0; i < len; i++ ) {
			prod *= getValue( data[ i ] );
		}
		expected = Math.pow( prod, 1/len );

		assert.closeTo( gmean( data, getValue ), expected, 1e-7 );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return NaN if an accessed array value is 0', function test() {
		var data, mu;

		data = [
			{'x':3},
			{'x':0},
			{'x':5}
		];

		mu = gmean( data, getValue );

		// Check: mu === NaN
		assert.isTrue( isnan( mu ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return NaN if an accessed array value is a negative number', function test() {
		var data, mu;

		data = [
			{'x':3},
			{'x':-4},
			{'x':5}
		];
		mu = gmean( data, getValue );

		// Check: mu === NaN
		assert.isTrue( isnan( mu ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( gmean( [], getValue ) );

		function getValue( d ) {
			return d.x;
		}
	});

});
