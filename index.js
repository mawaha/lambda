const { IO } = require('./adts.js')

// Simple logging function
log = (message) => IO( console.log.bind(null, message) )

IO.of(5)
	.map( x => x * 2 )
	.map( x => x + 1 )
	.chain( x => IO.of(100).map( y => x + y + 1))
	.chain( x => log(x))
	.run()
