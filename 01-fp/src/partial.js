/*
 * Implement a partial function. The function should return a variation of
 * the original function that can be invoked partially. Do also implement a
 * placeholder constant that can be used during invocation.
 *
 * - Works with an arbitrary length of arguments
 * - Works with an arbitrary number of placeholder elements!
 * - `partial` is a pure function!
 */
export const _ = undefined;

export function partial(f, ...args) { 
    const allArgs = new Array(f.length).fill(_);
    const rec = (...args) => {
        args.forEach((argument) => (allArgs[allArgs.indexOf(_)] = argument));
        if (allArgs.includes(_)) return rec;
        else return f(...allArgs);
    }

    if (allArgs.includes(_)) return rec;
    else return f;
}


// https://gist.github.com/JamieMason/1228339132986291693726d11bd8dd1f
// const pApply = (fn, ...cache) => (...args) => {
//     const all = cache.concat(args);
//     return all.length >= fn.length ? fn(...all) : pApply(fn, ...all);
//   };
  