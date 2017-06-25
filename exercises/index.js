// sleep promise
const sleep = seconds =>
  new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(new Date())
    }, 1000 * seconds)
  })

// Exercises

/**

# 1

Create a promise call that invokes the sleep function for 1 second and then
prints 'HELLO WORLD' to the console.

*/

//sleep(1).then(t => console.log('Hello World'))

/**

# 2

Create a chain of promise calls that print the word `tick` for every second for
the next 3 seconds.

*/

// sleep(1).then(tick).then(tick).then(tick).then(console.log.bind(console))
//
// function tick(t) {
//   console.log('tick')
//   return sleep(1)
// }
