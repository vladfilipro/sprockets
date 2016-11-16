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
            reject()
            terminal.error( this.name, err )
            return
          }
          resolve()
          terminal.stop( this.name )
        } )
        if ( executionReply ) {
          resolve()
          terminal.stop( this.name )
        }
      } catch ( err ) {
        reject()
        terminal.error( this.name, err )
      }
    } )
    return promise
  }
}

module.exports = Task
