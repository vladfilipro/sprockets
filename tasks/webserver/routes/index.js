
const fs = require( 'fs' )
const path = require( 'path' )

const types = {
  'html': 'text/html',
  'js': 'application/javascript',
  'css': 'text/css',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'mp3': 'audio/mpeg'
}

let getContentType = function ( file ) {
  let extension = path.extname( file ).replace( '.', '' )
  return types[ extension ] || 'text/plain'
}

module.exports = function () {
  const ErrorClass = this.Error
  let fail = new ErrorClass( 404 )

  this.execute = function ( req, cb, ecb ) {
    try {
      let file = path.resolve( './build' + req.query.path )
      let content = fs.readFileSync( file )
      cb( content, 200, {
        'Content-type': getContentType( file ),
        'Cache-Control': 'max-age=604800, public'
      } )
    } catch ( e ) {
      ecb( fail )
    }
  }
}
