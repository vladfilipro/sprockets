
var sprockets = require( __dirname + '/src/index.js' )

var fs = require( 'fs' )

var init = ( file ) => {
  fs.stat( file, function ( err ) {
    if ( err !== null ) {
      throw err
    }
    require( file )
  } )
}

var config = {
  filename: './sprockets.js'
}

var args = process.argv.slice( 2 )
args.forEach( ( val ) => {

} )

init( config.filename )
sprockets.get( config.task ).execute()
