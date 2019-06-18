alefTav Socketio  

# mongoDb

    mongoose.connect('mongodb://user:senha@host/base');


# server - preparando ambiente no servidor.

    $ mkdir alefTavSocketio
    $ cd alefTavSocketio

    $ npm install 
    $ npm install --save mongoose

    # executar
    $ npm start


    # altomatizando start do server.js

        $ cd /deploy/alefTavSocketio
        $ cp ./config/aleftav.service /usr/lib/systemd/system/aleftav.service

            [Unit]
            Description=AlefTav Server Script Kernel
            After=network.target

            [Service]
            WorkingDirectory=/deploy/alefTavSocketio/server
            ExecStart=/usr/bin/npm start
            Restart=on-failure
            Environment=PORT=3000

            [Install]
            WantedBy=multi-user.target

        $ systemctl daemon-reload
        $ systemctl start aleftav.service
        $ systemctl status aleftav.service
        $ systemctl enable aleftav.service



# Cliente - utilisando framework electron

    $ cd cliente

    $ npm init
    $ npm install --save-dev electron
    $ npm install --save-dev socket.io

    $ tree
        ../cliente/
        ├── README
        ├── index.html
        ├── main.js
        └── package.json

    $ vim main.js
        const { app, BrowserWindow } = require('electron')
        function createWindow () {

        // Create the browser window.
        let win = new BrowserWindow({
            width: 1400,
            height: 700,
            webPreferences: {
            nodeIntegration: true
            }
        })

        // and load the index.html of the app.
        win.loadFile('index.html')
        }
        app.on('ready', createWindow)    

    $ vim index.html
        <!DOCTYPE html>
        <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
        <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
        <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
        <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
            <head>
            </head>
            <body>
                Iniciado
            </body>
        </html>


    $ mkdir assets/icons/{mac,win,png}
    $ 


# Cliente - inicializando aplicação

    $ npm start



# Cliente - Instalar Electron packager

    - Para uso em scripts npm
        $ npm install electron-packager --save-dev
    
    - Para uso de cli
        $ npm install electron-packager -g


    Executando este comando a partir do terminal para construir um pacote para os devidos sistema operacional:

        # MAC
        $ electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds

        # Windows
        $ electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="AlefTav App"

        # Linux
        $ electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds


    Adicione o script abaixo, no arquivo package.json:
        ...
        "scripts": {
            "start": "electron .",
            "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.ico --prune=true --out=release-builds",
            "package-win": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"AlefTav App\"",    
            "package-linux": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"
        }
        ...

# Cliente - executando:

    $ npm run package-win
    $ npm run package-mac
    $ npm run package-linux



# referencias
    https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/