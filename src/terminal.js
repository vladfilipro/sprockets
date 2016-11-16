'use strict'

const Console = require( 'console' ).Console
const STYLES = {
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
  return '\x1B[' + STYLES[style] + 'm'
}

let timestamp = () => {
  var d = new Date()
  return d.getFullYear() + '/' + ( d.getMonth() + 1 ) + '/' + d.getDate() + ' ' + ( d.getHours() + 1 ) + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds()
}

function Terminal ( stdout, stderr ) {
  let output = new Console( stdout || process.stdout, stderr || process.stderr )

  this.start = function ( taskname ) {
    output.log( c( 'yellow' ) + '[ ' + c( 'hicolor' ) + ' START ' + c( 'yellow' ) + '][ ' + c( 'hicolor' ) + timestamp() + c( 'yellow' ) + ' ]' + c( 'reset' ) + ' >> ' + c( 'cyan' ) + taskname + c( 'reset' ) )
  }

  this.stop = function ( taskname ) {
    output.log( c( 'yellow' ) + '[ ' + c( 'hicolor' ) + ' END ' + c( 'yellow' ) + '][ ' + c( 'hicolor' ) + timestamp() + c( 'yellow' ) + ' ]' + c( 'reset' ) + ' >> ' + c( 'cyan' ) + taskname + c( 'reset' ) )
  }

  this.error = function ( taskname, error ) {
    output.log( c( 'yellow' ) + '[ ' + c( 'red' ) + ' ERROR ' + c( 'yellow' ) + '][ ' + c( 'red' ) + timestamp() + c( 'yellow' ) + ' ]' + c( 'reset' ) + ' >> ' + c( 'cyan' ) + taskname + c( 'reset' ) + ' - ' + error )
  }
}

module.exports = new Terminal()
