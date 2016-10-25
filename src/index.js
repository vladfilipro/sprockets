var Task = require( __dirname + '/task' )
var q = require( __dirname + '/utils/promise' )

var tasks = {}

var add = function ( id, f ) {
  if ( tasks[ f ] !== undefined ) {
    throw new Error( 'A task with the id ' + id + ' has already been defined' )
  }
  tasks[ id ] = new Task( id, f )
  return methods
}

var remove = function ( id ) {
  delete tasks[ id ]
  return methods
}

var get = function ( id ) {
  if ( !tasks[ id ] ) {
    throw new Error( 'Task ' + id + ' does not exist.' )
  }
  return tasks[ id ]
}

var getTaskPromise = function ( task ) {
  return ( typeof task === 'string' ) ? get( task ).run() : task.run()
}

var run = function () {
  var args = arguments
  var list = []
  args.forEach( function ( task ) {
    if ( Array.isArray( task ) ) {
      list.push( q.all.async( task.map( getTaskPromise ) ) )
    } else {
      list.push( getTaskPromise( task ) )
    }
  } )
  return q.all.sync( list )
}

var methods = {
  add: add,
  remove: remove,
  get: get,
  run: run
}

module.exports = methods
