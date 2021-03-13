const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
let aiasembed = new Discord.MessageEmbed().setFooter("developed by aias & where was i").setTimestamp().setColor("RANDOM")
const aias = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
if(aias) return;
const sebep = args[0]
? args
.join(" ")
.replace(new RegExp("@everyone","g"), "everyone")
.replace(new RegExp("@here","g"),"here")
: "Sebep Belirtilmemiş.";
const b = message.member.displayName;
await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
await db.set(`afkid_${message.author.id}_${message.guild.id}`, message.author.id);
await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);
await db.set(`afk_süre_${message.author.id}_${message.guild.id}`, Date.now());
message.channel
  .send(aiasembed.setDescription(
    `:white_check_mark: ${message.author} başarıyla **${sebep}** sebebiyle **[AFK]** oldun!`
  ))
  .then(m => {
    m.delete({timeout:5000});
  });
message.member.setNickname("[AFK] " + b);

};

exports.config = {
  name: "afk",
  guildOnly: true,
  aliases: [],
};