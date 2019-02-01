const { Fibonacci } = require('./fibonacci.js')
const { Factorial } = require('./factorial.js')
const { IO } = require('./adts.js')
const { If, Pair, True, False, And, Or, Not, First, Second, EQ, Add, Subtract, Multiply, isZero, isOne, Zero, One, Two, Three, Four } = require('./lamb.js')
const { Append, Head, Tail, isEmpty, Nil } = require('./data.js')

// Simple logging functions
const log = (...args) => console.log.bind(null, ...args)
const err = (...args) => console.error.bind(null, ...args)

// Assert :: Boolean -> String -> IO
const Assert = b => msg => If(b)
						(log('True', msg))
						(err('False', msg))

// Assert :: Boolean -> String -> IO
const Refute = b => msg => Assert(Not(b))(msg)

log('Testing Lambda Functions')()

log('Data Types')()

log('Boolean Values')()
Assert(True)('True is true')()
Refute(False)('False is not True')()

log('Pairs')()
Assert(First(Pair(True)(False)))('First value in Pair is True')()
Assert(Second(Pair(False)(True)))('Second value in Pair is True')()

// // Logical Operators
log('Logical Operators')()

log('And')()
Assert(And(True)(True))('True And True is True')()
Refute(And(True)(False))('True And False is False')()
Refute(And(False)(True))('False And True is False')()
Refute(And(False)(False))('False And False is False')()

log('Or')()
Assert(Or(True)(True))('True or True is True')()
Assert(Or(True)(False))('True or False is True')()
Assert(Or(False)(True))('False or True is True')()
Refute(Or(False)(False))('False or False is not True')()

// Predicates
log('Predicates')()
Assert(isZero(Zero))('zero is zero')()
Refute(isZero(One))('one is not zero')()
Refute(isZero(Two))('two is not zero')()
Refute(isZero(Three))('three is not zero')()

// // Equality
log('Equality')()
Assert(EQ(Zero)(Zero))('zero is equal to zero')()
Refute(EQ(Zero)(One))('zero is not equal to one')()
Refute(EQ(One)(Zero))('zero is not equal to one')()
Assert(EQ(One)(One))('one is equal to one')()
Assert(EQ(Two)(Two))('two is equal to two')()
Refute(EQ(One)(Two))('two is not equal to one')()
Assert(EQ(Three)(Three))('Three is equal to three')()
Refute(EQ(Two)(Three))('Three is not equal to two')()
Refute(EQ(One)(Three))('Three is not equal to one')()
Refute(EQ(Zero)(Three))('Three is not equal to zero')()

const {toInt} = require('./utils.js')

log('Subtraction')()
Assert(isZero(Subtract(Zero)(Zero)))('Zero minus zero is zero')()
Assert(isOne(Subtract(One)(Zero)))('One minus zero is one')()
Assert(isZero(Subtract(Zero)(One)))('Zero minus one is zero')()
Assert(isZero(Subtract(One)(One)))('One minus one is zero')()
Assert(isZero(Subtract(One)(Two)))('One minus two is zero')()
Assert(isOne(Subtract(Two)(One)))('Two minus one is one')()

log('Addition')()
Assert(isZero(Add(Zero)(Zero)))('Zero plus zero is zero')()
Assert(isOne(Add(Zero)(One)))('Zero plus one is one')()
Assert(isOne(Add(One)(Zero)))('One plus zero is one')()
Assert(EQ(Add(One)(One))(Two))('One plus one is two')()


log('Fibonacci')()
Assert( isZero( Fibonacci(Zero)() ) )('The zeroth number in the fibonacci sequence is zero')()
Assert( isOne( Fibonacci(One)() ) )('The first number in the fibonacci sequence is one')()
Assert( isOne( Fibonacci(Two)() ) )('The second number in the fibonacci sequence is one')()
Assert( EQ( Fibonacci(Three)() )( Two ) )('The third number in the fibonacci sequence is two')()
Assert( EQ( Fibonacci(Four)() )( Three ) )('The fourth number in the fibonacci sequence is three')()

log('Factorial')()
Assert( isOne(Factorial(Zero)()) )('Factorial zero is one')()
Assert( isOne(Factorial(One)()) )('Factorial one is one')()
Assert( EQ(Factorial(Two)())(Two) )('Factorial two is two')()
Assert( EQ(Factorial(Three)())( Multiply(Two)(Three) ) )('Factorial three is six')()

log('Lists')()
const list = Append(One)(Append(Two)(Append(Three)(Nil)))

Assert( EQ(Head(list))(One) ) ('First value in list equals one')()
Assert( EQ(Head(Tail(list)))(Two) ) ('Second value in list equals two')()
Assert( EQ( Head( Tail( Tail(list) ))) (Three) ) ('Third value in list equals three')()
Assert( isEmpty( Tail( Tail( Tail(list) ))) ) ('Last item in list is empty')()


