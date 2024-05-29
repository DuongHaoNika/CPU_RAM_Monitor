const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

let mainWindow

function setTitle(event, title){
    const webContent = event.sender
    const win = BrowserWindow.fromWebContents(webContent)
    win.setTitle(title)
}

function checkCPU(event, title){
    const cpuInfo = process.getCPUUsage().percentCPUUsage * 100
    mainWindow.webContents.send('sendCpu', cpuInfo.toFixed(2))
}

function checkRAM(event, title){
    const ram = process.getSystemMemoryInfo()
    const ramInfo = (ram.total - ram.free)/ram.total * 100
    mainWindow.webContents.send('sendRam', ramInfo.toFixed(2))
}

function createWindow () {
    mainWindow = new BrowserWindow({
        height: 240,
        width: 272,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.loadFile('view/index.html')
}

app.whenReady().then(() => {
    ipcMain.on('setTitle', setTitle)
    ipcMain.on('checkCpu', checkCPU)
    ipcMain.on('checkRam', checkRAM)
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})