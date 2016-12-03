'use strict'

const Task = require( __dirname + '/task' )
const fs = require( 'fs' )

let tasks = {}

let add = ( id, f ) => {
  if ( tasks[ f ] !== undefined ) {
    throw new Error( 'A task with the id ' + id + ' has already been defined' )
  }
  tasks[ id ] = new Task( id, f )
  return methods
}

let remove = ( id ) => {
  delete tasks[ id ]
  return methods
}

let get = ( id ) => {
  if ( !tasks[ id ] ) {
    throw new Error( 'Task ' + id + ' does not exist.' )
  }
  return tasks[ id ]
}

let getTask = ( task ) => {
  return ( typeof task === 'string' ) ? get( task ) : task
}

let runSync = function () { // cannot use arguments if we use arrow function
  let list = [ ...arguments ].map( getTask )
  let resolveSync = ( tasks, resolve, reject ) => {
    let task = tasks.splice( 0, 1 )[ 0 ]
    task.execute().then( () => {
      if ( tasks.length > 0 ) {
        resolveSync( tasks, resolve, reject )
      } else {
        resolve()
      }
    } ).catch( () => {
      reject()
    } )
  }
  return new Promise( ( resolve, reject ) => {
    resolveSync( list, resolve, reject )
  } )
}

let runAsync = function () { // cannot use arguments if we use arrow function
  let list = [ ...arguments ].map( function ( task ) {
    return getTask( task ).execute()
  } )
  return Promise.all( list )
}

let methods = {
  add: add,
  remove: remove,
  get: get,
  list: () => tasks,
  runSync: runSync,
  run: runAsync,
  watch: ( src, task ) => {
    fs.watch( src, { recursive: true }, ( e, filename ) => {
      console.log( filename + ' -> was changed' )
      getTask( task ).execute()
    } )
  }
}

module.exports = methods
