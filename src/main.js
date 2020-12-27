const env = require('../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf(env.token);


const options = Extra.markup(Markup.inlineKeyboard(
    [
        Markup.callbackButton('Qual meu Ip', 'getIp'),
        Markup.callbackButton('Dowloands', 'getDowloands'),
        Markup.callbackButton('Armazenamento', 'getArmazenamento'),
        Markup.callbackButton('Criptomoeda', 'getCriptomoeda')
    ], {columns: 1}
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

bot.action('getIp', async ctx => {
    await ctx.reply(`Executa domando na console capturando ip`);
    const ip = '123.100.123.84'
    await ctx.answerCbQuery(`Seu ip e ${ip} ou mayke.mooo.com`)
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
