const { app, BrowserWindow } = require('electron')

function createWindow () {
  // cria a principal janela do app.
  let win = new BrowserWindow({
    width: 1400,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // lendo o index.html
  win.loadFile('index.html')
  //win.loadURL('http://10.0.5.36:3000')
}

//let child = new BrowserWindow({ parent: top, modal: true, show: false })
//child.loadURL('https://github.com')
//child.once('ready-to-show', () => {
//  child.show()
//})

app.on('ready', createWindow)