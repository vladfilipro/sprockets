'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )

const fs = require( 'fs' )
const browserify = require( 'browserify' )
const babelify = require( 'babelify' )

let input = './src/scripts/index.js'
let output = './build/scripts/app.js'

sprockets.add( 'js', ( done ) => {
  browserify( input, { debug: true } )
        .transform( babelify )
        .bundle()
        .on( 'error', function ( err ) { console.error( err ); this.emit( 'end' ) } )
        .pipe( fs.createWriteStream( output ) )
        .on( 'end', done )
} )
