'use strict'

// Load built-in tasks
const TASKS_PATH = __dirname + '/../tasks/'
require( TASKS_PATH + 'compile' )

module.exports = require( __dirname + '/sprockets' )
