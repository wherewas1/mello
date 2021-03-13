const Discord = require('discord.js');
const db = require('quick.db');
const { jailRol } = require('../config.js');
const ayar = require("../config.js");

module.exports.run = async (client, message, args) => {
    if(![(ayar.jailYetki)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`**⚠️ • Bu Komutu Kullanabilmek İçin \`Jail\` Yetkisine Sahip Olman Lazım**`))
   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   if(!member) {
       return message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setAuthor(`Uyarı`, message.author.avatarURL()).setFooter('developed by aias & where was i').setDescription("**:x: Bir Kişi Etiketlemelisin**"))
   }
   
   let jail = message.guild.roles.cache.find(r => r.id === ayar.jailRol)

   
   let tag = '[Jail]'


   
   if(!jail) {
       return message.channel.send(new Discord.MessageEmbed().setAuthor(`Uyarı`, message.author.avatarURL()).setColor("BLACK").setFooter('developed by aias & where was i').setDescription("**⚠️ • Jail Rolü Ayarlanmamış**"))
   }

   let jail2 = message.guild.member(member)

   let sebep = args.slice(1).join(' ')
  if (!sebep) return message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setAuthor(`Uyarı`, message.author.avatarURL()).setFooter('developed by aias & where was i').setDescription(`**⚠️ • Sebep Belirtmelisin**`))

   member.roles.set([jailRol])
   jail2.setNickname(`${tag}`)
   let embed = new Discord.MessageEmbed()
   .setAuthor(`Düştüm Mapus Damlarına`, message.author.avatarURL())
   .setColor('BLACK')
   .setFooter('developed by aias & where was i')
   .setDescription(`Jail'e Atılan Kullanıcı : ${member} \nSebep : ${sebep} \nJail'e Atan Yetkili : ${message.author}`)
   message.channel.send(embed);
  
    client.channels.cache.get(ayar.jailLog).send(new Discord.MessageEmbed().setAuthor(`İşlem Bilgi`, message.author.avatarURL()).setColor("BLACK").setFooter('developed by aias & where was i').setDescription(`${member} Adlı Üye Jaile Atıldı\nJaile Atan Yetkili ${message.author}\nSebep : ${sebep}`));
}


exports.config = {
    name: "jail",
    guildOnly: true,
    aliases: ["hapis"],
  };



