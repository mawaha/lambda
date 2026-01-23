# Interactive Lambda Calculus Tutorial

An interactive, browser-based tutorial teaching lambda calculus from basics to advanced topics using vanilla JavaScript ES6 modules.

## Structure

```
docs/
├── index.html                 # Landing page
├── chapters/                  # Tutorial chapters
│   ├── 01-combinators.html
│   ├── 02-church-encodings.html
│   ├── 03-numerals.html
│   ├── 04-data-structures.html
│   ├── 05-recursion.html
│   └── 06-advanced.html
├── lib/                       # Lambda calculus implementations (ES6 modules)
│   ├── combinators.js
│   ├── lamb.js
│   ├── utils.js
│   ├── data.js
│   ├── factorial.js
│   └── fibonacci.js
├── js/                        # Interactive framework
│   ├── interactive.js
│   └── visualizer.js
└── css/                       # Styling
    ├── main.css
    └── code-theme.css
```

## Local Development

Since this tutorial uses ES6 modules, you need to run a local HTTP server (browsers block ES6 module imports from `file://` URLs).

### Option 1: Python
```bash
cd docs
python3 -m http.server 8000
```

### Option 2: Node.js
```bash
cd docs
npx serve
```

### Option 3: PHP
```bash
cd docs
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## Testing

Open `test.html` in your browser (via the local server) to verify all modules load correctly:

http://localhost:8000/test.html

## GitHub Pages Deployment

This tutorial is designed to be deployed to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `master` (or `main`)
   - Folder: `/docs`
   - Click Save

2. **Wait for deployment** (usually 1-2 minutes)
   - Check the Actions tab for deployment status

3. **Access your site**
   - URL: `https://<username>.github.io/<repo-name>/`

## Browser Compatibility

Requires a modern browser with ES6 module support:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

## Features

- **Interactive Demos**: Live code examples that run in the browser
- **Interactive Widgets**: User input forms to experiment with lambda calculus
- **Visual Reductions**: Step-by-step evaluation visualizations
- **Church Numeral Visualizers**: See numbers as repeated function application
- **List Structure Diagrams**: Visual representation of nested pairs
- **Safe Error Handling**: Graceful handling of stack overflow with educational messages

## Educational Approach

The tutorial follows a progressive structure:

1. **Chapter 1**: Foundation with combinators (Id, K, M)
2. **Chapter 2**: Booleans and logic as choice functions
3. **Chapter 3**: Numbers as repeated application
4. **Chapter 4**: Data structures (lists, pairs)
5. **Chapter 5**: Recursion with thunking pattern
6. **Chapter 6**: Advanced topics and connections to FP

## Technical Details

- **No build step**: Pure HTML/CSS/JS
- **No frameworks**: Vanilla JavaScript for clarity
- **ES6 Modules**: Native browser module support
- **Zero dependencies**: Self-contained tutorial
- **Responsive**: Mobile-friendly design

## Limitations

The tutorial demonstrates pure lambda calculus concepts but is constrained by JavaScript's runtime:

- **Stack depth**: Recursion limited to ~10-15 levels
- **No tail call optimization**: Most JS engines don't optimize tail recursion
- **Strict evaluation**: JavaScript is eager, not lazy (worked around with thunks)

These limitations are clearly explained in the tutorial with educational context.

## Contributing

To add new chapters or features:

1. Create HTML in `chapters/`
2. Add any new lambda calculus functions to `lib/`
3. Create chapter-specific demos in the HTML file
4. Use the `InteractiveDemo` class from `js/interactive.js`
5. Test locally before pushing

## License

This educational content is designed to teach lambda calculus concepts through interactive examples.
