// # Lambda

// ## Lambda
//
// Lambda functions are written in the form λx.E where E represents an expression which can be one of three things:
// A variable, an application, or another expression.
//
// | Type        | Lambda | JavaScript |
// | ----------- | ------ | ---------- |
// | Variable    | x      | x          |
// | Application | fx     | f(x)       |
// | Expression  | λx.x   | x => x     |
//
// The Lambda symbol λ represents a function which has two parts, the arguments on the left, and the body on the right.
// Lambda functions only accept one argument, as such λab is shorthand for λa.λb
// Any variable in the body of the function, for example x in λx.x, that is declared in the function arguments is considered 'bound'.
// Any variable that does not, for example y in λx.xy, is considered free.
// A function that contains only 'bound' variables is called 'pure'

// ## Notes
// Any types mentioned in the type signatures below should be considered Church encodings and not JavaScript types

import { K, Id } from './combinators.js'

// Takes no arguments and returns no value
const Nothing = () => {}

// ## Boolean

// Boolean data types are represented as a choice

// True returns first argument
// λxy.x
const True = x => y => x

// False returns second argument
// λxy.y
const False = x => y => y

// ## Conditionals

// Receives a Lambda Boolean data type and therefore returns either the first or second argument
// λbxy.bxy
const If = b => x => y => b(x)(y)

// ## Logic

// Only returns True if both expressions are True
// And :: Boolean -> Boolean -> Boolean
// λxy.xyx
const And = x => y => x(y)(x)

// Returns True if either expression is True
// Or :: Boolean -> Boolean -> Boolean
// λxy.xxy
const Or = x => y => x(x)(y)

// Inverts the argument order
// λbxy.byx
const Not = b => x => y => b(y)(x)
const Flip = Not

// ## Data Types

// Pair :: Any -> Any -> Boolean f -> Any
// λabf.fab
const Pair = a => b => f => f(a)(b)


// Return the first argument from the pair
// First :: Pair <Any, Any> -> Any
// λp.p(λxy.x)
const First = p => p(True)

// Return the second argument from the pair
// Second :: Pair -> Any
// λp.p(λxy.y)
const Second = p => p(False)

// λxp.Pair x (Second p)
const ReplaceFirst = x => p => Pair(x)(Second(p))

const ReplaceSecond = x => p => Pair(First(p))(x)

const BiMap = f => g => p => Pair(f(First(p)))(g(Second(p)))

// Phi takes a Number Pair and shifts the values left and increments the second by one
// Phi :: Pair <Number, Number> -> Pair
const Phi = p => Pair(Second(p))(Increment(Second(p)))

// Standard functional composition
// λfgx.fgx
const Compose = f => g => x => f(g(x))

// Apply a function to a value once
// λfx.fx
const Once = fn => x => fn(x)

// Apply a function to a value twice
// λfx.ffx
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
// λn.n(K False True)
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


export {
	True,
	False,
	If,
	And,
	Or,
	Not,
	Flip,
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
	Compose,
	Pair,
	First,
	Second,
	BiMap,
	ReplaceFirst,
	ReplaceSecond,
	Phi,
	Zero,
	One,
	Two,
	Three,
	Four,
	Five,
	Nothing,
}
