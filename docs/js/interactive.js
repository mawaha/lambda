// Interactive Demo Framework

export class InteractiveDemo {
	constructor(containerId) {
		this.container = document.getElementById(containerId)
		this.demos = {}
		this.widgets = {}
	}

	// Register a demo that runs automatically on page load
	registerDemo(id, fn) {
		this.demos[id] = fn
	}

	// Register an interactive widget with user input
	registerWidget(id, config) {
		this.widgets[id] = config
	}

	// Run all registered demos
	runDemos() {
		Object.entries(this.demos).forEach(([id, fn]) => {
			const element = document.getElementById(id)
			if (element) {
				try {
					const result = fn()
					this.renderResult(element, result)
				} catch (error) {
					this.renderError(element, error)
				}
			}
		})
	}

	// Setup all registered widgets
	setupWidgets() {
		Object.entries(this.widgets).forEach(([id, config]) => {
			const element = document.getElementById(id)
			if (element) {
				this.createWidget(element, config)
			}
		})
	}

	// Create an interactive widget
	createWidget(element, config) {
		const { inputs, compute, maxValue } = config

		const form = document.createElement('form')
		form.className = 'widget-form'

		const inputElements = {}

		// Create input fields
		inputs.forEach(input => {
			const fieldDiv = document.createElement('div')
			fieldDiv.className = 'widget-field'

			const label = document.createElement('label')
			label.textContent = input.label
			label.htmlFor = input.name

			const inputEl = document.createElement('input')
			inputEl.type = input.type || 'number'
			inputEl.id = input.name
			inputEl.name = input.name
			inputEl.min = input.min !== undefined ? input.min : 0
			inputEl.max = input.max !== undefined ? input.max : (maxValue || 20)
			inputEl.value = input.default !== undefined ? input.default : 0

			fieldDiv.appendChild(label)
			fieldDiv.appendChild(inputEl)
			form.appendChild(fieldDiv)

			inputElements[input.name] = inputEl
		})

		// Create compute button
		const button = document.createElement('button')
		button.type = 'submit'
		button.textContent = 'Compute'
		button.className = 'widget-button'
		form.appendChild(button)

		// Create result container
		const resultDiv = document.createElement('div')
		resultDiv.className = 'widget-result'

		// Handle form submission
		form.addEventListener('submit', (e) => {
			e.preventDefault()

			const values = {}
			Object.entries(inputElements).forEach(([name, el]) => {
				// Parse as number only if input type is 'number', otherwise keep as string
				values[name] = el.type === 'number' ? parseInt(el.value, 10) : el.value
			})

			// Check max values
			if (maxValue) {
				const tooLarge = Object.values(values).some(v => v > maxValue)
				if (tooLarge) {
					this.renderError(resultDiv, new Error(
						`Value exceeds safe limit of ${maxValue}. Lambda calculus recursion in JavaScript can cause stack overflow for large values. Try a smaller number.`
					))
					return
				}
			}

			try {
				const result = compute(values)
				this.renderResult(resultDiv, result)
			} catch (error) {
				this.renderError(resultDiv, error)
			}
		})

		element.appendChild(form)
		element.appendChild(resultDiv)
	}

	// Render a successful result
	renderResult(element, result) {
		if (typeof result === 'object' && result.error) {
			this.renderError(element, new Error(result.message))
			return
		}

		element.className = 'demo-result success'
		element.innerHTML = `<strong>Result:</strong> ${this.formatResult(result)}`
	}

	// Render an error
	renderError(element, error) {
		element.className = 'demo-result error'

		let message = error.message

		// Add helpful context for stack overflow
		if (message.includes('stack') || message.includes('recursion')) {
			message += '<br><br><em>Note: Lambda calculus uses recursion which can exceed JavaScript\'s call stack limit. This is a limitation of the JavaScript runtime, not lambda calculus itself. Advanced techniques like trampolining can work around this.</em>'
		}

		element.innerHTML = `<strong>Error:</strong> ${message}`
	}

	// Format result for display
	formatResult(result) {
		if (Array.isArray(result)) {
			return `[${result.join(', ')}]`
		}
		if (typeof result === 'boolean') {
			return result ? 'True' : 'False'
		}
		if (typeof result === 'object') {
			// Check if it's a step-by-step result
			if (result.steps) {
				return this.renderSteps(result.steps)
			}
			return JSON.stringify(result, null, 2)
		}
		return String(result)
	}

	// Render step-by-step reduction
	renderSteps(steps) {
		let html = '<div class="reduction-steps">'

		steps.forEach((step, index) => {
			const isFirst = index === 0
			const isLast = index === steps.length - 1

			html += `
				<div class="reduction-step ${isLast ? 'final' : ''}">
					<div class="step-header">
						<span class="step-number">${isFirst ? 'Start' : `Step ${index}`}</span>
						${step.label ? `<span class="step-label">${step.label}</span>` : ''}
					</div>
					<div class="step-expression">${this.highlightExpression(step.expression, step.highlight)}</div>
					${step.explanation ? `<div class="step-explanation">${step.explanation}</div>` : ''}
				</div>
			`

			if (!isLast) {
				html += '<div class="step-arrow">↓</div>'
			}
		})

		html += '</div>'
		return html
	}

	// Highlight parts of an expression
	highlightExpression(expression, highlight) {
		if (!highlight) return `<code>${expression}</code>`

		// Replace the highlighted part with a span
		const highlighted = expression.replace(highlight, `<mark>${highlight}</mark>`)
		return `<code>${highlighted}</code>`
	}
}

// Execute a lambda function safely with error handling
export function safeLambda(fn, errorContext = '') {
	try {
		return fn()
	} catch (error) {
		return {
			error: true,
			message: `${errorContext ? errorContext + ': ' : ''}${error.message}`
		}
	}
}
