'use strict'

const sprockets = require( __dirname + '/../../src/sprockets' )

const webpack = require( 'webpack' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )

var defaults = {
  entry: {
    app: './src/scripts/index.js'
  },
  output: {
    filename: 'scripts/app.js',
    path: './build'
  },
  resolve: {
    extensions: [ '', '.js', '.json' ]
  },
  plugins: [
    new CopyWebpackPlugin( [ { from: './src/index.html', to: 'index.html' } ], { copyUnmodified: true } ),
    new ExtractTextPlugin( './src/styles/app.css', { allChunks: true } )
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: new ExtractTextPlugin( 'styles/app.css' ).extract( [ 'css', 'sass' ] )
      }
    ]
  }
}

sprockets.add( 'build', ( done ) => {
  let compiler = webpack( defaults )
  compiler.run( done )
} )
