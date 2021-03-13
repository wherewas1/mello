const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!").then(a => a.delete({timeout: 5000}))

  
if(!args[0]) return message.channel.send(`:x: **Lütfen Silinicek Mesaj Miktarını Yazın.!**`).then(a => a.delete({timeout: 5000}))


message.channel.bulkDelete(args[0]).then(() => {
message.channel.send(` :white_check_mark: ${args[0]} Adet Mesajı Sildim. `)
})
}


exports.config = {
    name: "sil",
    guildOnly: true,
    aliases: ["temizle"],
  };
