import { True, False, First, Second, Pair } from './lamb.js'
import { Id } from './combinators.js'

// # Data Structures

// ## List

const Nil = Pair (False) (False)

// λalfx.fa(lfx)
const Cons = head => list => f => x => f (head) ( list (f) (x) )

// λl.l(λab.a)(any expression)
const Head = list => list(a => b => a)(Id)

// λl.first( l( λab.pair(second b)(append a (second b)))(pair empty empty))
const Tail = list => First (
					list (
						a => b => Pair
							(Second (b))
							(Cons (a) (Second(b)))
						)
						(Nil)
					)
// λl.l(λab.false)true
const isEmpty = list => list
					( a => b => False )
					( True )

export {
	Cons,
	Head,
	Tail,
	isEmpty,
	Nil,
}
