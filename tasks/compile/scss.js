'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )
const mkdir = require( __dirname + '/../../utils/mkdir' )

const fs = require( 'fs' )
const path = require( 'path' )
const sass = require( 'node-sass' )

let input = './src/styles/index.scss'
let output = './build/styles/app.css'

let fileExists = function ( file ) {
  try {
    fs.lstatSync( file )
    return true
  } catch ( e ) {
    try {
      fs.lstatSync( file + '.scss' )
      return true
    } catch ( e ) {
      return false
    }
  }
}

// Trying to resolve node_module
let resolveNodeImporter = function ( url, file, done ) {
  try {
    let nodeModuleFile = require.resolve( url ).substring( 0, require.resolve( url ).indexOf( url ) + url.length ) + '/index.scss'
    if ( fileExists( nodeModuleFile ) ) {
      done( {
        file: nodeModuleFile
      } )
      return true
    }
  } catch ( e ) {}
  return false
}

// Trying to resolve relative path
let resolveRelativeImporter = function ( url, file, done ) {
  let filepath = file
  if ( file === 'stdin' ) {
    filepath = ''
  }
  let filename = path.resolve( path.dirname( filepath ), url )
  if ( fileExists( filename ) ) {
    done( {
      file: filename
    } )
    return true
  }
  return false
}

sprockets.add( 'scss', ( cb ) => {
  sass.render( {
    file: input,
    outputStyle: 'compressed',
    importer: function ( url, file, done ) {
      if ( !resolveNodeImporter( url, file, done ) ) {
        if ( !resolveRelativeImporter( url, file, done ) ) {
          done( {
            file: url
          } )
        }
      }
    }
  }, function ( err, result ) {
    if ( err ) {
      cb( err )
      return
    }
    mkdir( output )
    fs.writeFile( output, result.css, cb )
  } )
} )
