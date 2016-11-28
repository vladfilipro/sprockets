'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )
const Apigeon = require( 'apigeon' )

sprockets.add( 'webserver-dev', ( done ) => {
  const regexFile = new RegExp( '^(.*)$', 'i' )

  // Define server
  let apigeon = new Apigeon( {
    paths: {
      routes: __dirname + '/routes'
    },
    rewrite: function ( url ) {
      let results

      results = url.match( regexFile )
      if ( results ) {
        let file = ( results[ 1 ] === '' || results[ 1 ] === '/' ) ? '/index.html' : results[ 1 ]
        return '/?path=' + encodeURIComponent( file )
      }

      return url
    }
  } )

  apigeon.enableREST()
  apigeon.start( 8080, function () {
    console.log( ' -> dev server started' )
    done()
  } )
} )
