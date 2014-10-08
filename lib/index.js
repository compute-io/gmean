/**
*
*	COMPUTE: gmean
*
*
*	DESCRIPTION:
*		- Computes the geometric mean over an array of values.
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
*	Copyright (c) 2014. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// GMEAN //

	/**
	* FUNCTION: gmean( arr )
	*	Computes the geometric mean over an array of values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} gmean value
	*/
	function gmean( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'gmean()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			sum = 0,
			val;

		for ( var i = 0; i < len; i++ ) {
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

})();