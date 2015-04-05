/**
*
*	COMPUTE: gmean
*
*
*	DESCRIPTION:
*		- Computes the geometric mean of an array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014-2015. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' );


// GEOMETRIC MEAN //

/**
* FUNCTION: gmean( arr[, accessor ] )
*	Computes the geometric mean of an array.
*
* @param {Array} arr - input array
* @param {Function} [accessor] - accessor function for accessing numeric array values
* @returns {Number|null} geometric mean
*/
function gmean( arr, clbk ) {
	if ( !isArray( arr ) ) {
		throw new TypeError( 'gmean()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 && !isFunction( clbk ) ) {
		throw new TypeError( 'gmean()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
	}
	var len = arr.length,
		sum = 0,
		val,
		i;

	if ( !len ) {
		return null;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			val = clbk( arr[ i ] );
			if ( val <= 0 ) {
				return NaN;
			}
			sum += Math.log( val ) / len;
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			val = arr[ i ];
			if ( val <= 0 ) {
				return NaN;
			}
			sum += Math.log( val ) / len;
		}
	}
	return Math.exp( sum );
} // end FUNCTION gmean()


// EXPORTS //

module.exports = gmean;
