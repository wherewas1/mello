const Discord = require("discord.js")    
const client = new Discord.Client();     
const config = require("./config.js")   
const fs = require("fs");               
const db = require("quick.db"); 
const ms = require("parse-ms");
require('./util/Loader.js')(client);     

client.commands = new Discord.Collection(); 
const commands = new Map();
global.commands = commands;
client.aliases = new Discord.Collection();  
fs.readdir('./komutlar/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {                       
    let props = require(`./komutlar/${f}`);   
    console.log(`${props.config.name} komutu yüklendi.`); 
    console.log(`aias & where was i Passengers Moderasyon Botu`)   
    client.commands.set(props.config.name, props); 
    props.config.aliases.forEach(alias => {          
      client.aliases.set(alias, props.config.name);  
    });
  });
})
/*
client.on('ready', () => {
  client.channels.cache.get('803258451861176320').join()
});
*/
client.login(config.token)


//AFK SİSTEMİ//

function afkSil(message, afk, isim) {
  let süre = db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
  let timeObj = ms(Date.now() - süre);
  message.channel.send(`${message.author} Artık **AFK** değilsiniz.\n\n${timeObj.days} gün, ${timeObj.hours} saat, ${timeObj.minutes} dakika, ${timeObj.seconds} saniye boyunca afk kaldın!`).then(m => {
    m.delete({timeout:10000})
  });
  db.delete(`afkSebep_${afk.id}_${message.guild.id}`)
  db.delete(`afkid_${afk.id}_${message.guild.id}`)
  db.delete(`afkAd_${afk.id}_${message.guild.id}`)
  db.delete(`afk_süre_${afk.id}_${message.guild.id}`)
  message.member.setNickname(isim)
};

client.on("message" , async message => {
  let aiasembed = new Discord.MessageEmbed().setFooter("developed by aias & where was i").setTimestamp().setColor("RANDOM")
  if (message.author.bot) return;
  if (!message.guild) return;
  var fd = false
  var sdd = new Set();
  let afk = message.mentions.users
  if (afk.first()) {
    afk.forEach(async afk => {
      if (sdd.has(afk.id)) return;
      else sdd.add(afk.id)
      var kisi = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
      var kisi2 = db.fetch(`afkid_${message.member.id}_${message.guild.id}`)
      if (kisi) {
        var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
        if (kisi2) {
          fd = true
          afkSil(message, message.member, isim)
        }
        if (afk.id == message.member.id) {
          if (!fd) afkSil(message, afk, isim)
        }
        if (afk.id !== message.member.id) {
          var sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
          if (sebep) {
            let süre = await db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
            let timeObj = ms(Date.now() - süre);
            message.channel.send(aiasembed.setDescription(`${afk} şu an da AFK!
Şu kadar süredir: ${timeObj.days} Gün, ${timeObj.hours} Saat, ${timeObj.minutes} Dakika, ${timeObj.seconds} Saniye
Sebep: ${sebep}`)).then(m => {
              m.delete({timeout:10000})
            });
          };
        }
      } else {
        afk = message.member
        kisi = db.fetch(`afkid_${message.member.id}_${message.guild.id}`)
        if (kisi) {
          var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
          if (afk.id == message.member.id) {
            afkSil(message, afk, isim)
          }
          if (afk.id !== message.member.id) {
            var sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
            if (message.content.includes(kisi)) {
              if (sebep) {
                let süre = await db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
                let timeObj = ms(Date.now() - süre);
                message.channel.send(aiasembed.setDescription(`${afk} şu an da AFK!
Şu kadar süredir: ${timeObj.days} Gün, ${timeObj.hours} Saat, ${timeObj.minutes} Dakika, ${timeObj.seconds} Saniye
Sebep: ${sebep}`)).then(m => {
                  m.delete({timeout:10000})
                });
              };
            }
          }
        }
      }
    })
  } else {
    afk = message.member
    var kisi = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
    if (!kisi) return;
    var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
    afkSil(message, afk, isim)
  }
});


//İLTİFAT SİSTEMİ//

const iltifatlar = [
  'İlk görüşte aşka inanır mısın? Yoksa gidip tekrar mı geleyim?',
  'Öyle güzel bakma bana; Allah yarattı demem, severim!',
  'Telefon numaramı unutmuşum, seninkini ödünç alabilir miyim?',
  'Bu güzellik gerçek olamaz, sanırım rüya görüyorum. Bana bir çimdik atar mısın?',
  'Sabah namazında, ışıkları yanan evler kadar güzelsin yar. Daha ne diyeyim ki!',
  'Çok yorulmuş olmalısın. Bütün gün beynimin içinde koşturup durdun.',
  'Annene sor bakayım , damat lazım mıymış?',
  'Aman Allah’ım gerçekten omuz kemikleri, ben bunları bir çift kanat sanmıştım.',
  "Aias sana selamını iletti ;)",
  "Aias senden mesaj bekliyor haberin olsun :)",
  "Tak jileti dudağına öp beni şahdamarımdan...",
];

var iltifatSayi = 0; 
client.on("message", async message => {
  if(message.channel.id !== config.chatKanal || message.author.bot) return;
  iltifatSayi++
  if(iltifatSayi >= 30) { 
    iltifatSayi = 0;
    const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
    message.reply(`**${(iltifatlar)[random]}**`);
  };
});

//BOOST BASINCA EMBEDLİ MESAJ//

client.on('guildMemberBoost', (member) => {
let chatkanal = client.channels.cache.get(config.chatKanal)
client.channels.cache.get(chatkanal).send(
  new Discord.MessageEmbed()
  .setDescription(`Hey! ${member.toString()}Takviye yapıp bizi desteklediğin için sana minnettarız.
  İşte takviye bastığın için birkaç özellik;

  \`•\` Artık **BoosterPas** rolüne sahipsin ve bazı ayrıcalıkların var!
  \`•\` Sunucuda kendi adını değiştirebileceksin.
  \`•\` Sunucumuzda paylaşılan tüm altyapılara erişebileceksin.
  \`•\` Sunucumuzda sağ tarafta ayrı gözükeceksin.
  \`•\` Boosterlara özel ses kanalına bağlanabileceksin.`)
)})

