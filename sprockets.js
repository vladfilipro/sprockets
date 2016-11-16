#!/usr/bin/env node

'use strict'

let sprockets = require( __dirname + '/src/index.js' )

let fs = require( 'fs' )

let exists = ( file ) => {
  try {
    if ( fs.statSync( file ).isFile() ) {
      return true
    }
  } catch ( e ) {}
  return false
}

let init = ( file ) => {
  if ( !exists( file ) ) {
    throw new Error( 'File ' + file + ' not found' )
  }
  require( file )
}

const defaultFile = './sprockets.js'

let config = {
  filename: ( exists( defaultFile ) ) ? defaultFile : false,
  task: false
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
