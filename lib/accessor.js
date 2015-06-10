'use strict';

/**
* FUNCTION: gmean( arr, clbk )
*	Computes the geometric mean of an array using an accessor function.
*
* @param {Array} arr - input array
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} geometric mean or null
*/
function gmean( arr, clbk ) {
	var len = arr.length,
		sum = 0,
		val,
		i;

	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		val = clbk( arr[ i ] );
		if ( val <= 0 ) {
			return NaN;
		}
		sum += Math.log( val ) / len;
	}
} // end FUNCTION gmean()


// EXPORTS //

module.exports = gmean;
