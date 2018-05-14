/*
 * Implement a monad with the following requirements and features
 *
 * - Create a monad
 * - 1. type constructor: Create a constructor for a monad
 * - 2. unit function: Wrap a value of given type into a monad
 * - 3. bind function: allow chaining of operations on a monadic value
 * - Implement a fake DOM library
 * - Implement style function
 * - Implement fadeOut function
 *
 * Example:
 *
 * const $ = d()
 *  .extend("style", function(style) {…})
 *  .extend("fadeOut", function(style) {…})
 *
 * $({})
 *   .style({ color: "red" })
 *   .fadeOut();
 */

// https://gist.github.com/newswim/4668aef8a1f1bc0dabe8

// Inspired by YouTube Vide "Monads and Gonads"
// https://www.youtube.com/watch?v=b0EF0VTs9Dc
function d() {
    var prototype = Object.create(null);
    function unit(value) {
        var monad = Object.create(prototype);
        monad.bind = function (func, args) {
            return func(value, ...args); 
        };
        return monad;
    }

    // unit.method = function (name, func) {
    //     prototype[name] = func;
    //     return unit;
    // };
    /* better: */
    unit.extend = function (name, func) {
        prototype[name] = function (...args) {
            return unit(this.bind(func, args));
        };
        return unit;
    };
    return unit;
}

  

// https://importantshock.wordpress.com/2009/01/18/jquery-is-a-monad/
// https://www.youtube.com/watch?v=b0EF0VTs9Dc
// https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8



// https://medium.com/front-end-hacking/implementing-javascript-functors-and-monads-a87b6a4b4d9a
// Notes:
// So, the monad basically is a functor but with the special power to unwrap any value from it context using the flatMap. Arrays are monads as you can flat then by simply doing:
// [].concat.apply([], [ "H", ["e", "l"], ["l"], "o"]);
// results on ["H", "e", "l", "l", "o"]
// ! So, the promise is a monad and the resolution method then( ) is a flatMap!”
