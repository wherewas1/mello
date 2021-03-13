const Discord = require("discord.js");
const ms = require("ms");
const ayar = require("../config.js");
const db = require("quick.db");

module.exports.run = async (client, message, args, params) => {
    if(![(ayar.muteYetki)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`**⚠️ • Bu Komutu Kullanabilmek İçin \`Mute\` Yetkisine Sahip Olman Lazım**`))
    const user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

  if (!user)
    return message.channel.send(
      "Bir kullanıcı belirt ister etiketleyerek ister id ile ister kullanıcı adı ile."
    ).then(a => a.delete({timeout: 5000}))
  const time = args[1] ? args[1] : "x";
  var _time;
  message.react("💬").then(() => message.react("🔈"));
  const filter = (reaction, user) => {
    return (
      ["💬", "🔈"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  message
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === "💬") {
        textMute();
      } else if (reaction.emoji.name === "🔈") {
        voiceMute();
      }
    })
    .catch((collected) => {
      message.reply("Malesef geç kaldın!").then(x => x.delete({timeout: 6000}))
    });
  const textMute = async () => {
    let muterol = message.guild.roles.cache.find(r => r.id === ayar.muteRol)
    await user.roles.add(muterol.id);
    _time =
      time !== "x"
        ? time + " kadar sürelik susturması başladı."
        : "susturması başladı.";
    message.channel.send(
      user.user.username + " adlı kullanıcının yazılı kanallardaki " + _time
    ).then(x => x.delete({timeout: 5000}))
    if (time !== "x") {
      setTimeout(() => {
        user.roles.remove(muterol.id);
        message.channel.send(
          user.user.username +
            " adlı kullanıcının yazılı kanallardaki " +
            time +
            " kadar sürelik susturması kaldırıldı."
        )
      }, ms(time));
    }
  };
  const voiceMute = () => {
    user.voice.setMute(true);
    _time =
      time !== "x"
        ? time + " kadar sürelik susturması başladı."
        : "susturması başladı.";
    message.channel.send(
      user.user.username + " adlı kullanıcının sesli kanallardaki " + _time
    ).then(x => x.delete({timeout: 5000}))
    if (time) {
      setTimeout(() => {
        user.voice.setMute(false);
        message.channel.send(
          user.user.username +
            " adlı kullanıcının sesli kanallardaki " +
            time +
            " kadar sürelik susturması kaldırıldı."
        );
      }, ms(time));
    }
  };
};
exports.config = {
    name: "mute",
    guildOnly: true,
    aliases: [],
  };

