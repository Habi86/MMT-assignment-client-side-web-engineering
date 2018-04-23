/*
 * Implement a currify function. The function should return a currified
 * variation of the given function.
 *
 * - Works with an arbitrary length of arguments
 * - Works with ...rest if curry is invoked with a second argument "length"
 * - `curry` is a pure function!
 * - Has auto currying after initial call
 */

export function curry(fn) { //Source: https://medium.com/@jschapir/today-i-learned-curry-implementation-with-es6-35bb2229e230
    let arity = fn.length; //(2) number of arguments fn expects
    return (...args) => { // (3)
      let firstArgs = args.length; // (4)

      if (firstArgs >= arity) { //correct number of arguments 
        return fn(...args); // (5)

      } else {
        return (...secondArgs) => { // (6)
           return fn(...[...args, ...secondArgs]); // (7)
        }
      }
    }
 }



// // Tiny, recursive autocurry
// const curry = (
//     f, arr = [],
//     length = f.length
//   ) => (...args) => (
//     a => a.length === length ?
//       f(...a) :
//       curry(f, a)
//   )([...arr, ...args]);
  
//   export default curry;
  