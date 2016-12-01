'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )
const mkdir = require( __dirname + '/../../utils/mkdir' )

const fs = require( 'fs' )
const browserify = require( 'browserify' )
const babelify = require( 'babelify' )
const uglify = require( 'uglify-js' )

let input = './src/scripts/index.js'
let output = './build/scripts/app.js'

sprockets.add( 'js', ( done ) => {
  mkdir( output )
  const chunks = []
  browserify( input )
    .transform( babelify, { presets: [ 'es2015' ] } )
    .bundle()
    .on( 'error', function ( e ) { console.error( e ); this.emit( 'end' ) } )
    .on( 'data', ( chunk ) => {
      chunks.push( chunk.toString() )
    } )
    .on( 'end', function () {
      var code = uglify.minify( chunks.join( '' ), { fromString: true } ).code
      fs.writeFile( output, code, function ( err ) {
        done( err )
      } )
    } )
} )
