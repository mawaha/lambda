// Lambda Calculus Visualizer

export class ReductionVisualizer {
	constructor() {
		this.steps = []
	}

	addStep(expression, description) {
		this.steps.push({ expression, description })
		return this
	}

	render(containerId) {
		const container = document.getElementById(containerId)
		if (!container) return

		const html = this.steps.map((step, index) => {
			const arrow = index < this.steps.length - 1 ? '<div class="reduction-arrow">↓</div>' : ''
			return `
				<div class="reduction-step">
					<div class="step-number">Step ${index + 1}</div>
					<div class="step-expression"><code>${this.escapeHtml(step.expression)}</code></div>
					<div class="step-description">${step.description}</div>
				</div>
				${arrow}
			`
		}).join('')

		container.innerHTML = `<div class="reduction-visualizer">${html}</div>`
	}

	escapeHtml(text) {
		const div = document.createElement('div')
		div.textContent = text
		return div.innerHTML
	}
}

export class NumeralVisualizer {
	// Visualize a Church numeral as dots
	static visualize(n, label = '') {
		const dots = '●'.repeat(n)
		const labelHtml = label ? `<strong>${label}:</strong> ` : ''
		return `<div class="numeral-visual">${labelHtml}<span class="dots">${dots}</span> <span class="count">(${n})</span></div>`
	}

	// Visualize an arithmetic operation
	static visualizeOperation(a, b, op, result) {
		const ops = {
			add: '+',
			subtract: '−',
			multiply: '×',
			power: '^'
		}

		const symbol = ops[op] || '?'

		return `
			<div class="operation-visual">
				${this.visualize(a, 'a')}
				<div class="operator">${symbol}</div>
				${this.visualize(b, 'b')}
				<div class="equals">=</div>
				${this.visualize(result, 'result')}
			</div>
		`
	}
}

export class ListVisualizer {
	// Visualize a Church list as nested pairs
	static visualizePairs(arr) {
		if (arr.length === 0) {
			return '<div class="list-visual">Nil</div>'
		}

		const buildPair = (items, index = 0) => {
			if (index >= items.length) {
				return '<span class="nil">Nil</span>'
			}

			return `
				<div class="pair">
					<div class="pair-label">Pair</div>
					<div class="pair-contents">
						<div class="pair-first">
							<div class="pair-label-small">First</div>
							<div class="value">${items[index]}</div>
						</div>
						<div class="pair-second">
							<div class="pair-label-small">Second</div>
							${buildPair(items, index + 1)}
						</div>
					</div>
				</div>
			`
		}

		return `<div class="list-visual">${buildPair(arr)}</div>`
	}

	// Simple list visualization
	static visualizeSimple(arr) {
		if (arr.length === 0) {
			return '<div class="list-simple">Empty List (Nil)</div>'
		}

		const items = arr.map(item => `<div class="list-item">${item}</div>`).join('')
		return `<div class="list-simple">${items}</div>`
	}
}

// Syntax highlighter for lambda expressions
export class LambdaSyntax {
	static highlight(code) {
		// Replace lambda symbol
		code = code.replace(/λ/g, '<span class="lambda">λ</span>')

		// Highlight function names (capitalized words)
		code = code.replace(/\b([A-Z][a-z]+)\b/g, '<span class="function">$1</span>')

		// Highlight numbers
		code = code.replace(/\b(Zero|One|Two|Three|Four|Five|[0-9]+)\b/g, '<span class="number">$1</span>')

		// Highlight booleans
		code = code.replace(/\b(True|False)\b/g, '<span class="boolean">$1</span>')

		return code
	}
}
