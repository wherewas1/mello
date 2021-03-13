const Discord = require("discord.js");
const ayar = require("../config.js");
module.exports.run = async (client, message, args) => {
let Tag = ayar.tag 

   var TotalMember = message.guild.memberCount
          var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          const aiasembed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`
\`•\` Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.
\`•\` Aktif **${Online}** kullanıcı bulunmaktadır.
\`•\` Tagımızı alan **${Taglı}** kullanıcı bulunmaktadır.
\`•\` Ses Kanallarında **${Voice}** kullanıcı bulunmaktadır.`)
.setFooter("developed by aias & where was i")
message.channel.send(aiasembed)
}
exports.config = {
    name: "say",
    guildOnly: true,
    aliases: ["say"],
  };
 

