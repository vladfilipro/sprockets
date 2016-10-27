var Task = require( __dirname + '/task' )

var tasks = {}

var add = ( id, f ) => {
  if ( tasks[ f ] !== undefined ) {
    throw new Error( 'A task with the id ' + id + ' has already been defined' )
  }
  tasks[ id ] = new Task( id, f )
  return methods
}

var remove = ( id ) => {
  delete tasks[ id ]
  return methods
}

var get = ( id ) => {
  if ( !tasks[ id ] ) {
    throw new Error( 'Task ' + id + ' does not exist.' )
  }
  return tasks[ id ]
}

var getTaskPromise = ( task ) => {
  return ( typeof task === 'string' ) ? get( task ).run() : task.run()
}

var runSync = () => {
  var list = [ ...arguments ].map( getTaskPromise )
  var resolveSync = ( promises, resolve, reject ) => {
    var promise = promises.splice( 0, 1 )
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

var runAsync = () => {
  var list = [ ...arguments ].map( getTaskPromise )
  return Promise.all( list )
}

var methods = {
  add: add,
  remove: remove,
  get: get,
  runSync: runSync,
  run: runAsync,
  utils: require( __dirname + '/utils' )
}

module.exports = methods
