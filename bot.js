var DiscordIO = require("discord.io");
var DiscordJS = require("discord.io");
var logger = require("winston");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";
// Initialize Discord Bot
var bot = new DiscordIO.Client({
  token: process.env.token,
  autorun: true
});
bot.on("ready", function(evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
  bot.setPresence({
    game: {
      name: "!help",
      type: "1", // can be '2' for 'listening to' prefix // can be '3' for 'watching' prefix
      url: ""
    }
  });
});
bot.on("message", function(user, userID, channelID, message, evt) {
  if (message.substring(0, 1) == "!") {
    var args = message.substring(1).split(" ");
    var cmd = args[0];

    args = args.splice(1);

    var rand = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    var randItem = function(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    };
    var answers = ['Можливо.', 'Звичайно ні.', 'Я сподіваюся, що так.', 'Так!', 
  'Не в твоїх диких снах.',  'Цілком імовірно.', 'Беззаперечно', 'Я не впевнений.',
  'Я думаю так.', 'Я думаю ні.', 'Ніколи!', 'Без сумнівів.', 'Я впевнений в цьому.',
  'Агаха! Серйозно?!?', 'Ппффф.',  'Вибач, але ні.', 'Так, чорт візьми.', 'Не надійся.',
  'Майбутнє похмуре.',  'Майбутнє невизначено.', 'Я не хотів би говорити.',
  'Яка різниця?', 'Колись, коли-небудь,', 'Є невеликий шанс.', 'Вибач, але так.', 
  'Знаки кажуть, що так.', 'Ні', 'Поки не зрозуміло, попробуй пізніше.', 'Запитай пізніше.',
  'Краще тобі не знати.', 'Зараз неможливо це взнати.', 'Я зайнятий, запитай пізніше.',
  'Навіть не думай.', 'За моїми даними - ні.', 'Дуже сумнівно', 'Незрозуміло.', 'Шансів мало.'];
    
    switch (cmd) {
      case "help":
        bot.sendMessage({
          to: channelID,
          message:
            "**!help** - display all commands\n" +
            "**!roll** - roll number 0-100\n" +
            "**!choose [] []..** - choose random one\n" +
            "**!ts** - display TeamSpeak3 server\n" +
            "**!8ball [question]** - get an answer"
        });
        break;

      case "roll":
        bot.sendMessage({
          to: channelID,
          message: rand(0, 101)
        });
        break;

      case "choose":
        bot.sendMessage({
          to: channelID,
          message: randItem(args)
        });
        break;
        
      case "ts":
        bot.sendMessage({
          to: channelID,
          message: "TeamSpeak3 server IP - 46.8.158.62:11183"
        });
        break;
        
      case "8ball":
        bot.sendMessage({
          to: channelID,
          message: randItem(answers)
        });
        break;
    }
  }
});
bot.on('disconnect', function(errMsg, code) {
  console.log(code + ' ' + errMsg);
});

