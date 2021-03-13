const Discord = require("discord.js");
const ayar = require("../config.js");

module.exports.run = async (client, message, args) => {
const aiasembed = new Discord.MessageEmbed().setColor("RANDOM").setTimestamp().setTitle("Uyarı").setFooter("developed by aias & where was i")
if(![(ayar.banYetki)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(aiasembed.setDescription("Bu komutu kullanmak için yeterli yetkiye sahip değilsin.")).then(x => x.delete({timeout: 5000}));
const member = message.mentions.members.first()||message.guild.members.cache.get(args[0]);
let sebep = args.slice(1).join(" ")
let guild = message.guild;

if(!member) return message.channel.send(aiasembed.setDescription("Bir Üye Etıketle.")).then(a => a.delete({timeout: 5000}))


if(message.guild.member(message.author).roles.highest.position  <= message.guild.member(member).roles.highest.position)
{
return message.channel.send(aiasembed.setDescription("Kulanıcının yetkisi seninle aynı veya senden daha yüksek olduğu için komut geçersiz.")).then(a => a.delete({timeout: 5000}))
}

if(message.guild.member(client.user).roles.highest.position  <= message.guild.member(member).roles.highest.position)
{
return message.channel.send(aiasembed.setDescription("Botun rolü kullanıcadan daha düşük.")).then(a => a.delete({timeout: 5000}))
}


if(!sebep) return message.channel.send(aiasembed.setDescription("Bir Sebep Gir")).then(a => a.delete({timeout: 5000}))

let banladim = 0;
guild.members.ban(member).catch(() => banladim = 1)

const ban = new Discord.MessageEmbed()
.setColor('RANDOM')
if(banladim > 0) ban.addField(`** ****${member}** isimli kullanıcı bir sorun nedeniyle banlanamadı.`)
else ban.addField(`** **${member}** isimli kullanıcı **${sebep}** sebebiyle **${message.author}** tarafından banlandı.`)

message.channel.send(ban)

client.channels.cache.get(ayar.banLog).send(aiasembed.setDescription(`${sebep} sebebiyle ${member} isimli kişi ${message.author} tarafından banlandı.`))
};


exports.config = {
    name: "ban",
    guildOnly: true,
    aliases: ["yargı"],
  };

