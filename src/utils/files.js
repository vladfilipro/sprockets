/**
 * Returns an array of filenames that match the provided pattern;
 */

let fs = require( 'fs' )
let path = require( 'path' )
let delimitor = path.delimitor

let replacements = {
  '*': '.+?',
  '**': '.*?'
}

let exists = ( path ) => {
  let promise = new Promise( ( resolve, reject ) => {
    fs.stat( path, ( err, stats ) => {
      if ( err ) {
        reject()
      } else {
        resolve( stats )
      }
    } )
  } )
  return promise
}

let get

let getFileList = ( path ) => {
  fs.readdir( path, ( files ) => {
    files.forEach( ( file ) => {
      exists( path.resolve( path, file ) ).then( ( stat ) => {
        if ( stat.isDirectory() ) {

        }
      } )
    } )
  } )
}

let read = ( pattern ) => {
  let base = pattern.substring( 0, pattern.indexOf( '*' ) )
  exists( base ).then( ( base ) => {
    fs.readdir( base, ( file ) => {
        // analyze
    } )
  } )

  let parts = pattern.split( delimitor )
  parts.forEach( ( part ) => {
    if ( part === '' ) {
      part = delimitor
    }
  } )

  return
}

module.exports = ( patterns ) => {
  let list = []
  patterns.forEach( ( pattern ) => {
    list = list.concat( getFileList( pattern ) )
  } )
}
