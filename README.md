# AngularTest001 Developer Docs

The UI is built with Angular and connects to the Firebase API for access to DB. It gets deployed to Firebase `https://angulartest001-48267.web.app/`.

_NOTE: Read top level README up one directory to get overall info. This README is specific to AngularTest001 UI._

#### Landscape

A few key points so you know your way around.

- Entry Point: **src/app/app.component.ts**
- Configuration: is in **src/environments** folder

## Configure It

Look at appropriate src/environment/\*.ts file.

- Developer Machine: environment.ts
- Production: environment.prod.ts (used when 'production' configuration is used in build. Refer to script: build:production in package.json)

## Run It
    $ npm install
    $ npm run start
## Debug It - in VSCode

1. Google Chrome already installed
2. Install the Debugger for Chrome extension in VS Code
   More info - https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome
3. Create a launch.json config file (by clicking the gear icon in the Debug view)
4. Set an appropriate config spec in the .vscode/launch.json file (example below)

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:4200",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

5. Set breakpoints in the editor
6. Launch the Angular app separate from the debugger (such as by running “ng serve” or “npm start” from the command line)
7. Run the VS Code debugger “launch” job against the app (by clicking the green arrow in the Debug view).

## Production Build

Open `src/environments/environment.ts` and define values in provided parameters

`UPDATE PARAMETERS AS PER ENVIRONMENT`

```
firebase: {
    projectId: 'angulartest001-48267',
    appId: '1:551567410857:web:95b40d149509fecaea8bb8',
    storageBucket: 'angulartest001-48267.appspot.com',
    apiKey: 'AIzaSyApuETxVF5g7mMDfrkgQYjuZK7un4fPpE8',
    authDomain: 'angulartest001-48267.firebaseapp.com',
    messagingSenderId: '551567410857',
    measurementId: 'G-LT3DYRMEWC',
}
```

Run `npm run build` for generate build

## STEPS TO DEPLOYMENT

**Pre-requirement**

Install Firebase Tools globally in machine `npm install -g firebase-tools`

_Steps to Follow_

1. firebase login
2. firebase init
3. follow CLI & configure it
4. firebase deploy

# Resources

- [Configuring Dependency Injection in Angular](https://codecraft.tv/courses/angular/dependency-injection-and-providers/configuring/)

- [Deployment step by step](https://www.c-sharpcorner.com/article/how-to-deploy-and-host-an-angular-application-on-firebase/)