let express = require("express"),
    app = express(),
    cors = require('cors')
var http = require('http');
app.use(cors())
app.use('/', express.static(__dirname + '/build')) //project k root m build k name se folder banaiega or wahan react ki build daal dijiega
http.createServer(app).listen(3000);