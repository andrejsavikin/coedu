'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

require('crash-reporter').start();

// Keep a global reference of the swindow object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {

	const defaultWindowConfig = {
		width: 340,
		height: 400,
		resizable: false,
		fullscreen: false,
		title: "Coedu",
		frame: true, // to be done
		titleBarStyle: "hidden"
	};
	// Create the browser window
	mainWindow = new BrowserWindow(defaultWindowConfig);

	// and load the index.html of the app
	mainWindow.loadURL('file://' + __dirname + '/../dist/index.html');

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();

	// Emitted when the window is closed
	mainWindow.on('closed', function() {
		mainWindow = null;
	});

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
