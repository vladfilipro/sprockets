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

let getTaskPromise = ( task ) => {
  return ( typeof task === 'string' ) ? get( task ).execute() : task.execute()
}

let runSync = function () { // cannot use arguments if we use arrow function
  let list = [ ...arguments ].map( getTaskPromise )
  let resolveSync = ( promises, resolve, reject ) => {
    let promise = promises.splice( 0, 1 )
    promise.then( () => {
      if ( promises.length > 0 ) {
        resolveSync( promises, resolve, reject )
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
  let list = [ ...arguments ].map( getTaskPromise )
  return Promise.all( list )
}

let methods = {
  add: add,
  remove: remove,
  get: get,
  runSync: runSync,
  run: runAsync,
  watch: ( src, task ) => {
    fs.watch( src, () => {
      getTaskPromise( task )
    } )
  }
}

module.exports = methods
