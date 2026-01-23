import { isZero, isOne, Zero, One, Two, Add, Subtract, If } from './lamb.js'

// Returns a thunk which must be invoked
const Fibonacci = a => If( isZero(a) )
	(
		() => Zero
	)
	(
		If( isOne(a) )
			(
				() => One
			)
			(
				() => Add
					(
						Fibonacci(Subtract(a)(One))()
					)
					(
						Fibonacci(Subtract(a)(Two))()
					)
			)
	)

export {
	Fibonacci
}
