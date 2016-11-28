'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )

sprockets.add( 'watch', () => {
  sprockets.watch( './src/scripts', 'js' )
  sprockets.watch( './src/styles', 'scss' )
  sprockets.watch( './src/index.html', 'index' )
  return true
} )

sprockets.add( 'build-test', function ( done ) {
  sprockets.runSync(
        'index',
        'js',
        'scss',
        'watch',
        'webserver-dev'
    ).then( () => { done() } )
} )
