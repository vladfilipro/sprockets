module.exports = function Task ( id, code ) {
  var _self = this

  _self.name = id

  if ( typeof code !== 'function' ) {
    throw new Error( 'Invalid task definition.' )
  }

  _self.execute = function () {
    var promise = new Promise( ( resolve, reject ) => {
      try {
        var executionReply = code( function () {
          resolve()
        } )
        if ( typeof executionReply !== 'undefined' ) {
          resolve()
        }
      } catch ( e ) {
        reject()
        throw e
      }
    } )
    return promise
  }
}
