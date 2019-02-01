var rl = require('readline');
const Reader = require('crocks/Reader')
const IO = require('crocks/IO')
const { Fibonacci } = require('./fibonacci.js')
const { toChurch, toInt, tap } = require('./utils.js')


// Simple logging function
const log = (message) => IO( console.log.bind(null, message) )

const getStdIn = () => Reader(process => process.stdin)

const setEncoding = stdin => {
	stdin.setEncoding('utf-8')
	return stdin
}

const getInput = callback => stdin => {
	stdin.on('data', callback)
}

const playFibonacci = (data) => {

    // User input exit.
    if(data === 'exit\n'){
        // Program exit.
        console.log("exiting");
        process.exit();
    } else {
        // Print user input in console.
        const index = toChurch(+data)
        const value = Fibonacci(index)() // TODO: Need to implement trampolining
        const fib = toInt(value)
        console.log('Fibonacci Number: ' + fib)
        process.exit()
    }
}

getStdIn()
	.map( setEncoding )
	.map( getInput(playFibonacci) )
	.runWith(process)
