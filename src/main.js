const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);


var options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Option 1', callback_data: '1' }],
            [{ text: 'Option 2', callback_data: '2' }],
            [{ text: 'Option 3', callback_data: '3' }]
        ]
    })
};

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

bot.on('callback_query', function onCallbackQuery(ctx, next) {
    const action = ctx.update.callback_query.data;
    if (action === '1') {
        ctx.reply('You hit button 1');
        next()
    }
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