const env = require("../.env");
const { exec, execSync } = require("child_process");
const axios = require("axios");
const { Telegraf, Context, session } = require("telegraf");
const { message } = require("telegraf/filters");
const Markup = require("telegraf/markup");
const Scenes = require("telegraf/scenes");

const bot = new Telegraf(env.token);

const contactDataWizard = new Scenes.WizardScene(
  "BUSCA_LIVRO_DATA_WIZARD_SCENE_ID", // first argument is Scene_ID, same as for BaseScene
  (ctx) => {
    ctx.reply("Qual o nome do livro?");
    ctx.wizard.state.contactData = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    // validation example
    // if (ctx.message.text.length < 2) {
    //   ctx.reply('Please enter name for real');
    //   return;
    // }
    console.log("p1");

    ctx.wizard.state.contactData.livro = ctx.message.text;
    console.log(ctx.message.text);
    ctx.reply(`resultado da busca do livro ${ctx.message.text}`);
    return ctx.scene.leave();
    //
    // return ctx.wizard.next();
  }
  // async (ctx) => {
  //   ctx.wizard.state.contactData.email = ctx.message.text;
  //   ctx.reply('Thank you for your replies, we'll contact your soon');
  //   await mySendContactDataMomentBeforeErase(ctx.wizard.state.contactData);
  //   return ctx.scene.leave();
  // },
);

const stage = new Scenes.Stage([contactDataWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => await ctx.reply("Welcome"));
bot.help(async (ctx) => await ctx.reply("Send me a sticker"));
// bot.hears("hi", async (ctx) => await ctx.reply("Hey there"));
bot.hears("hi", async (ctx) => {
  console.log("antes");
  const teste = await ctx.scene.enter("BUSCA_LIVRO_DATA_WIZARD_SCENE_ID");
  console.log(teste);
});
bot.command("yourCommand", async (ctx) => await ctx.reply("Command invoked"));

// bot.launch();
bot.startPolling();

// v1

// const contactDataWizard = new Scenes.WizardScene(
//   "BUSCA_LIVRO_DATA_WIZARD_SCENE_ID", // first argument is Scene_ID, same as for BaseScene
//   (ctx) => {
//     ctx.reply("Qual o nome do livro?");
//     ctx.wizard.state.contactData = {};
//     return ctx.wizard.next();
//   },
//   (ctx) => {
//     // validation example
//     // if (ctx.message.text.length < 2) {
//     //   ctx.reply('Please enter name for real');
//     //   return;
//     // }
//     ctx.wizard.state.contactData.livro = ctx.message.text;
//     return ctx.scene.leave();
//     // ctx.reply('Enter your e-mail');
//     // return ctx.wizard.next();
//   }
//   // async (ctx) => {
//   //   ctx.wizard.state.contactData.email = ctx.message.text;
//   //   ctx.reply('Thank you for your replies, we'll contact your soon');
//   //   await mySendContactDataMomentBeforeErase(ctx.wizard.state.contactData);
//   //   return ctx.scene.leave();
//   // },
// );

// const stage = new Scenes.Stage([contactDataWizard]);
// bot.use(session());
// bot.use(stage.middleware());

// const options = Markup.inlineKeyboard(
//   [
//     Markup.button.callback("Biblioteca", "getBiblioteca"),
//     // Markup.callbackButton("Finanças", "getFinancas"),
//     // Markup.callbackButton("Outros", "getOutros"),
//   ],
//   { columns: 1 }
// );

// const optionsBiblioteca = Markup.inlineKeyboard(
//   [Markup.button.callback("Buscar livro", "getLivro")],
//   { columns: 2 }
// );

// bot.action("getBiblioteca", async (ctx) => {
//   await ctx.reply("Options Biblioteca : ", optionsBiblioteca);
// });

// bot.action("getLivro", async (ctx) => {
//   contactDataWizard.use((ctx) => {
//     ctx.reply("Please choose either Movie or Theater");
//   });
//   // ctx.scene.enter("BUSCA_LIVRO_DATA_WIZARD_SCENE_ID");
//   const resultado = ctx.scene;
//   // await ctx.reply(`Digite o nome do livro`);
//   console.log(resultado);
//   // const ip = execSync(`curl --max-time 60 --ipv4 icanhazip.com`);
//   // await ctx.answerCbQuery(`Seu ip e ${ip} ou mayke.mooo.com`);
//   // execSync(
//   //   `curl http://freedns.afraid.org/dynamic/update.php?VmRDMHhhbTVlTWFvQ1p1UWpSOXU6MTgwNDk4NjA=`
//   // );
// });

// bot.start(async (ctx) => {
//   const from = ctx.update.message.from;
//   if (from.id !== env.user) {
//     await ctx.reply(
//       `Sinto muito ${from.first_name}, mas eu só fala com o meu mestre!`
//     );
//     return;
//   }
//   await ctx.reply(`Seja bem Vindo, ${from.first_name}!`);
//   await ctx.reply("Isso e oque posso fazer: ", options);
// });

// bot.launch();
