const { Increment, Zero } = require('./lamb.js')

const tap = value => {
	console.log(value)
	return value
}

// Accepts a church numeral and returns an integer
// toInt :: Number -> Int
const toInt = n => n(x => x + 1)(0);

const toChurch = n => n === 0 ? Zero : Increment(toChurch(n - 1))

module.exports = {
	toInt,
	toChurch,
	tap
}