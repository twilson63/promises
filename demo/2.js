const { promisify } = require('util')
const { readFile } = require('fs')
const readFileP = promisify(readFile)

/**

# Demo 2

In this demo, we are reading the contents of both 1.js and 2.js the promise
all function returns them to the success function in an array of strings.

We simply logged out the joined content strings.
*/

Promise.all([
  readFileP(__dirname + '/1.js', 'utf-8'),
  readFileP(__dirname + '/2.js', 'utf-8')
])
  .then(contents => console.log(contents.join(' ')))
  .catch(err => console.log('ERROR: ', err))
