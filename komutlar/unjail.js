const Discord = require('discord.js');
const db = require('quick.db');
const ayar = require("../config.js");

module.exports.run = async (client, message, args) => {
    if(![(ayar.jailYetki)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`**⚠️ • Bu Komutu Kullanabilmek İçin \`Jail\` Yetkisine Sahip Olman Lazım**`))
   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   if(!member) {
       return message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setAuthor(`Uyarı`, message.author.avatarURL()).setFooter('developed by aias & where was i').setDescription("**:x: Bir Kişi Etiketlemelisin**"))
   }
  
   let tag = '[Jailden Çıktı]'
   


   


   let jail2 = message.guild.member(member)

   member.roles.set([ayar.kayıtsız])
   jail2.setNickname(`${tag}`)
   let embed = new Discord.MessageEmbed()
   .setAuthor(`Güneşi Görebilirsin.`, message.author.avatarURL())
   .setColor('BLACK')
   .setFooter('developed by aias & where was i')
   .setDescription(`Jail'den Çıkan Kullanıcı : ${member} \nJail'den Çıkaran Yetkili : ${message.author}`)
   message.channel.send(embed);
  
   client.channels.cache.get(ayar.jailLog).send(new Discord.MessageEmbed().setAuthor(`İşlem Bilgi`, message.author.avatarURL()).setColor("BLACK").setFooter('developed by aias & where was i').setDescription(`${member} Adlı Üye Jailden Çıkarıldı\nJailden Çıkaran Yetkili ${message.author}`));
}


exports.config = {
    name: "unjail",
    guildOnly: true,
    aliases: ["unhapis"],
  };



