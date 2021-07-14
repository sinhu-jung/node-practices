# MySite on Node(Express)

## project manifest 파일(package.json) 생성
$ npm init -y

## 설치패키지
$ npm i express
$ npm i ejs
$ npm i -D nodemon

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
    | --- index.js
    | --- package.json
    | --- package-lock.json
    | --- /node-modules
    | --- /config
    | --- /public
    | --- /routes
    | --- /controllers
    | --- /models
    | --- /views
             | --- /main
             | --- /user
             | --- /guestbook
             | --- /board
             | --- /gallery
             | --- /admin
</pre>