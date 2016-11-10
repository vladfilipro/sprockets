'use strict'

let sprockets = require( __dirname + '/src/index.js' )

let fs = require( 'fs' )

let init = ( file ) => {
  fs.stat( file, ( err ) => {
    if ( err !== null ) {
      throw err
    }
    require( file )
  } )
}

let config = {
  filename: './sprockets.js'
}

let args = process.argv.slice( 2 )
args.forEach( ( val, index ) => {
  if ( val === '-f' ) {
    config.filename = args[index + 1]
  }
} )
config.task = args[args.length - 1]

if ( config.filename ) {
  init( config.filename )
}

sprockets.get( config.task ).execute()
