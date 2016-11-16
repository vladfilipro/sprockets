'use strict'

const terminal = require( __dirname + '/terminal' )

class Task {

  constructor ( id, code ) {
    if ( typeof code !== 'function' || !code.apply ) {
      throw new Error( 'Invalid task definition.' )
    }

    this.name = id
    this.code = code
  }

  execute () {
    terminal.start( this.name )
    let promise = new Promise( ( resolve, reject ) => {
      try {
        let executionReply = this.code( () => {
          resolve()
          terminal.stop( this.name )
        } )
        if ( typeof executionReply !== 'undefined' ) {
          resolve()
          terminal.stop( this.name )
        }
      } catch ( e ) {
        reject()
        terminal.error( this.name, e )
        throw e
      }
    } )
    return promise
  }
}

module.exports = Task
