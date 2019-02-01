
// ## Combinators

// Identity or I combinator
const Id = x => x

// Constant or K combinator returns a function that always returns the first argument
const K = x => _ => x

// Self application or M combinator
const M = fn => fn(fn)

module.exports = {
	Id,
	K,
	M,
}