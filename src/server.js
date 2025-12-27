const express = require('express');
const http = require('http');
const pty = require('node-pty');
const os = require('os');

const app = express();
const server = http.createServer(app);

// Serve static files
app.use(express.static(__dirname));

// Store terminal sessions
const terminals = {};

// Determine the shell based on the operating system
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// API endpoint to create a new terminal session
app.post('/terminals', (req, res) => {
  const terminalSession = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: os.homedir(),
    env: process.env,
  });

  const pid = terminalSession.pid;
  terminals[pid] = terminalSession;

  terminalSession.on('exit', () => {
    delete terminals[pid];
  });

  res.json({ pid });
});

// API endpoint to send data to a terminal session
app.post('/terminals/:pid/data', express.text(), (req, res) => {
  const terminalSession = terminals[req.params.pid];
  if (terminalSession) {
    terminalSession.write(req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// API endpoint to get data from a terminal session
app.get('/terminals/:pid/data', (req, res) => {
  const terminalSession = terminals[req.params.pid];
  if (terminalSession) {
    const terminalDataHandler = (data) => {
      res.write(data);
    };
    terminalSession.on('data', terminalDataHandler);
    
    // Clean up listener when response closes
    res.on('close', () => {
      terminalSession.off('data', terminalDataHandler);
    });
  } else {
    res.sendStatus(404);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;
