const { isZero, isOne, LEQ, Zero, One, Two, Add, Subtract, If } = require('./lamb.js')

// Returns a thunk which must be invoked 
Fibonacci = a => If( isZero(a) )
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

module.exports = {
	Fibonacci
}