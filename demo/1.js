const { promisify } = require('util')
const { readFile } = require('fs')
const readFileP = promisify(readFile)

/**

# Demo 1

In this demo, we are using the promisify function to read the contents of the
file and print it out to the console.

*/

readFileP(__dirname + '/1.js', 'utf-8')
  .then(console.log.bind(console))
  .catch(err => console.log('ERROR: ', err))
