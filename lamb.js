const { K, Id } = require('./combinators.js')
const { toInt } = require('./utils.js')

// Takes no arguments and returns no value
const Nothing = () => {}

// ## Boolean

// Boolean data types are represented as a choice

// True returns first argument
const True = x => y => x

// False returns second argument
const False = x => y => y

// ## Conditionals

// Receives a Lamda Boolean data type and therefore returns either the first or second argument
const If = b => x => y => b(x)(y)

// ## Logic

// Only returns True if both expressions are True
// And :: Boolean -> Boolean -> Boolean
const And = x => y => x(y)(x)

// Returns True if either expression is True
// Or :: Boolean -> Boolean -> Boolean
const Or = x => y => x(x)(y)

// Inverts the argument order
const Not = b => x => y => b(y)(x)
const Flip = Not

// ## Data Types

// Pair :: Any -> Any -> Boolean -> Any
const Pair = a => b => f => f(a)(b)


// Return the first argument from the pair
// First :: Pair -> Any
const First = p => p(True)

// Return the second argument from the pair
// Second :: Pair -> Any
const Second = p => p(False)

const ReplaceFirst = x => p => Pair(x)(Second(p))

const ReplaceSecond = x => p => Pair(First(p))(x)

const BiMap = f => g => p => Pair(f(First(p)))(g(Second(p)))

// Phi takes a Number Pair and shifts the values left and increments the second by one
// Pair <Number, Number> :: Pair -> Pair
const Phi = p => Pair(Second(p))(Increment(Second(p)))

// Standard functional composition
const Compose = f => g => x => f(g(x))

// Apply a function to a value once
const Once = fn => x => fn(x)

// Apply a function to a value twice
const Twice = fn => x => fn(fn(x))

// Apply a function fn to a value n + 1 times
// Increment :: Number -> Any -> Any -> 
const Increment = n => fn => x => fn( n(fn)(x) )

// Applies the Phi function n times to the seed Pair <0, 0> and picks the first value from the resultant Pair
const Decrement = n => First( n(Phi) (Pair(False)(False) ))

// Natural Numbers and Zero

// Zero can be thought of as a function that performs a given computation zero times
// So fn => x => x is equivalent to False
const Zero = False
const One = Increment(Zero) // fn => x => fn(x)
const Two = Increment(One)
const Three = Increment(Two)
const Four = Increment(Three)
const Five = Increment(Four)

// Predicates

// isZero :: Number -> Boolean
const isZero = n => n( K(False) )(True)

// Arithmetic Operators

// Less than or equal to
// LEQ
const LEQ = a => b => isZero(Subtract(a)(b))

// Equal :: Number -> Number -> Boolean
const EQ = a => b => And( LEQ(a)(b) )( LEQ(b)(a) )

// Greater Than
// GT :: Number -> Number
const GT = Not(LEQ)

const isOne = EQ(One)

// Add applies the Increment function to n2 n1 times
// Add :: Number -> Number -> Number
const Add = n1 => n2 => n1(Increment)(n2)

// Subtract
// Applies the Decrement function to n1 n2 times
const Subtract = n1 => n2 => n2(Decrement)(n1)

// Multiply is the composition of numbers i.e Executing a function two lots of two times
const Multiply = Compose

// Power
const Power = n1 => n2 => n2(n1)

// Square
// Currying the second argument to Power gives us the Square function
const Square = Flip(Power)(Two)


module.exports = {
	True,
	False,
	If,
	And,
	Or,
	Not,
	Power,
	Square,
	Multiply,
	Subtract,
	Add,
	GT,
	EQ,
	LEQ,
	isZero,
	isOne,
	Decrement,
	Increment,
	Once,
	Twice,
	Pair,
	First,
	Second,
	BiMap,
	ReplaceFirst,
	ReplaceSecond,
	Zero,
	One,
	Two,
	Three,
	Four,
	Five,
}
