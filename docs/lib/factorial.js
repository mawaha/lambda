import { If, isZero, Multiply, Decrement, One } from './lamb.js'

// Returns a thunk
const Factorial = n => If(isZero(n))
							(
								() => One
							)
							(
								() => Multiply(n) (Factorial(Decrement(n)) ())
							)

export {
	Factorial
}
