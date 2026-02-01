// ## Combinators

// Identity or I combinator
const Id = x => x

// Constant or K combinator returns a function that always returns the first argument
const K = x => _ => x

// Self application or M combinator
const M = fn => fn(fn)

// Y combinator (lazy/applicative-order version for JavaScript)
// Y = λf.(λx.f(λv.xxv))(λx.f(λv.xxv))
// The key property: Y(f) = f(Y(f))
// This enables recursion without named self-reference
const Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)))

export {
	Id,
	K,
	M,
	Y,
}
