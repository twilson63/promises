#### Dogbytes

# promises

JavaScript Promises was officially introduced to ECMAScript in the 2015 standard. You can read
details about the implementation of the specification here: https://promisesaplus.com/

Basically, a promise is a pattern on how to make asynchronous calls in javascript. Before promises
the most predominant pattern was callbacks.

A callback is the practice of calling a function and passing in the last argument of the call a
function as a value. When the async function is completed, then it can invoke the passed in function
with the results of the async request, then the caller can handle this data and continue to do
what they need to do. Here is an example using the `fs.readfile` function in NodeJS.

```js
const fs = require('fs')
fs.readFile('foo.txt', 'utf-8', callback)

function callback (error, contents) {
  if (err) { return console.log(error) }
  console.log(contents)
}
```

In this example, we provide a callback function to the `readFile` function, which is going to access the filesystem and get the contents of `foo.txt` and invoke the callback when the contents are returned. While this works great for simple async functions, when you start to make multiple function
it can get a bit hard to maintain, you may have heard of a term called callback hell. http://callbackhell.com/ There are several ways to prevent this, using a module called `async` has
some nice functional patterns that make composing callbacks much more managable. http://caolan.github.io/async/

But a lot of developers wanted mechanics in the language to address async and promises were born.

The promise pattern works by returning an object with a couple of consistent methods to manage the async results. So instead of passing in a callback, you assign the returning promise and invoke a then function, which takes a success function and an failure function.

Lets take a look at using util.promisfy to convert the fs.readFile to a promise then invoke it.

```js
const { promisify } = require('util')
const { readFile } = require('fs')

const readFileP = promisify(readFile)

const promise = readFileP('foo.txt', 'utf-8')
promise.then(success, failure)

function success (content) {
  console.log(content)
}

function failure (error) {
  console.log(failure)
}
```

Since the promise returns an object, you can use chaining to remove the promise assignment


```js
const { promisify } = require('util')
const { readFile } = require('fs')

const readFileP = promisify(readFile)

readFileP('foo.txt', 'utf-8').then(success, failure)

function success (content) {
  console.log(content)
}

function failure (error) {
  console.log(failure)
}
```

There are several userland modules that use promises see `fetch`. Also, as of
NodeJS version 8 the utility function promisify is included in the utils module.

### What about multiple async calls?

With promises you can use the chaining pattern to do a waterfall pattern of
async calls. The waterfall pattern is when you need data from each previous
success function. For example, lets say you want to get a list of widgets that
belongs to an user.

```js
const { getUser, getWidgets } = require('made-up-promise-db-lib')

getUser(20).then(handleUser).then(success, failure)

function handleUser (user) {
  return getWidgets(user)
}

function success (widgets) {
  console.log(widgets)
}

function error (err) {
  console.log(err)
}
```

Because the handleUser function just returns the getWidgets you can reduce
this code to remove some unneeded boilerplate.

```js
const { getUser, getWidgets } = require('made-up-promise-db-lib')

getUser(20).then(getWidgets).then(success, failure)

function success (widgets) {
  console.log(widgets)
}

function error (err) {
  console.log(err)
}
```

Using the catch `method` and arrow functions we can reduce more boilerplate.

```js
const { getUser, getWidgets } = require('made-up-promise-db-lib')

getUser(20)
  .then(getWidgets)
  .then(widgets => console.log(widgets))
  .catch(err => console.log(err))
```

The nice thing about promises is that the results are always one value returned,
this makes it much easier to chain calls together and reuse unary functions.

#### Parallel Promises

Promises also supports running in parallel, by using the `Promise.all` method,
which takes an array of promises.

```js

Promise.all([
  readFileP('index.html', 'utf-8'),
  readFileP('index.css', 'utf-8'),
  readFileP('index.js', 'utf-8')
]).then(success, failure)

```

When the results of all the async promise calls are resolved, the success
function is invoked. And if an error occurs with any of the promise messages,
the failure function is invoked.

### Demo

(See demos folder)

### Exercises

Using this sleep function do the following:

(See exercises folder)

### See Also

* [Fetch](https://glitch.com/edit/#!/dogbytes-fetch)

### Was this dogbyte helpful?

We would like to hear from you [Contact Us](mailto:dogbytes@jackrussellsoftware.com)

