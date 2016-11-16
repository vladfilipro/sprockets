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
  browserify( input, { debug: true } )
        .transform( babelify )
        .bundle()
        .on( 'error', function ( ) { this.emit( 'end' ) } )
        .on( 'end', done )
        .pipe( function ( stream ) {
          const chunks = []
          stream.on( 'data', ( chunk ) => {
            chunks.push( chunk.toString() )
          } )
          stream.on( 'end', () => {
            var code = uglify.parse( chunks.join( '' ) )
            fs.writeFile( output, code, function ( err ) {
              done( err )
            } )
          } )
        } )
} )
