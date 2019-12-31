var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
     colorize: true
     });
     logger.level = 'debug';
     // Initialize Discord Bot
     var bot = new Discord.Client({
        token: auth.token,
           autorun: true
           });
           bot.on('ready', function (evt) {
               logger.info('Connected');
               logger.info('Logged in as: ');
               logger.info(bot.username + ' - (' + bot.id + ')');
               });
           bot.on('message', function (user, userID, channelID, message, evt) {
           // Our bot needs to know if it will execute a command
           // It will listen for messages that will start with `!`
           if (message.substring(0, 1) == '!') {
               var args = message.substring(1).split(' ');
               var cmd = args[0];             
               args = args.splice(1);
               switch(cmd) {
               // !ping
               case 'ip':
	           var xmlhttp = new XMLHttpRequest();
		   xmlhttp.open("GET", 'http://meuip.com/api/meuip.php');
		   xmlhttp.send();
		   xmlhttp.onload = function(e) {
		     bot.sendMessage({ to: channelID, to: channelID, message: 'Server IP: ' + xmlhttp.responseText});
		   }
                   break;    // Just add any case commands if you want to..
               }
               }
           });
