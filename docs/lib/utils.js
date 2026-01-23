import { Increment, Zero, True, False, First, Second } from './lamb.js'
import { isEmpty, Head, Tail } from './data.js'

const tap = value => {
	console.log(value)
	return value
}

// Accepts a church numeral and returns an integer
// toInt :: Number -> Int
const toInt = n => n(x => x + 1)(0)

const toChurch = n => n === 0 ? Zero : Increment(toChurch(n - 1))

// Convert Church boolean to JavaScript boolean
// toBoolean :: Boolean -> Bool
const toBoolean = cb => cb(true)(false)

// Convert Church list to JavaScript array
// toArray :: List -> Array
const toArray = list => {
	const arr = []
	let current = list
	while (!toBoolean(isEmpty(current))) {
		arr.push(toInt(Head(current)))
		current = Tail(current)
	}
	return arr
}

// Convert Church pair to JavaScript array
// pairToArray :: Pair -> [Any, Any]
const pairToArray = pair => [First(pair), Second(pair)]

export {
	toInt,
	toChurch,
	toBoolean,
	toArray,
	pairToArray,
	tap
}
