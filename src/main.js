const env = require('../.env');
const { exec, execSync } = require('child_process');
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
    if (from.id !== env.user){
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
    await ctx.reply('Executa api e retorna valores do bitcoins, dolar, bovespa ...');
});

bot.action('getCarteira', async ctx => {
    const arm = {
        'AcaoA': 3,
        'AcaoB': 1,
        'AcaoC': 5,
        'AcaoD': 1004
    };
    await ctx.reply(`${JSON.stringify(arm)}`, Extra.markdown());
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
