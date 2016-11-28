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
        let executionReply = this.code( ( err ) => {
          if ( err ) {
            terminal.error( this.name, err )
            reject()
            return
          }
          terminal.stop( this.name )
          resolve()
        } )
        if ( executionReply ) {
          terminal.stop( this.name )
          resolve()
        }
      } catch ( err ) {
        terminal.error( this.name, err )
        reject()
      }
    } )
    return promise
  }
}

module.exports = Task
