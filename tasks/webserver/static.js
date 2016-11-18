'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )
const Apigeon = require( 'apigeon' )

sprockets.add( 'webserver-dev', ( done ) => {
  var regexFile = new RegExp( '^(.*)$', 'i' )

  // Define server
  var apigeon = new Apigeon( {
    paths: {
      routes: __dirname + '/routes'
    },
    rewrite: function ( url ) {
      var results

      results = url.match( regexFile )
      if ( results ) {
        var file = ( results[ 1 ] === '' || results[ 1 ] === '/' ) ? 'index.html' : results[ 1 ]
        return '/?path=' + encodeURIComponent( file )
      }

      return url
    }
  } )

  apigeon.enableREST()
  apigeon.start( 8080, function () {
    console.log( ' - dev server started' )
    done()
  } )
} )
