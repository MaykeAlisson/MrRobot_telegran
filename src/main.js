const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from);
    ctx.reply(`Seja bem Vindo, ${from.first_name}!`);
});

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

bot.startPolling();