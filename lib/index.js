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
			throw new TypeError( 'mean()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			divSumLog = 0,
			gmean,
			negFl = false,
			zeroFl = false;

		for ( var i = 0; i < len; i++ ) {

			if (arr[i] > 0) {
				divSumLog += Math.log( arr[i] ) / len;
			}
			else if (arr[i] === 0) {
				zeroFl = true;
				break;
			}
			else {
				negFl = true;
				break;
			}
		}

		if (zeroFl) { 
			gmean = 0;
		}
		if (negFl) {
			gmean = NaN;
		}
		if (!negFl && !zeroFl) {
			gmean = Math.pow(Math.E, divSumLog);
		}

		return gmean;
	} // end FUNCTION gmean()


	// EXPORTS //

	module.exports = gmean;

})();