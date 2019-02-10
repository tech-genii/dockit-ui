const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow({width:800,height:600});

    win.loadURL(url.format({
        pathname: "localhost:8080",
        protocol: "http:",
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed',event => {
        win = null;
    });
}

app.on('ready',createWindow);
app.on('window-all-closed', () => {});

