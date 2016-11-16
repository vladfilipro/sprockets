'use strict'

let path = require( 'path' )
let fs = require( 'fs' )

function mkdir ( dist ) {
  dist = path.resolve( dist )
  if ( !fs.existsSync( dist ) ) {
    mkdir( path.dirname( dist ) )
    fs.mkdirSync( dist )
  }
}

module.exports = function ( dist ) {
  mkdir( path.dirname( dist ) )
}
