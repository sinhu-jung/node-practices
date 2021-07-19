# MySite on Node(Express)

## project manifest 파일(package.json) 생성
$ npm init -y

## 설치패키지
```bash
$ npm i express
$ npm i express-session
$ npm i serve-favicon
$ npm i ejs
$ npm i moment
$ npm i sequelize
$ npm i mysql2
$ npm i dotenv
$ npm i multer
$ npm i winston
$ npm i winston-daily-rotate-file
$ npm i -D mocha
$ npm i -D chai
$ npm i -D nodemon
```
## script in package.json
```JSON
.
.
.
"scripts": {
    "start": "node index.js",
    "debug": "nodemon index.js"
  }
.
.
.
```

## project structure
<pre>
/mysite
    |--- index.js
    |--- package.json
    |--- package-lock.json
    |--- [node_modules]
    |--- test
    |--- logging
    |--- [logs]
    |       |--- [error]
    |--- [multer-temporary-store]
    |--- config
    |--- public
    |       |--- assets
    |               |--- js
    |               |--- css
    |               |--- images
    |               |--- [upload-images]
    |--- routes
    |--- controllers
    |       |--- admin
    |--- models
    |--- views
            |--- main
            |--- admin
            |       |--- includes
            |--- user
            |--- board
            |--- guestbook
            |--- gallery
            |--- includes
</pre>