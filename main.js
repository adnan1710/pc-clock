const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

function createWindow() {
    // Icon path for production (requires icon.png in assets folder)
    const iconPath = path.join(__dirname, 'assets', 'icon.png');
    const iconExists = require('fs').existsSync(iconPath);
    
    const win = new BrowserWindow({
        width: 600,
        height: 240,
        minWidth: 320,
        minHeight: 120,
        show: false,
        frame: true,
        transparent: false,
        backgroundColor: '#1a2332',
        ...(iconExists && { icon: iconPath }),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Remove menu bar
    Menu.setApplicationMenu(null);

    const devURL = 'http://localhost:5173';
    const isDev = process.env.npm_lifecycle_event === 'electron:dev' || process.env.ELECTRON_DEV;

    if (isDev) {
        win.loadURL(devURL);
    } else {
        win.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }

    // Maximize and show window
    win.maximize();
    win.show();

    // Optionally open devtools in dev
    if (isDev) win.webContents.openDevTools({ mode: 'detach' });

    return win;
}

app.whenReady().then(() => {
    const mainWin = createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    ipcMain.on('toggle-fullscreen', (event) => {
        const w = BrowserWindow.getFocusedWindow() || mainWin;
        if (w) {
            const newState = !w.isFullScreen();
            w.setFullScreen(newState);
            // notify renderer of change
            w.webContents.send('fullscreen-changed', newState);
        }
    });

    // send initial fullscreen state after load
    app.on('browser-window-created', (e, w) => {
        w.webContents.on('did-finish-load', () => {
            w.webContents.send('fullscreen-changed', w.isFullScreen());
        });
    });

    ipcMain.on('close-window', () => {
        const w = BrowserWindow.getFocusedWindow() || mainWin;
        if (w) w.close();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
