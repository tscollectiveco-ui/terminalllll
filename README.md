# terminalllll
A fully functioning shell with a simplistic, cute, and clean interface.

## Features

✨ **Elegant Design**
- Slim header with Mac-style window controls
- Clean, rounded containers with backdrop blur
- Smooth hover effects and transitions

🎨 **Beautiful Animations**
- Animated gradient background
- Fade-in container effect
- Sliding text animations
- Glowing and pulsing effects

💻 **Terminal Functionality**
- Command execution with history (↑/↓ arrows)
- Tab completion for commands
- Mock file system navigation
- Color-coded output (success, error, info)

## Usage

Simply open `index.html` in a web browser to start using the terminal.

### Available Commands

- `help` - Show available commands
- `clear` - Clear the terminal screen
- `echo [text]` - Print text to the terminal
- `date` - Display current date and time
- `whoami` - Display current user
- `pwd` - Print working directory
- `ls` - List files in current directory
- `cat [file]` - Read file contents
- `about` - About this terminal
- `theme [name]` - Change theme

### Keyboard Shortcuts

- **Enter** - Execute command
- **↑/↓** - Navigate command history
- **Tab** - Autocomplete command

## Running Locally

### Option 1: Using Live Server (Recommended)

The project includes live-server for automatic browser refresh during development:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The terminal will automatically open in your browser at http://localhost:8080 with live reload.

### Option 2: Using Other Web Servers

You can also serve the terminal using any web server:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js http-server
npx http-server -p 8080
```

Then open http://localhost:8080 in your browser.

## Technologies

- HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript (no dependencies)
