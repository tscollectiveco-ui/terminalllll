// Terminal functionality
class Terminal {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('terminal-input');
        this.history = [];
        this.historyIndex = -1;
        this.currentPath = '~';
        this.fileSystem = {
            '~': {
                'documents': {},
                'downloads': {},
                'projects': {},
                'README.txt': 'Welcome to terminalllll - a fully functioning shell!'
            }
        };
        
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clear(),
            echo: (args) => this.echo(args),
            date: () => this.showDate(),
            whoami: () => 'guest',
            pwd: () => this.currentPath,
            ls: () => this.listFiles(),
            cat: (args) => this.readFile(args),
            about: () => this.showAbout(),
            theme: (args) => this.changeTheme(args),
        };
        
        this.init();
    }
    
    init() {
        this.showWelcome();
        this.input.addEventListener('keydown', (e) => this.handleInput(e));
        this.input.focus();
        
        // Refocus input when clicking anywhere in the terminal
        document.querySelector('.terminal-body').addEventListener('click', () => {
            this.input.focus();
        });
    }
    
    showWelcome() {
        const welcome = `
<div class="welcome-message">
  ╔══════════════════════════════════════════╗
  ║     Welcome to terminalllll v1.0.0       ║
  ║     A Fully Functioning Shell            ║
  ╚══════════════════════════════════════════╝
</div>
<div class="info-line">Type 'help' to see available commands</div>
<div class="output-line">Today is ${new Date().toLocaleDateString()}</div>
<div class="output-line">&nbsp;</div>
        `.trim();
        this.output.innerHTML = welcome;
    }
    
    handleInput(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            if (command) {
                this.history.push(command);
                this.historyIndex = this.history.length;
                this.executeCommand(command);
            } else {
                this.addOutput('', 'command-line');
            }
            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.history[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.input.value = this.history[this.historyIndex];
            } else {
                this.historyIndex = this.history.length;
                this.input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autocomplete();
        }
    }
    
    executeCommand(input) {
        this.addOutput(`$ ${input}`, 'command-line');
        
        const parts = input.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');
        
        if (this.commands[cmd]) {
            const result = this.commands[cmd](args);
            if (result !== undefined && result !== null) {
                this.addOutput(result);
            }
        } else {
            this.addOutput(`Command not found: ${cmd}`, 'error-line');
            this.addOutput(`Type 'help' for available commands`, 'info-line');
        }
        
        this.scrollToBottom();
    }
    
    addOutput(text, className = 'output-line') {
        const line = document.createElement('div');
        line.className = className;
        line.innerHTML = text;
        this.output.appendChild(line);
    }
    
    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    showHelp() {
        return `
<div class="success-line">Available Commands:</div>
<div class="output-line">  help       - Show this help message</div>
<div class="output-line">  clear      - Clear the terminal screen</div>
<div class="output-line">  echo       - Print text to the terminal</div>
<div class="output-line">  date       - Display current date and time</div>
<div class="output-line">  whoami     - Display current user</div>
<div class="output-line">  pwd        - Print working directory</div>
<div class="output-line">  ls         - List files in current directory</div>
<div class="output-line">  cat        - Read file contents</div>
<div class="output-line">  about      - About this terminal</div>
<div class="output-line">  theme      - Change theme (light/dark)</div>
        `.trim();
    }
    
    clear() {
        this.output.innerHTML = '';
        return null;
    }
    
    echo(text) {
        return text || '';
    }
    
    showDate() {
        const now = new Date();
        return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }
    
    listFiles() {
        const files = Object.keys(this.fileSystem[this.currentPath]);
        if (files.length === 0) {
            return '<div class="info-line">Directory is empty</div>';
        }
        
        let output = '';
        files.forEach(file => {
            const isDir = typeof this.fileSystem[this.currentPath][file] === 'object';
            const icon = isDir ? '📁' : '📄';
            output += `<div class="output-line">${icon} ${file}</div>`;
        });
        return output;
    }
    
    readFile(filename) {
        if (!filename) {
            return '<div class="error-line">Usage: cat &lt;filename&gt;</div>';
        }
        
        const file = this.fileSystem[this.currentPath][filename];
        if (file === undefined) {
            return `<div class="error-line">File not found: ${filename}</div>`;
        }
        
        if (typeof file === 'object') {
            return `<div class="error-line">${filename} is a directory</div>`;
        }
        
        return `<div class="success-line">${file}</div>`;
    }
    
    showAbout() {
        return `
<div class="success-line">╔══════════════════════════════════════════╗</div>
<div class="success-line">║         terminalllll v1.0.0              ║</div>
<div class="success-line">╚══════════════════════════════════════════╝</div>
<div class="output-line">&nbsp;</div>
<div class="output-line">A simplistic, cute, and clean terminal interface</div>
<div class="output-line">with elegant headers, smooth transitions,</div>
<div class="output-line">and beautiful animations.</div>
<div class="output-line">&nbsp;</div>
<div class="info-line">Built with ❤️ using HTML, CSS, and JavaScript</div>
        `.trim();
    }
    
    changeTheme(theme) {
        if (!theme) {
            return '<div class="info-line">Current theme: dark (default)</div>';
        }
        return '<div class="info-line">Theme switching coming soon!</div>';
    }
    
    autocomplete() {
        const input = this.input.value;
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`$ ${input}`, 'command-line');
            matches.forEach(match => {
                this.addOutput(match, 'info-line');
            });
            this.scrollToBottom();
        }
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
