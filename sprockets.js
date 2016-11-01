
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
args.forEach( ( val, index ) => {
  if ( val === '-f' ) {
    config.filename = args[index + 1]
  }
  if ( val === '-g' ) {
    config.filename = ''
  }
} )
config.task = args[args.length - 1]

if ( config.filename ) {
  init( config.filename )
}
sprockets.get( config.task ).execute()
