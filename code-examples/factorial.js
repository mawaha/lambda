const { If, isZero, Multiply, Decrement, One } = require('./lamb.js')

// Returns a thunk
const Factorial = n => If(isZero(n))
								(
									() => One
								)
								(
									() => Multiply(n) (Factorial(Decrement(n)) ())
								)

module.exports = {
	Factorial
}
