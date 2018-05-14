/*
 * Implement a currify function. The function should return a currified
 * variation of the given function.
 *
 * - Works with an arbitrary length of arguments
 * - Works with ...rest if curry is invoked with a second argument "length"
 * - `curry` is a pure function!
 * - Has auto currying after initial call
 */
// http://sunjay.ca/2016/08/13/es6-currying
export function curry(f, length = f.length, ...args) {
  if (length === args.length) {
    if (args.length === 0) return f;
    else return f(...args);
  } else {
    return (...next) => curry(f, length, ...args, ...next);
  }
}

//Source: https://medium.com/@jschapir/today-i-learned-curry-implementation-with-es6-35bb2229e230
// export function curry(fn, ...args) { 
//   let arity = fn.length; //(2) number of arguments fn expects
//   return (...args) => { // (3)
//     let firstArgs = args.length; // (4)
//     if (firstArgs >= arity) { //correct number of arguments 
//       return fn(...args); // (5)
//     } 
//   }
// }
