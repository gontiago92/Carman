'use strict'

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
require('./server/app.js')

require('electron-reload')(__dirname)
const path = require('path');
const url = require('url');

let mainWindow;

app.on('ready', async() => {

    let mainWindow = new BrowserWindow({
        width: 960,
        minWidth: 400,
        height: 680,
        minHeight: 400,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadURL('http://localhost:3000')

});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.