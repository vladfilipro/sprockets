var q = require( __dirname + '/utils/promise' )

module.exports = function Task ( id, code ) {
  var _self = this

  _self.name = id

  if ( typeof code !== 'function' ) {
    throw new Error( 'Invalid task definition.' )
  }

  _self.execute = function () {
    var promise = q.promise()
    try {
      var executionReply = code( function () {
        try {
          promise.resolve()
        } catch ( e ) {}
      } )
      if ( typeof executionReply !== 'undefined' ) {
        try {
          promise.resolve()
        } catch ( e ) {}
      }
    } catch ( e ) {
      try {
        promise.reject()
      } catch ( e ) {}
      console.error( 'Error executing task ' + _self.id )
      throw e
    }
    return promise.result
  }
}
