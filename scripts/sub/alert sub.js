const {BufferedProcess} = require('atom')

const command = 'ps'
const args = ['-ef']
const stdout = (output) => console.log(output)
const exit = (code) => console.log("ps -ef exited with #{code}")
const process = new BufferedProcess({command, args, stdout, exit})


// var promise = new Promise(function(resolve, reject) {
//   // do a thing, possibly async, then…
//   /* everything turned out fine */
//   if (1) {
//     resolve("Stuff worked!");
//   }
//   else {
//     reject(Error("It broke"));
//   }
// });
//
var promise = new Promise(function(resolve, reject) {
  resolve(1);
});

promise = promise.then(function(val) {
  console.log(val); // 1
  return val + 2;
}).then(function(val) {
  return val + 2;
  console.log(val); // 3
})
promise.then(function(val) {
  return val + 2;
  console.log(val); // 3
}).then(function(val) {
  console.log(val); // 3
})
