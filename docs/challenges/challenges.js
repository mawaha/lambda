// Lambda Calculus Challenge Definitions

// Prelude - available to all challenges
export const prelude = {
	// Combinators
	I: x => x,
	K: x => _ => x,
	M: f => f(f),
	Y: f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v))),

	// Booleans
	TRUE: x => y => x,
	FALSE: x => y => y,

	// Numerals
	ZERO: f => x => x,
	ONE: f => x => f(x),
	TWO: f => x => f(f(x)),
	THREE: f => x => f(f(f(x))),
	SUCC: n => f => x => f(n(f)(x)),

	// Data structures
	PAIR: a => b => f => f(a)(b),

	// Utilities for testing
	toInt: n => n(x => x + 1)(0),
	toChurch: n => {
		if (n === 0) return f => x => x
		return f => x => {
			let result = x
			for (let i = 0; i < n; i++) result = f(result)
			return result
		}
	},
	toBool: b => b(true)(false),
}

// Challenge definitions
export const challenges = [
	// Chapter 1: Lambda Notation
	{
		id: 'identity',
		chapter: 1,
		title: 'The Identity Function',
		difficulty: 'beginner',
		description: 'Create the Identity function - it should return its argument unchanged.',
		concepts: ['The simplest possible function', 'In lambda notation: λx.x'],
		hint: 'A function that just returns what it receives.',
		starterCode: 'const I = ',
		solution: 'const I = x => x',
		exportName: 'I',
		tests: [
			{ args: [5], expected: 5, description: 'I(5) returns 5' },
			{ args: ['hello'], expected: 'hello', description: 'I("hello") returns "hello"' },
			{ args: [null], expected: null, description: 'I(null) returns null' },
			{ custom: 'I(I) === I', description: 'I(I) returns I itself' },
		],
	},

	// Chapter 2: Combinators
	{
		id: 'constant',
		chapter: 2,
		title: 'The Constant Combinator (K)',
		difficulty: 'beginner',
		description: 'Create the K combinator - it takes two arguments and always returns the first.',
		concepts: ['Curried function (returns a function)', 'Ignores the second argument', 'In lambda notation: λx.λy.x'],
		hint: 'Return a function that ignores its argument and returns the original value.',
		starterCode: 'const K = ',
		solution: 'const K = x => y => x',
		exportName: 'K',
		tests: [
			{ args: [5, 10], expected: 5, description: 'K(5)(10) returns 5' },
			{ args: ['first', 'second'], expected: 'first', description: 'K("first")("second") returns "first"' },
			{ args: [true, false], expected: true, description: 'K(true)(false) returns true' },
		],
	},
	{
		id: 'kite',
		chapter: 2,
		title: 'The Kite Combinator (KI)',
		difficulty: 'beginner',
		description: 'Create the Kite combinator - it takes two arguments and always returns the second.',
		concepts: ['Opposite of K', 'Can be derived as K(I)', 'In lambda notation: λx.λy.y'],
		hint: 'The first argument is ignored completely.',
		starterCode: 'const KI = ',
		solution: 'const KI = x => y => y',
		exportName: 'KI',
		tests: [
			{ args: [5, 10], expected: 10, description: 'KI(5)(10) returns 10' },
			{ args: ['first', 'second'], expected: 'second', description: 'KI("first")("second") returns "second"' },
		],
	},
	{
		id: 'self-apply',
		chapter: 2,
		title: 'Self-Application (M)',
		difficulty: 'intermediate',
		description: 'Create the M combinator (Mockingbird) - it applies a function to itself.',
		concepts: ['Self-application is key to recursion', 'In lambda notation: λf.ff', 'Warning: M(M) causes infinite loop!'],
		hint: 'Take a function and call it with itself as the argument.',
		starterCode: 'const M = ',
		solution: 'const M = f => f(f)',
		exportName: 'M',
		tests: [
			{ custom: 'M(I) === I', description: 'M(I) returns I' },
			{ custom: 'M(K)(5) === K', description: 'M(K)(5) returns K' },
		],
	},

	// Chapter 3: Church Booleans
	{
		id: 'true',
		chapter: 3,
		title: 'Church TRUE',
		difficulty: 'beginner',
		description: 'Create the Church encoding of TRUE - a function that selects its first argument.',
		concepts: ['Booleans are selector functions', 'TRUE picks the first option', 'In lambda notation: λx.λy.x'],
		hint: 'TRUE is actually the same as K!',
		starterCode: 'const TRUE = ',
		solution: 'const TRUE = x => y => x',
		exportName: 'TRUE',
		tests: [
			{ args: ['yes', 'no'], expected: 'yes', description: 'TRUE("yes")("no") returns "yes"' },
			{ args: [1, 2], expected: 1, description: 'TRUE(1)(2) returns 1' },
		],
	},
	{
		id: 'false',
		chapter: 3,
		title: 'Church FALSE',
		difficulty: 'beginner',
		description: 'Create the Church encoding of FALSE - a function that selects its second argument.',
		concepts: ['FALSE picks the second option', 'In lambda notation: λx.λy.y'],
		hint: 'FALSE is actually the same as KI!',
		starterCode: 'const FALSE = ',
		solution: 'const FALSE = x => y => y',
		exportName: 'FALSE',
		tests: [
			{ args: ['yes', 'no'], expected: 'no', description: 'FALSE("yes")("no") returns "no"' },
			{ args: [1, 2], expected: 2, description: 'FALSE(1)(2) returns 2' },
		],
	},
	{
		id: 'not',
		chapter: 3,
		title: 'Logical NOT',
		difficulty: 'intermediate',
		description: 'Create the NOT function - it flips TRUE to FALSE and FALSE to TRUE.',
		concepts: ['Swap the arguments to the boolean', 'In lambda notation: λb.λx.λy.byx'],
		hint: 'A Church boolean selects between two options. NOT should swap which one gets selected.',
		given: ['TRUE = x => y => x', 'FALSE = x => y => y'],
		starterCode: 'const NOT = ',
		solution: 'const NOT = b => x => y => b(y)(x)',
		exportName: 'NOT',
		tests: [
			{ customSetup: 'const result = NOT(TRUE)', custom: 'toBool(result) === false', description: 'NOT(TRUE) returns FALSE' },
			{ customSetup: 'const result = NOT(FALSE)', custom: 'toBool(result) === true', description: 'NOT(FALSE) returns TRUE' },
			{ customSetup: 'const result = NOT(NOT(TRUE))', custom: 'toBool(result) === true', description: 'NOT(NOT(TRUE)) returns TRUE' },
		],
	},
	{
		id: 'and',
		chapter: 3,
		title: 'Logical AND',
		difficulty: 'intermediate',
		description: 'Create the AND function - returns TRUE only if both arguments are TRUE.',
		concepts: ['If first is TRUE, result depends on second', 'If first is FALSE, result is FALSE', 'In lambda notation: λx.λy.xyx'],
		hint: 'Use the first boolean to choose: if TRUE, return the second; if FALSE, return FALSE (which is the first).',
		given: ['TRUE = x => y => x', 'FALSE = x => y => y'],
		starterCode: 'const AND = ',
		solution: 'const AND = x => y => x(y)(x)',
		exportName: 'AND',
		tests: [
			{ customSetup: 'const result = AND(TRUE)(TRUE)', custom: 'toBool(result) === true', description: 'AND(TRUE)(TRUE) returns TRUE' },
			{ customSetup: 'const result = AND(TRUE)(FALSE)', custom: 'toBool(result) === false', description: 'AND(TRUE)(FALSE) returns FALSE' },
			{ customSetup: 'const result = AND(FALSE)(TRUE)', custom: 'toBool(result) === false', description: 'AND(FALSE)(TRUE) returns FALSE' },
			{ customSetup: 'const result = AND(FALSE)(FALSE)', custom: 'toBool(result) === false', description: 'AND(FALSE)(FALSE) returns FALSE' },
		],
	},
	{
		id: 'or',
		chapter: 3,
		title: 'Logical OR',
		difficulty: 'intermediate',
		description: 'Create the OR function - returns TRUE if either argument is TRUE.',
		concepts: ['If first is TRUE, result is TRUE', 'If first is FALSE, result depends on second', 'In lambda notation: λx.λy.xxy'],
		hint: 'Use the first boolean to choose: if TRUE, return TRUE (which is the first); if FALSE, return the second.',
		given: ['TRUE = x => y => x', 'FALSE = x => y => y'],
		starterCode: 'const OR = ',
		solution: 'const OR = x => y => x(x)(y)',
		exportName: 'OR',
		tests: [
			{ customSetup: 'const result = OR(TRUE)(TRUE)', custom: 'toBool(result) === true', description: 'OR(TRUE)(TRUE) returns TRUE' },
			{ customSetup: 'const result = OR(TRUE)(FALSE)', custom: 'toBool(result) === true', description: 'OR(TRUE)(FALSE) returns TRUE' },
			{ customSetup: 'const result = OR(FALSE)(TRUE)', custom: 'toBool(result) === true', description: 'OR(FALSE)(TRUE) returns TRUE' },
			{ customSetup: 'const result = OR(FALSE)(FALSE)', custom: 'toBool(result) === false', description: 'OR(FALSE)(FALSE) returns FALSE' },
		],
	},

	// Chapter 4: Church Numerals
	{
		id: 'zero',
		chapter: 4,
		title: 'Church ZERO',
		difficulty: 'beginner',
		description: 'Create the Church encoding of ZERO - apply a function zero times.',
		concepts: ['Numbers are "how many times to apply a function"', 'ZERO applies f zero times (just returns x)', 'In lambda notation: λf.λx.x'],
		hint: 'ZERO is the same as FALSE - it ignores f and returns x.',
		starterCode: 'const ZERO = ',
		solution: 'const ZERO = f => x => x',
		exportName: 'ZERO',
		tests: [
			{ custom: 'toInt(ZERO) === 0', description: 'ZERO converts to 0' },
			{ custom: 'ZERO(x => x + 1)(0) === 0', description: 'ZERO(increment)(0) returns 0' },
		],
	},
	{
		id: 'succ',
		chapter: 4,
		title: 'Successor Function',
		difficulty: 'intermediate',
		description: 'Create SUCC - given a Church numeral n, return n+1.',
		concepts: ['Add one more application of f', 'In lambda notation: λn.λf.λx.f(nfx)'],
		hint: 'Apply f one more time to what n(f)(x) produces.',
		given: ['ZERO = f => x => x', 'ONE = f => x => f(x)'],
		starterCode: 'const SUCC = ',
		solution: 'const SUCC = n => f => x => f(n(f)(x))',
		exportName: 'SUCC',
		tests: [
			{ custom: 'toInt(SUCC(ZERO)) === 1', description: 'SUCC(ZERO) equals ONE' },
			{ custom: 'toInt(SUCC(ONE)) === 2', description: 'SUCC(ONE) equals TWO' },
			{ custom: 'toInt(SUCC(SUCC(SUCC(ZERO)))) === 3', description: 'SUCC(SUCC(SUCC(ZERO))) equals THREE' },
		],
	},
	{
		id: 'add',
		chapter: 4,
		title: 'Addition',
		difficulty: 'intermediate',
		description: 'Create ADD - add two Church numerals together.',
		concepts: ['Apply SUCC n times to m', 'In lambda notation: λn.λm.n(SUCC)(m)'],
		hint: 'Use n to apply SUCC repeatedly to m.',
		given: ['SUCC = n => f => x => f(n(f)(x))'],
		starterCode: 'const ADD = ',
		solution: 'const ADD = n => m => n(SUCC)(m)',
		exportName: 'ADD',
		tests: [
			{ custom: 'toInt(ADD(ONE)(TWO)) === 3', description: 'ADD(ONE)(TWO) equals THREE' },
			{ custom: 'toInt(ADD(ZERO)(THREE)) === 3', description: 'ADD(ZERO)(THREE) equals THREE' },
			{ custom: 'toInt(ADD(TWO)(TWO)) === 4', description: 'ADD(TWO)(TWO) equals FOUR' },
		],
	},
	{
		id: 'mult',
		chapter: 4,
		title: 'Multiplication',
		difficulty: 'advanced',
		description: 'Create MULT - multiply two Church numerals.',
		concepts: ['Composition of numerals', 'Apply f (n*m) times', 'In lambda notation: λn.λm.λf.n(mf)'],
		hint: 'n(m(f)) applies f m times, n times.',
		given: ['TWO = f => x => f(f(x))', 'THREE = f => x => f(f(f(x)))'],
		starterCode: 'const MULT = ',
		solution: 'const MULT = n => m => f => n(m(f))',
		exportName: 'MULT',
		tests: [
			{ custom: 'toInt(MULT(TWO)(THREE)) === 6', description: 'MULT(TWO)(THREE) equals SIX' },
			{ custom: 'toInt(MULT(ONE)(THREE)) === 3', description: 'MULT(ONE)(THREE) equals THREE' },
			{ custom: 'toInt(MULT(ZERO)(THREE)) === 0', description: 'MULT(ZERO)(THREE) equals ZERO' },
		],
	},

	// Chapter 5: Data Structures
	{
		id: 'pair',
		chapter: 5,
		title: 'PAIR Constructor',
		difficulty: 'intermediate',
		description: 'Create PAIR - a data structure that holds two values.',
		concepts: ['Pairs store data as a closure', 'Takes a selector function to retrieve values', 'In lambda notation: λa.λb.λf.fab'],
		hint: 'Store a and b by returning a function that applies a selector to them.',
		starterCode: 'const PAIR = ',
		solution: 'const PAIR = a => b => f => f(a)(b)',
		exportName: 'PAIR',
		tests: [
			{ custom: 'PAIR(1)(2)(TRUE) === 1', description: 'PAIR(1)(2)(TRUE) returns 1 (first)' },
			{ custom: 'PAIR(1)(2)(FALSE) === 2', description: 'PAIR(1)(2)(FALSE) returns 2 (second)' },
			{ custom: 'PAIR("a")("b")(TRUE) === "a"', description: 'PAIR("a")("b")(TRUE) returns "a"' },
		],
	},
	{
		id: 'fst',
		chapter: 5,
		title: 'FST (First)',
		difficulty: 'beginner',
		description: 'Create FST - extract the first element from a pair.',
		concepts: ['Use TRUE as the selector', 'In lambda notation: λp.p(TRUE)'],
		hint: 'Pass TRUE to the pair - it will select the first element.',
		given: ['PAIR = a => b => f => f(a)(b)', 'TRUE = x => y => x'],
		starterCode: 'const FST = ',
		solution: 'const FST = p => p(TRUE)',
		exportName: 'FST',
		tests: [
			{ customSetup: 'const p = PAIR(1)(2)', custom: 'FST(p) === 1', description: 'FST(PAIR(1)(2)) returns 1' },
			{ customSetup: 'const p = PAIR("hello")("world")', custom: 'FST(p) === "hello"', description: 'FST(PAIR("hello")("world")) returns "hello"' },
		],
	},
	{
		id: 'snd',
		chapter: 5,
		title: 'SND (Second)',
		difficulty: 'beginner',
		description: 'Create SND - extract the second element from a pair.',
		concepts: ['Use FALSE as the selector', 'In lambda notation: λp.p(FALSE)'],
		hint: 'Pass FALSE to the pair - it will select the second element.',
		given: ['PAIR = a => b => f => f(a)(b)', 'FALSE = x => y => y'],
		starterCode: 'const SND = ',
		solution: 'const SND = p => p(FALSE)',
		exportName: 'SND',
		tests: [
			{ customSetup: 'const p = PAIR(1)(2)', custom: 'SND(p) === 2', description: 'SND(PAIR(1)(2)) returns 2' },
			{ customSetup: 'const p = PAIR("hello")("world")', custom: 'SND(p) === "world"', description: 'SND(PAIR("hello")("world")) returns "world"' },
		],
	},

	// Chapter 6: Recursion with Y
	{
		id: 'iszero',
		chapter: 6,
		title: 'ISZERO Predicate',
		difficulty: 'intermediate',
		description: 'Create ISZERO - returns TRUE if the numeral is ZERO, FALSE otherwise.',
		concepts: ['Key for recursive base cases', 'ZERO applies f zero times, so we can detect it', 'In lambda notation: λn.n(K(FALSE))(TRUE)'],
		hint: 'If n is ZERO, f is never applied, so start with TRUE. Any application of f should give FALSE.',
		given: ['TRUE = x => y => x', 'FALSE = x => y => y', 'K = x => y => x'],
		starterCode: 'const ISZERO = ',
		solution: 'const ISZERO = n => n(K(FALSE))(TRUE)',
		exportName: 'ISZERO',
		tests: [
			{ customSetup: 'const result = ISZERO(ZERO)', custom: 'toBool(result) === true', description: 'ISZERO(ZERO) returns TRUE' },
			{ customSetup: 'const result = ISZERO(ONE)', custom: 'toBool(result) === false', description: 'ISZERO(ONE) returns FALSE' },
			{ customSetup: 'const result = ISZERO(THREE)', custom: 'toBool(result) === false', description: 'ISZERO(THREE) returns FALSE' },
		],
	},
	{
		id: 'factorial-y',
		chapter: 6,
		title: 'Factorial with Y-Combinator',
		difficulty: 'advanced',
		description: 'Create the factorial step function to use with Y-combinator.',
		concepts: [
			'Y enables recursion without self-reference',
			'Write a function that takes "recurse" as first argument',
			'The Y combinator handles the self-application'
		],
		hint: 'Write: recurse => n => (base case) ? 1 : n * recurse(n-1). Use JavaScript numbers for simplicity.',
		given: ['Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)))'],
		starterCode: '// Complete the step function\nconst factorialStep = ',
		solution: 'const factorialStep = recurse => n => n === 0 ? 1 : n * recurse(n - 1)',
		exportName: 'factorialStep',
		tests: [
			{ custom: 'Y(factorialStep)(0) === 1', description: 'Y(factorialStep)(0) returns 1' },
			{ custom: 'Y(factorialStep)(1) === 1', description: 'Y(factorialStep)(1) returns 1' },
			{ custom: 'Y(factorialStep)(5) === 120', description: 'Y(factorialStep)(5) returns 120' },
			{ custom: 'Y(factorialStep)(6) === 720', description: 'Y(factorialStep)(6) returns 720' },
		],
	},
]

// Chapter metadata
export const chapters = [
	{ num: 1, title: 'Lambda Notation', path: '../chapters/01-lambda-notation.html' },
	{ num: 2, title: 'Combinators', path: '../chapters/02-combinators.html' },
	{ num: 3, title: 'Church Encodings', path: '../chapters/03-church-encodings.html' },
	{ num: 4, title: 'Numerals', path: '../chapters/04-numerals.html' },
	{ num: 5, title: 'Data Structures', path: '../chapters/05-data-structures.html' },
	{ num: 6, title: 'Recursion', path: '../chapters/06-recursion.html' },
	{ num: 7, title: 'Turing Completeness', path: '../chapters/07-turing-completeness.html' },
]
