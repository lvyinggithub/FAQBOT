var restify = require('restify');
var builder = require('botbuilder');
var request=require('request');
var cognitiveservices = require('botbuilder-cognitiveservices');





// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '11e67077-da41-41c6-aaeb-ab4d73999db2',
    appPassword: 'Nn28pjBmwftGCixaxULuHJM'
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var recognizer = new cognitiveservices.QnAMakerRecognizer({
    knowledgeBaseId: '3b104386-2f61-4b06-93b3-c77bdbd8eb39', 
    subscriptionKey: 'dce861d4b57d4f1c9a0e92e6cc8aab78'});
    
var basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
    recognizers: [recognizer],
    defaultMessage: 'No match! Try changing the query terms!',
    qnaThreshold: 0.3
});

bot.dialog('/', basicQnAMakerDialog);