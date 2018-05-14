/*
 * Implement a pure function "pow". The function should behave the same as
 * Math.pow(n, n) -> Math.pow(2, 2) = 4 but should not use Math.pow(…). Find an
 * elegant and pure functional solution to the problem w/o any side-effects.
 *
 * - Works with positive integers ℤ+!
 * - Throws an error if exponent is invalid
 */
export function pow(x, y) {
    //reduce über array
    //2^2
    //[2,2].reduce()
    //Array.apply(null, {length: y})}
    //    .map((x)=> x
    //Array.fill

    return Array(y).fill(x).reduce((previousValue, currentValue) => previousValue * currentValue);
}

/*
 * Implement a sortBy function that is capable of sorting any field within the
 * set "data.json".
 *
 * - Provides a primer for complex fields
 * - Throws an error if arguments are invalid
 */
export function sortBy(type, p = x => x) {  /* schöne kurze Lösung von Alex */
    return (a, b) => p(a[type]) > p(b[type]);
}

// TODO Lösung im Buch nochmal: