
//	Equirectangular Texture Generator - Noise Functions
//
//	noise(x,y,z,scale)	- seeded 3D noise
//	noiseSeed( ) 		- reseeds the noise generator with timestamp
//	noiseSeed( seed )	- reseeds the noise generator with specific seed


import { MathUtils } from "three";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
import { prng_alea } from 'esm-seedrandom';

// create a new random function based on the seed
const aleaGenerator = prng_alea();

var PRNG =
{
	random: function ( x ) {
		return aleaGenerator();
	}
};


var simplex = new SimplexNoise( PRNG );


// seeded 3D noise
function noise( x, y, z, scale=1 ) {

	return simplex.noise3d( scale*x, scale*y, scale*z );

}


// reseeding the noise generator
function noiseSeed( seed ) {

		// create a new random function based on the seed
		const aleaGenerator2 = prng_alea(seed);

		var PRNG2 =
		{
			random: function ( x ) {
				return aleaGenerator2();
			}
		};

	simplex = new SimplexNoise( PRNG2 );

	return seed;

}

export
{
	noise,
	noiseSeed,
};
