// Lambda Challenges - Application Logic

import { challenges, chapters, prelude } from './challenges.js'

// State
let currentChallenge = null
let editor = null
let completedChallenges = new Set(JSON.parse(localStorage.getItem('lambda-challenges-completed') || '[]'))

// Initialize the app
export async function init() {
	// Handle hash navigation
	window.addEventListener('hashchange', handleRoute)
	handleRoute()
}

// Route handler
function handleRoute() {
	const hash = window.location.hash.slice(1) // Remove #

	if (!hash) {
		renderChallengeList()
	} else {
		const challenge = challenges.find(c => c.id === hash)
		if (challenge) {
			renderChallenge(challenge)
		} else {
			// Try chapter/id format
			const parts = hash.split('/')
			if (parts.length === 2) {
				const chapterNum = parseInt(parts[0].replace('chapter', ''))
				const id = parts[1]
				const found = challenges.find(c => c.chapter === chapterNum && c.id === id)
				if (found) {
					renderChallenge(found)
					return
				}
			}
			renderChallengeList()
		}
	}
}

// Render challenge list (home view)
function renderChallengeList() {
	currentChallenge = null
	const app = document.getElementById('app')

	const challengesByChapter = {}
	challenges.forEach(c => {
		if (!challengesByChapter[c.chapter]) {
			challengesByChapter[c.chapter] = []
		}
		challengesByChapter[c.chapter].push(c)
	})

	const completedCount = completedChallenges.size
	const totalCount = challenges.length

	app.innerHTML = `
		<header class="challenge-header">
			<h1><a href="#">Lambda Challenges</a></h1>
			<div class="header-controls">
				<span class="progress-badge">${completedCount}/${totalCount} completed</span>
			</div>
		</header>
		<div class="challenge-list">
			<h1>Lambda Calculus Challenges</h1>
			<p class="subtitle">Practice implementing lambda calculus concepts in JavaScript</p>
			${Object.entries(challengesByChapter).map(([chapterNum, chapterChallenges]) => {
				const chapter = chapters.find(c => c.num === parseInt(chapterNum))
				return `
					<section class="chapter-section">
						<h2>Chapter ${chapterNum}: ${chapter?.title || ''}</h2>
						${chapterChallenges.map(c => `
							<a href="#${c.id}" class="challenge-card ${completedChallenges.has(c.id) ? 'completed' : ''}">
								<div class="challenge-card-info">
									<span class="challenge-card-status">${completedChallenges.has(c.id) ? '&#10003;' : '&#9675;'}</span>
									<span class="challenge-card-title">${c.title}</span>
								</div>
								<span class="difficulty-badge ${c.difficulty}">${c.difficulty}</span>
							</a>
						`).join('')}
					</section>
				`
			}).join('')}
		</div>
	`
}

// Render a single challenge
async function renderChallenge(challenge) {
	currentChallenge = challenge
	const app = document.getElementById('app')

	const chapterInfo = chapters.find(c => c.num === challenge.chapter)
	const challengeIndex = challenges.findIndex(c => c.id === challenge.id)
	const prevChallenge = challengeIndex > 0 ? challenges[challengeIndex - 1] : null
	const nextChallenge = challengeIndex < challenges.length - 1 ? challenges[challengeIndex + 1] : null

	const completedCount = completedChallenges.size
	const totalCount = challenges.length

	app.innerHTML = `
		<header class="challenge-header">
			<h1><a href="#">Lambda Challenges</a></h1>
			<div class="header-controls">
				<select class="chapter-select" id="chapter-select">
					<option value="">All Chapters</option>
					${chapters.map(ch => `
						<option value="${ch.num}" ${ch.num === challenge.chapter ? 'selected' : ''}>
							Chapter ${ch.num}: ${ch.title}
						</option>
					`).join('')}
				</select>
				<span class="progress-badge">${completedCount}/${totalCount}</span>
			</div>
		</header>
		<div class="challenge-container">
			<aside class="challenge-sidebar">
				<h2 class="challenge-title">${challenge.title}</h2>
				<div class="challenge-meta">
					<span class="difficulty-badge ${challenge.difficulty}">${challenge.difficulty}</span>
					<span class="chapter-badge">Chapter ${challenge.chapter}</span>
				</div>
				<p class="challenge-description">${challenge.description}</p>

				${challenge.concepts ? `
					<div class="challenge-concepts">
						<h3>Key Concepts</h3>
						<ul>
							${challenge.concepts.map(c => `<li>${c}</li>`).join('')}
						</ul>
					</div>
				` : ''}

				${challenge.given ? `
					<div class="challenge-given">
						<h3>Given</h3>
						${challenge.given.map(g => `<code>${g}</code>`).join('')}
					</div>
				` : ''}

				<div class="sidebar-actions">
					<button class="hint-btn" id="hint-btn">Show Hint</button>
					<button class="solution-btn" id="solution-btn">Show Solution</button>
				</div>

				<div class="hint-content" id="hint-content">
					<strong>Hint:</strong> ${challenge.hint}
				</div>

				<div class="solution-content" id="solution-content">
					<strong>Solution:</strong>
					<code>${challenge.solution}</code>
				</div>

				${chapterInfo ? `
					<a href="${chapterInfo.path}" class="chapter-link">
						&#8592; Back to ${chapterInfo.title}
					</a>
				` : ''}
			</aside>

			<main class="editor-panel">
				<div class="editor-toolbar">
					<button class="run-btn" id="run-btn">Run Tests</button>
					<div class="nav-buttons">
						${prevChallenge ? `
							<a href="#${prevChallenge.id}" class="nav-btn">&#8592; Previous</a>
						` : `
							<button class="nav-btn" disabled>&#8592; Previous</button>
						`}
						${nextChallenge ? `
							<a href="#${nextChallenge.id}" class="nav-btn">Next &#8594;</a>
						` : `
							<button class="nav-btn" disabled>Next &#8594;</button>
						`}
					</div>
				</div>
				<div class="editor-container" id="editor-container"></div>
				<div class="test-results" id="test-results">
					<h3>Test Results</h3>
					${challenge.tests.map(t => `
						<div class="test-item">
							<span class="test-icon pending">&#9675;</span>
							<span class="test-description">${t.description}</span>
						</div>
					`).join('')}
				</div>
			</main>
		</div>
	`

	// Setup event listeners
	document.getElementById('hint-btn').addEventListener('click', () => {
		document.getElementById('hint-content').classList.toggle('visible')
	})

	document.getElementById('solution-btn').addEventListener('click', () => {
		document.getElementById('solution-content').classList.toggle('visible')
	})

	document.getElementById('run-btn').addEventListener('click', runTests)

	document.getElementById('chapter-select').addEventListener('change', (e) => {
		const chapterNum = parseInt(e.target.value)
		if (chapterNum) {
			const firstInChapter = challenges.find(c => c.chapter === chapterNum)
			if (firstInChapter) {
				window.location.hash = firstInChapter.id
			}
		} else {
			window.location.hash = ''
		}
	})

	// Initialize CodeMirror
	await initEditor(challenge)
}

// Initialize editor (simple textarea for now)
async function initEditor(challenge) {
	const container = document.getElementById('editor-container')

	// Get saved code or use starter
	const savedCode = localStorage.getItem(`lambda-challenge-${challenge.id}`)
	const initialCode = savedCode || challenge.starterCode

	// Create textarea editor
	const textarea = document.createElement('textarea')
	textarea.id = 'code-editor'
	textarea.className = 'code-editor'
	textarea.value = initialCode
	textarea.spellcheck = false
	textarea.placeholder = 'Write your solution here...'

	// Save on change
	textarea.addEventListener('input', () => {
		localStorage.setItem(`lambda-challenge-${challenge.id}`, textarea.value)
	})

	container.appendChild(textarea)

	// Store reference for getting code
	editor = { getValue: () => textarea.value }

	// Keyboard shortcut to run tests
	textarea.addEventListener('keydown', (e) => {
		// Tab key inserts tab instead of changing focus
		if (e.key === 'Tab') {
			e.preventDefault()
			const start = textarea.selectionStart
			const end = textarea.selectionEnd
			textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)
			textarea.selectionStart = textarea.selectionEnd = start + 1
		}
		// Ctrl/Cmd + Enter runs tests
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault()
			runTests()
		}
	})
}

// Run tests for current challenge
function runTests() {
	if (!currentChallenge || !editor) return

	const userCode = editor.getValue()
	const results = []

	for (const test of currentChallenge.tests) {
		try {
			const result = runSingleTest(userCode, test, currentChallenge)
			results.push(result)
		} catch (error) {
			results.push({
				passed: false,
				description: test.description,
				error: error.message,
			})
		}
	}

	renderTestResults(results)

	// Check if all passed
	const allPassed = results.every(r => r.passed)
	if (allPassed && !completedChallenges.has(currentChallenge.id)) {
		completedChallenges.add(currentChallenge.id)
		localStorage.setItem('lambda-challenges-completed', JSON.stringify([...completedChallenges]))
		showSuccessMessage()
	}
}

// Run a single test
function runSingleTest(userCode, test, challenge) {
	// Build the test code, excluding the challenge's export name to avoid conflicts
	const exportName = challenge.exportName
	const preludeCode = Object.entries(prelude)
		.filter(([name]) => name !== exportName)
		.map(([name, fn]) => `const ${name} = ${fn.toString()}`)
		.join('\n')

	let testCode
	if (test.custom) {
		// Custom test expression
		const setup = test.customSetup || ''
		testCode = `
			${preludeCode}
			${userCode}
			${setup}
			return (${test.custom})
		`
	} else if (test.args !== undefined) {
		// Simple input/output test
		const exportName = challenge.exportName
		const argsStr = test.args.map(a => JSON.stringify(a)).join(')(')
		testCode = `
			${preludeCode}
			${userCode}
			const __result = ${exportName}(${argsStr})
			return __result === ${JSON.stringify(test.expected)}
		`
	}

	// Execute in sandbox
	const fn = new Function(testCode)
	const passed = fn()

	return {
		passed: !!passed,
		description: test.description,
	}
}

// Render test results
function renderTestResults(results) {
	const container = document.getElementById('test-results')

	container.innerHTML = `
		<h3>Test Results</h3>
		${results.map(r => `
			<div class="test-item">
				<span class="test-icon ${r.passed ? 'pass' : 'fail'}">
					${r.passed ? '&#10003;' : '&#10007;'}
				</span>
				<div>
					<span class="test-description">${r.description}</span>
					${r.error ? `<div class="test-error">${r.error}</div>` : ''}
				</div>
			</div>
		`).join('')}
	`
}

// Show success message
function showSuccessMessage() {
	const toolbar = document.querySelector('.editor-toolbar')
	const successDiv = document.createElement('div')
	successDiv.className = 'challenge-complete'
	successDiv.innerHTML = `
		<h3>Challenge Complete!</h3>
		<p>Great work! You've mastered this concept.</p>
	`
	toolbar.parentNode.insertBefore(successDiv, toolbar.nextSibling)

	// Remove after animation
	setTimeout(() => {
		successDiv.style.opacity = '0'
		successDiv.style.transition = 'opacity 0.5s'
		setTimeout(() => successDiv.remove(), 500)
	}, 3000)
}

// Start the app
init()
