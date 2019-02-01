const { isZero, isOne, LEQ, Zero, One, Two, Add, Subtract, If } = require('./lamb.js')
const { toInt } = require('./utils.js')

const tap = x => {
	console.log('Tapped value:', toInt(x))
	return x
}

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