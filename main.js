const TelegramBot = require('node-telegram-bot-api');
const token = '6455626069:AAHb9UXSpKDC83f7rwQl-hSUUQzFpPYsvhQ';
const bot = new TelegramBot(token, {polling: true});
const {lotinga, kirillga}=require('./lotinkiril');
const { send } = require('process');

let lotinState=0
let kirilState=0

bot.on('message', (message) => {
    const chatId = message.chat.id;
    const name = message.from.first_name
    const username= message.from.username
    if(message.text=='/start'){
        bot.sendMessage(chatId, `Salom <b>${name}</b> botimizga xush kelibsiz, Botimizning vazifasini bilish uchun /info ni ustiga bosing`,{
            parse_mode: "HTML"
        });
    }
    else if(message.text=='/info'){
        bot.sendMessage(chatId, `Ushbu bot lotinchadan kirilchaga yoki kirilchadan lotinchaga tarjima qiladi. Yuboradigan xabaringiz lotin tilida bo'lsa /lotin ni ustiga kiril tilida bo'lsa /kiril ni ustiga bosing`)
    }
    else if(message.text=='/kiril'){
        bot.sendMessage(chatId, `Kiril tilida biror bir text yuboring`)
        kirilState=1
    }
    else if(message.text=='/lotin'){
        bot.sendMessage(chatId, `Lotin tilida biror bir text yuboring`)
        lotinState=1
    }
    
    else if(kirilState==1){
        let kirilText=message.text
        let lotinConverterText =lotinga(kirilText)
        bot.sendMessage(chatId, lotinConverterText)
    }
    else if(lotinState==1){
        let lotinText=message.text
        let kirilConverterText =kirillga(lotinText)
        bot.sendMessage(chatId, kirilConverterText)
    }


  });