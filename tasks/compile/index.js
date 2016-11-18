'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )
const mkdir = require( __dirname + '/../../utils/mkdir' )

const fs = require( 'fs' )

let input = './src/index.html'
let output = './build/index.html'

sprockets.add( 'index', ( done ) => {
  mkdir( output )
  fs.createReadStream( input )
    .on( 'end', function () {
      done()
    } )
    .pipe( fs.createWriteStream( output ) )
} )
