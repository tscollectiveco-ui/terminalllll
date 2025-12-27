// src/electron.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handlers for controlled terminal operations
ipcMain.handle('terminal:create', async () => {
  try {
    // Call server API to create terminal session
    const response = await fetch('http://localhost:3000/terminals', { method: 'POST' });
    if (!response.ok) {
      throw new Error(`Failed to create terminal: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error creating terminal:', error);
    throw error;
  }
});

ipcMain.handle('terminal:send', async (event, sessionId, data) => {
  try {
    // Validate input parameters
    if (!sessionId || typeof sessionId !== 'string') {
      throw new Error('Invalid sessionId');
    }
    if (typeof data !== 'string') {
      throw new Error('Invalid data type');
    }
    
    const response = await fetch(`http://localhost:3000/terminals/${sessionId}/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: data,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send data: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending to terminal:', error);
    throw error;
  }
});
