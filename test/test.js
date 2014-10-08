
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	gmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-gmean', function tests() {
	'use strict';

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

	it( 'should throw an error if an array contains non-numeric values', function test() {
		var values = [
				'5',
				true,
				null,
				NaN,
				undefined,
				function(){},
				[],
				{}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				gmean( [value] );
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

	it( 'should return 0 if an input array contains a 0', function test() {
		var data, expected;

		data = [ 2, 4, 0, 3, 8, 2 ];
		expected = 0;

		assert.strictEqual( gmean( data ), expected );
	});

	it( 'should return NaN when an array contains an odd number', function test() {
		var data, mu;

		data = [ 2, 4, 5, 3, -8, 2 ];
		mu = gmean( data );

		// Check: mu === NaN
		assert.ok( typeof mu === 'number' && mu !== mu );
	});

});