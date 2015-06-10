/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	gmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-gmean', function tests() {

	it( 'should export a function', function test() {
		expect( gmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
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

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				gmean( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				gmean( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the geometric mean', function test() {
		var data, expected, prod, len;

		data = [ 2, 4, 5, 3, 8, 2 ];

		prod = 1;
		len = data.length;
		for ( var i = 0; i < len; i++ ) {
			prod *= data[ i ];
		}
		expected = Math.pow( prod, 1/len );

		assert.closeTo( gmean( data ), expected, 1e-7 );
	});

	it( 'should compute the geometric mean of a typed array', function test() {
		var data, expected, prod, len;

		data = new Int8Array( [ 2, 4, 5, 3, 8, 2 ] );

		prod = 1;
		len = data.length;
		for ( var i = 0; i < len; i++ ) {
			prod *= data[ i ];
		}
		expected = Math.pow( prod, 1/len );

		assert.closeTo( gmean( data ), expected, 1e-7 );
	});

	it( 'should compute the geometric mean using an accessor function', function test() {
		var data, expected, actual, prod, len;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		actual = gmean( data, {
			'accessor': getValue
		});

		prod = 1;
		len = data.length;
		for ( var i = 0; i < len; i++ ) {
			prod *= getValue( data[ i ] );
		}
		expected = Math.pow( prod, 1/len );

		assert.closeTo( actual, expected, 1e-7 );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the geometric mean along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			mu,
			i;

		data = new Int8Array( 25 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [5,5], 'int8' );

		// Default:
		mu = gmean( mat, {
			'dtype': 'int8'
		});
		expected = '0;6;11;16;21';

		assert.strictEqual( mu.toString(), expected, 'default' );

		// Along columns:
		mu = gmean( mat, {
			'dim': 2,
			'dtype': 'int8'
		});
		expected = '0;6;11;16;21';

		assert.strictEqual( mu.toString(), expected, 'dim: 2' );

		// Along rows:
		mu = gmean( mat, {
			'dim': 1,
			'dtype': 'int8'
		});
		expected = '0,7,9,10,11';

		assert.strictEqual( mu.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the geometric mean of 1d matrices (vectors)', function test() {
		var data, mat, prod, len, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];

		prod = 1;
		len = data.length;
		for ( var i = 0; i < len; i++ ) {
			prod *= data[ i ];
		}
		expected = Math.pow( prod, 1/len );

		// Row vector:
		mat = matrix( data, [1,6], 'int8' );
		assert.closeTo( gmean( mat ), expected, 1e-7 );

		// Column vector:
		mat = matrix( data, [6,1], 'int8' );
		assert.closeTo( gmean( mat ), expected, 1e-7 );
	});

});
