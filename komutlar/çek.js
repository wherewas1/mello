const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let aiasembed = new Discord.MessageEmbed().setFooter("developed by aias & where was i").setColor("RANDOM").setTimestamp();
  if (!uye) return message.channel.send(aiasembed.setDescription("Ses odana çekilecek üyeyi belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send(aiasembed.setDescription("Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!")).then(x => x.delete({timeout: 5000}));
  if (message.member.hasPermission("ADMINISTRATOR")) {
    await uye.voice.setChannel(message.member.voice.channelID);
    message.react('✅').catch();
  } else {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
    };
    message.channel.send(`${uye}`, {embed: aiasembed.setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} seni ses kanalına çekmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
        let cevap = c.first();
	if (cevap) {
	  uye.voice.setChannel(message.member.voice.channelID);
          msj.delete();
          message.react('✅').catch();
	};
      });
    });
  };
};

exports.config = {
  name: "çek",
  guildOnly: true,
  aliases: [],
};