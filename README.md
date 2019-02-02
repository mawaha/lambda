# lambda
Experiments with lambda calculus

Uses javascript to perform church encodings of natural numbers, data structures, and operators.

Uses these encodings to perform simple calculations such as the Fibonacci sequence and Factorials.

The idea is to perform as much application logic in the lambda domain and stick as closely as possible to functional programming practices.

## Instructions
`npm start` runs the application

`npm test` runs the test suite

## Notes
Larger numbers entered into the Fibonacci generator still suffer from a stack size error and as such will only work up to a point. This is due to a lack of tail call optimization within JavaScript. To get around this I'll be implementing trampolining, which is a little hacky but the best solution I have at this time.


## Lambda

Lambda functions are written in the form λx.E where E represents an expression which can be one of three things:
A variable, an application, or another expression.

| Type        | Lambda | JavaScript |
| ----------- | ------ | ---------- |
| Variable    | x      | x          |
| Application | fx     | f(x)       |
| Expression  | λx.x   | x => x     |

The Lambda symbol λ represents a function which has two parts, the arguments on the left, and the body on the right.
Lambda functions only accept one argument, as such λab is shorthand for λa.λb
Any variable in the body of the function, for example x in λx.x, that is declared in the function arguments is considered 'bound'.
Any variable that does not, for example y in λx.xy, is considered free.
A function that contains only 'bound' variables is called 'pure'
