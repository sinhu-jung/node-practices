const connect = require('connect');
const serveStatic = require('serve-static');
const connectRoute = require('connect-route');

const port = 8080;
const app = connect();
app.use(serveStatic(__dirname + '/public'));
app.use(connectRoute(function(router){
    router.get("/", function(req, res){
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>main</h1")
    });
}));

app.listen(port, function(){
    console.log(`Http Server running on port ${port}`);
})