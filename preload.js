const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('api', {
    setTitle: (value) => ipcRenderer.send('setTitle', value),
    checkCpu: () => ipcRenderer.send('checkCpu'),
    checkRam: () => ipcRenderer.send('checkRam'),
    onUpdate: (callback) => ipcRenderer.on('sendCpu', (event, value) => callback(value)),
    onUpdateRam: (callback) => ipcRenderer.on('sendRam', (event, value) => callback(value)),
})

