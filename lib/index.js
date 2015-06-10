'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );


// FUNCTIONS //

var gmean1 = require( './array.js' ),
	gmean2 = require( './accessor.js' ),
	gmean3 = require( './matrix.js' );


// GMEAN //

/**
* FUNCTION: gmean( x[, opts] )
*	Computes the geometric mean.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {Number} [opts.dim=2] - dimension along which to compute the geometric mean.
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Matrix|Null} geometric mean value(s) or null
*/
function gmean( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		shape,
		ctor,
		err,
		len,
		dim,
		dt,
		d,
		m;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		dt = opts.dtype || 'float64';
		dim = opts.dim;

		// Determine if provided a vector...
		if ( x.shape[ 0 ] === 1 || x.shape[ 1 ] === 1 ) {
			// Treat as an array-like object:
			return gmean1( x.data );
		}
		if ( dim > 2 ) {
			throw new RangeError( 'gmean()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( dim === void 0 || dim === 2 ) {
			len = x.shape[ 0 ];
			shape = [ len, 1 ];
		} else {
			len = x.shape[ 1 ];
			shape = [ 1, len ];
		}
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'gmean()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix and calculate the geometric means:
		d = new ctor( len );
		m = matrix( d, shape, dt );
		return gmean3( m, x, dim );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.accessor ) {
			return gmean2( x, opts.accessor );
		}
		return gmean1( x );
	}
	throw new TypeError( 'gmean()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION gmean()


// EXPORTS //

module.exports = gmean;
