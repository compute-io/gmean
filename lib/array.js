'use strict';

/**
* FUNCTION: gmean( arr )
*	Computes the geometric mean of a numeric array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number|Null} geometric mean or null
*/
function gmean( arr ) {
	var len = arr.length,
		sum = 0,
		val,
		i;

	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		val = arr[ i ];
		if ( val <= 0 ) {
			return NaN;
		}
		sum += Math.log( val ) / len;
	}
	return Math.exp( sum );
} // end FUNCTION gmean()


// EXPORTS //

module.exports = gmean;
