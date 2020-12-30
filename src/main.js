const env = require('../.env');
const {exec, execSync} = require('child_process');
const axios = require('axios');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf(env.token);


const options = Extra.markup(Markup.inlineKeyboard(
    [
        Markup.callbackButton('Develop', 'getDevelop'),
        Markup.callbackButton('Finanças', 'getFinancas'),
        Markup.callbackButton('Outros', 'getOutros')
    ], {columns: 1}
));

const optionsDevelop = Extra.markup(Markup.inlineKeyboard(
    [
        Markup.callbackButton('Ip', 'getIp'),
        Markup.callbackButton('Armazenamento', 'getArmazenamento')
    ], {columns: 2}
));

const optionsFinancas = Extra.markup(Markup.inlineKeyboard(
    [
        Markup.callbackButton('Cotações', 'getCotacoes'),
        Markup.callbackButton('Carteira', 'getCarteira')
    ], {columns: 2}
));

bot.start(async (ctx) => {
    const from = ctx.update.message.from
    console.log(from);
    if (from.id !== env.user) {
        await ctx.reply(`Sinto muito ${from.first_name}, mas eu só fala com o meu mestre!`);
        return;
    }
    await ctx.reply(`Seja bem Vindo, ${from.first_name}!`);
    await ctx.reply('Isso e oque posso fazer: ', options);
});


// Develop

bot.action('getDevelop', async ctx => {
    await ctx.reply('Options Develop : ', optionsDevelop);
});

bot.action('getIp', async ctx => {
    const ip = execSync(`curl --max-time 60 --ipv4 icanhazip.com`);
    await ctx.answerCbQuery(`Seu ip e ${ip} ou mayke.mooo.com`);
    execSync(`curl http://freedns.afraid.org/dynamic/update.php?VmRDMHhhbTVlTWFvQ1p1UWpSOXU6MTgwNDk4NjA=`)
});

bot.action('getArmazenamento', async ctx => {
    const arm = execSync('df -h')
    await ctx.reply(`${arm}`);
});

// Financas

bot.action('getFinancas', async ctx => {
    await ctx.reply('Options Finaças : ', optionsFinancas);
});

bot.action('getCotacoes', async ctx => {
    const response = await axios.get(`https://api.hgbrasil.com/finance?key=${env.keyHg}`);
    if (response.status !== 200) {
        await ctx.reply(`Erro ao executar API status: ${response.status}`);
        return;
    }

    const modedas = response.data.results.currencies;
    const dolar = modedas.USD.buy;
    const dolarVari = modedas.USD.variation;
    const euro = modedas.EUR.buy;
    const euroVari = modedas.EUR.variation;
    const bitcoin = modedas.BTC.buy;
    const bitcoinVari = modedas.BTC.variation;
    const stocks = response.data.results.stocks;
    const ibov = stocks.IBOVESPA.points;
    const ibovVari = stocks.IBOVESPA.variation;
    const nasdaq = stocks.NASDAQ.points;
    const nasdaqVari = stocks.NASDAQ.variation;
    await ctx.reply(`Dolar ${dolar} variação ${dolarVari}
Euro ${euro} variação ${euroVari}
Bitcoin ${bitcoin} variação ${bitcoinVari}
Bovespa ${ibov} variação ${ibovVari}
Nasdaq ${nasdaq} variação ${nasdaqVari}`);
});

bot.action('getCarteira', async ctx => {
    const carteira = new Map();
    carteira.set('BBSE3', 3);
    // carteira.set('FLRY3', 1);
    // carteira.set('ITSA3', 8);

    const results = {};

    carteira.forEach(async (value, key) => {
        let response = await axios.get(`https://api.hgbrasil.com/finance/stock_price?key=${env.keyHg}&symbol=${key}`)
        if (response.status !== 200){
            return;
        }
        console.log(`Chave: ${key} value: ${value}`)
        let obj = response.data.results;
        console.log(obj)
    }, carteira)
});

// Outros

bot.action('getOutros', async ctx => {
    await ctx.reply('Em breve...');
});

/*
bot.on('text', async (ctx, next) => {
    const idUser = ctx.update.message.from.id;
    if(idUser === env.user) {
        await ctx.reply('Ao seu dispor, Mestre!!')
        next();
    } else {
        await ctx.reply('Sinto muito, mas eu só fala com o meu mestre!')
    }
});

bot.on('text', async (ctx, next) => {
    await ctx.reply('Logado')
    next()
});

bot.hears('getIp', async (ctx) => {
    await ctx.reply('este e seu ip');
});

bot.hears(['dowloand', 'torrent'], async (ctx) => {
    await ctx.reply('estes sao os arquivos baixados');
});


 */
bot.startPolling();
