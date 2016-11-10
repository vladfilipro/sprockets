'use strict'

const Console = require( 'console' ).Console
const styles = {
  'reset': '0',
  'hicolor': '1',
  'underline': '4',
  'inverse': '7',
  'black': '30',
  'red': '31',
  'green': '32',
  'yellow': '33',
  'blue': '34',
  'magenta': '35',
  'cyan': '36',
  'white': '37',
  'bg_black': '40',
  'bg_red': '41',
  'bg_green': '42',
  'bg_yellow': '43',
  'bg_blue': '44',
  'bg_magenta': '45',
  'bg_cyan': '46',
  'bg_white': '47'
}
let c = ( style ) => {
  return '\x1B[' + styles[style] + 'm'
}

function Terminal ( stdout, stderr ) {
  let output = new Console( stdout || process.stdout, stderr || process.stderr )

  this.start = function ( taskname ) {
    output.log( c( 'bg_cyan' ) + c( 'hicolor' ) + ' > STARTED < ' + c( 'reset' ) + ' ' + c( 'yellow' ) + taskname + c( 'reset' ) )
  }

  this.stop = function ( taskname ) {
    output.log( c( 'bg_green' ) + c( 'hicolor' ) + ' < ENDED > ' + c( 'reset' ) + ' ' + c( 'yellow' ) + taskname + c( 'reset' ) )
  }

  this.error = function ( taskname ) {
    output.log( c( 'bg_red' ) + c( 'hicolor' ) + ' < ERROR > ' + c( 'reset' ) + ' ' + c( 'yellow' ) + taskname + c( 'reset' ) )
  }
}

module.exports = new Terminal()
