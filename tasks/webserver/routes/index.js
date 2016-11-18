
var fs = require( 'fs' )
var path = require( 'path' )

var types = {
  'js': 'application/javascript',
  'css': 'text/css',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'mp3': 'audio/mpeg'
}

var getContentType = function ( file ) {
  var extension = path.extname( file ).replace( '.', '' )
  return types[ extension ] || 'text/plain'
}

module.exports = function () {
  var ErrorClass = this.Error
  var fail = new ErrorClass( 404 )

  this.execute = function ( req, cb, ecb ) {
    try {
      var file = path.resolve( './build' + req.query.path )
      var content = fs.readFileSync( file )
      cb( content, 200, {
        'Content-type': getContentType( file ),
        'Cache-Control': 'max-age=604800, public'
      } )
    } catch ( e ) {
      ecb( fail )
    }
  }
}
