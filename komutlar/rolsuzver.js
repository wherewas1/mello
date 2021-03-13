const Discord = require("discord.js");
const ayar = require("../config.js");


module.exports.run = async (client, message, args) => {
const aiasembed = new Discord.MessageEmbed().setColor("RANDOM").setTimestamp().setTitle("Uyarı").setFooter("developed by aias & where was i.").setDescription("Buna Gücün Yetmez :/")
if(![(ayar.sahipRol)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(aiasembed)


let aiasrol = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

if(args[0] == "ver") {
    aiasrol.forEach(r => {
r.roles.add(ayar.kayıtsız)
})
const aiase = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription("Sunucuda rolü olmayan \`"+ aiasrol.size +"\` kişiye kayıtsız rolü verildi!")
message.channel.send(aiase)
} else if(!args[0]) {
const aiase = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription("Sunucumuzda rolü olmayan \`"+ aiasrol.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsuz ver\` komutunu uygulayın!")
message.channel.send(aiase)
}


}

exports.config = {
    name: "rolsuz",
    guildOnly: true,
    aliases: ["rolsuzver"],
  };