
// IO Monad
// Wraps a function that implements side effects
const IO = x => ({
	x,
	map: f => IO(() => f(x())),
	chain: f => IO(() => f(x()).run()),
	inspect: () => `IO(${x})`,
	run: () => x(),
	runWith: a => x(a)
})

IO.of = x => IO(() => x)

module.exports = {
	IO
}