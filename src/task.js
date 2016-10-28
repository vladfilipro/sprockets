module.exports = function Task ( id, code ) {
  let _self = this

  _self.name = id

  if ( typeof code !== 'function' ) {
    throw new Error( 'Invalid task definition.' )
  }

  _self.execute = function () {
    let promise = new Promise( ( resolve, reject ) => {
      try {
        let executionReply = code( function () {
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
