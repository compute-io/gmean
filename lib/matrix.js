'use strict';

/**
* FUNCTION: gmean( out, mat[, dim] )
*	Computes the geometric mean along a matrix dimension.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute a geometric mean. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} geometric means or null
*/
function gmean( out, mat, dim ) {
	var sum,
		val,
		M, N,
		s0, s1,
		o,
		i, j, k;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		sum = 0;
		for ( j = 0; j < N; j++ ) {
			val = mat.data[ k + j*s1 ];
			if ( val <= 0 ) {
				sum = NaN; 
				break;
			}
			sum += Math.log( val ) / N;
		}
		out.data[ i ] = Math.exp( sum );
	}
	return out;
} // end FUNCTION gmean()


// EXPORTS //

module.exports = gmean;
