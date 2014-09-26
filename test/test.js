
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

	it( 'should compute the geometric mean', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 3.52547;

		assert.closeTo( gmean( data ), expected, 0.0001 );
	});

		it( 'should handle values of 0', function test() {
		var data, expected;

		data = [ 2, 4, 0, 3, 8, 2 ];
		expected = 0;

		assert.strictEqual( gmean( data ), expected );
	});

		it( 'should return NaN when array comtains a negative value', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, -8, 2 ];
		expected = NaN;

		assert.notStrictEqual( gmean( data ), expected );
	});

});