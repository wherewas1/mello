const { MessageEmbed } = require('discord.js');
const ayar = require("../config.js")

module.exports.run = async (client, message, args) => {
    const aiasembed = new MessageEmbed().setColor("RANDOM").setTimestamp().setTitle("Uyarı").setFooter("developed by aias & where was i")
    if(![(ayar.banYetki)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
    return message.channel.send(aiasembed.setDescription("Bu komutu kullanmak için yeterli yetkiye sahip değilsin.")).then(x => x.delete({timeout: 5000}));
    let user = args[0];
    const banList = await message.guild.fetchBans();
    if (!user || isNaN(user) || !banList.has(user)) {
        return message.channel.send(aiasembed.setDescription(`:x: Kullanıcı id hatalı veya kullanıcı yasaklı değil!`)).then(x => x.delete({timeout: 5000}));
    }
    message.guild.members.unban(user);
    message.channel.send(aiasembed.setDescription(`:white_check_mark: Başarıyla üyenin yasaklaması kaldırıldı!`))
    client.channels.cache.get(ayar.banLog).send(aiasembed.setDescription(`${user} isimli kişinin yasaklaması ${message.author} tarafından kaldırıldı!`))
};

exports.config = {
    name: "unban",
    guildOnly: true,
    aliases: ["unban"],
  };