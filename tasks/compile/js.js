'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )

const fs = require( 'fs' )
const path = require( 'path' )
const browserify = require( 'browserify' )
const babelify = require( 'babelify' )

let input = './src/scripts/index.js'
let output = './build/scripts/app.js'

var mkdir = function ( dist ) {
  dist = path.resolve( dist )
  if ( !fs.existsSync( dist ) ) {
    mkdir( path.dirname( dist ) )
    fs.mkdirSync( dist )
  }
}

sprockets.add( 'js', ( done ) => {
  browserify( input, { debug: true } )
        .transform( babelify )
        .bundle()
        .on( 'error', function ( err ) { console.error( err ); this.emit( 'end' ) } )
        .pipe( fs.createWriteStream( mkdir( output ) ) )
        .on( 'end', function ( err ) {
          if ( err ) {
            throw err
          }
          done()
        } )
} )
