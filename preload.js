const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
    closeWindow: () => ipcRenderer.send('close-window'),
    onFullscreenChanged: (cb) => ipcRenderer.on('fullscreen-changed', (event, isFull) => cb(isFull))
});
