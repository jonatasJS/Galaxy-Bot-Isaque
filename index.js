//require('http').createServer().listen(3000);
const Discord = require("discord.js");
const client = new Discord.Client();
const jimp = require("jimp");
const config = require("./config.json");
//const package = require("./package.json");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('banco.json')
const db = low(adapter)

/*fs.readdir("./comandos", (err, files) => {
  if(err) console.error(err)
  let arquivosjs = files.filter(f => f.split(".").pop() == "js")
  arquivosjs.forEach((f, i) => {
    let prop = require(`./comandos/${f}`)
    console.log(`O comandos ${f} foi carregado com sucesso!`)
    client.comands.get(prop.help.name, prop)
  })
})*/

const active = new Map();




client.on("ready", () => {

    let ready = client.channels.get("641437316669374474")
    ready.send(`_console.log:_ O BOT foi reiniciado em ${client.guilds.size} servidores, no total de ${client.users.size} usuários, em ${client.channels.size} canais.`)
    console.log(`O BOT foi reiniciado em ${client.guilds.size} servidores, no total de ${client.users.size} usuários, em ${client.channels.size} canais.`); 
		client.user.setPresence({ game:  { name: `Estou em ${client.guilds.size} servidores`, type: 3, url: 'https://www.google.com'} });
		 
    
      //208728646
  
  });
  
  client.on("guildCreate", guild => {
      console.log(`O bot entrou no servidor: ${guild.name} (ID: &{guild.id}). População: ${guild.meberCount} membros!`);
      client.user.setActivity(`Estou em ${client.guilds.size} servidores!`);

      db.set(guild.id, []).write()



  });
  
  client.on("guildDelet", guild => {
      console.log(`O bot foi retirado do servidor: ${guild.name} (ID: &{guild.id}).`);
      client.user.setActivity(`Estou em ${client.guilds.size} servidores!`);
  });

client.on("guildMemberRemove", async member => {
  let saiu = client.channels.get(`641437316669374474`)
    console.log(`${member.user} saiu do servidor!`)
    saiu.send(`(${member.username}, ${member.user.displayAvatarUR}, ${member.user}) saiu. `)
});


/*##################### ISCRIÇÃO #####################*/
client.on('raw', async dados => {
  if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
  if(dados.d.message_id != "644739880294809610") return // id da mensagem

  let servidor = client.guilds.get("639536549708562461") // id do sv
  let membro = servidor.members.get(dados.d.user_id) // id do membro 9

  /*
  **Ganhe cargos reagindo**

  Use 😉 para cargo 1
  Use 👌 para cargo 2
  Use 🙂 para cargo 3
  */

  let cargo1 = servidor.roles.get('644723073551040533'), //id dos cargos
      cargo2 = servidor.roles.get('644723304334360578'),
      cargo3 = servidor.roles.get('644723422420795392') // Até aqui

  if(dados.t === "MESSAGE_REACTION_ADD"){
      if(dados.d.emoji.name === "😉"){ // id do primeiro emoji
          if(membro.roles.has(cargo1)) return
          membro.addRole(cargo1)
      }else if(dados.d.emoji.name === "👌"){ // Id ou emoji nativo
          if(membro.roles.has(cargo2)) return
          membro.addRole(cargo2)
      }else if(dados.d.emoji.name === "🙂"){ // id do terceiro emoji
          if(membro.roles.has(cargo3)) return
          membro.addRole(cargo3)
      }
  }
  if(dados.t === "MESSAGE_REACTION_REMOVE"){
      if(dados.d.emoji.name === "😉"){ // id do primeiro emoji
          if(membro.roles.has(cargo1)) return
          membro.removeRole(cargo1)
      }else if(dados.d.emoji.name === "👌"){ // Id ou emoji nativo
          if(membro.roles.has(cargo2)) return
          membro.removeRole(cargo2)
      }else if(dados.d.emoji.name === "🙂"){ // id do terceiro emoji
          if(membro.roles.has(cargo3)) return
          membro.removeRole(cargo3)
      }
  }

})
/*##################### ISCRIÇÃO #####################*/


client.on("guildMemberAdd", async member => {

let canal = client.channels.get("639556358139543552")
let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
let mask = await jimp.read('mascara.png')
//let avatar = await jimp.read('avatar.jpg')
let fundo = await jimp.read('fundo.png')

jimp.read(member.user.displayAvatarUR).then(avatar => {
    avatar.resize(130, 130)
    mask.resize(130, 130)
    avatar.mask(mask)
    fundo.print(fonte, 170, 175, member.user.username)
    fundo.composite(avatar, 40, 90).write('final.png')
    canal.send(``, { files: ["final.png"]})

    console.log("Imagem enviada para o Discord com sucesso!")
  })
  .catch(_err => {
    console.log('Erro ao carregar a foto do perfil.')
  });

})


client.on("message", async message => {
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
    //if(!message.content.startsWith(config.ix.length)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
/*const arquivoCmd = client.comands.get(comando.slice(ix.length))

if(arquivoCmd) arquivoCmd.rum(client,message,args)
*/
if(comando === "criar") {
 db.get(message.guild.id).push({
  id: message.author.id,
  nick: message.author.username,
  avatar: message.author.displayAvatarURL
 }).write()
 message.channel.send(`Perfil criado com sucesso!`) 

}
if(comando === "editar") {
  let [novonome] = args
  if(!args[0])return  message.channel.send(`Você esqueceu de informar o novo nome!`)
  db.get(message.guild.id)
  .find({id: message.author.id}).assign({nick: novonome}).write()
  message.channel.send(`Perfil editado com sucesso!`)

if(comando === "apagar") {
   db.get(message.guild.id)
   .remove({id: message.author.id}).write()
   message.channel.send(`Perfil apagado com sucesso!`)
}
if(comando === "ping") {
    const m = await message.reply("**PINGANDO...**");
    m.edit(`🏓 **|** ${message.author} **Pong** \n**⏱ | Gateway Ping:** ${m.createdTimestamp - message.createdTimestamp}ms \n**⚡ | API Ping:** ${Math.round(client.ping)}ms\n\nTemplate pegada da Loritta!`);
  
}

/*if(message.content.toLowerCase().startsWith("play")) {
  let VoiceChannel = message.channel.find(channel => channel.id === `639541150423973908`)

  if(VoiceChannel == null) {
    console.log(`Canal encontrado!`)
  }

  if(VoiceChannel == !null) {
    console.log(`Canal foi encontrado!`)

    VoiceChannel.join()
    .then(connection => {
      const stream = ytdl('https://www.youtube.com/watch?v=pq0OxO2DJQc', {filter: 'audioonly'});
      const DJ = connection.playStream(stream, streamOptions)
      DJ.on('end', end => {
        VoiceChannel.leave();
      })
    })
    .catch(console.error)
  }
  

};*/

/*if(comando === "ping") {
    const m = await message.reply("**PINGANDO...**");
    m.edit(`🏓 **|** ${message.author} **Pon** \n**⏱ | Gateway Ping:** ${m.createdTimestamp - message.createdTimestamp}ms \n**⚡ | API Ping:** ${Math.round(client.ping)}ms\n\nTemplate pegada da Loritta!`);
  
  }*/

if(comando === "help") {
  const m = await message.reply({embed: {
    color: 3447003,
    author: {
      name: message.author.username,
      icon_url: message.author.avatarURL
    },
    title: "**Ajuda**",
    description: "Em breve iremos colocar umas \najudas para vocês, tenha calma! 😉",
    timestamp: new Date(),
    footer: {
      text: "EM BREVE © sozinho#5021"
    }
  }
  });
}

if(comando === "convite ") {
    const m = await message.channel.send("```Nossos links de convites: \nSite: https://discord.me/aop \nDireto: https://discord.gg/f4eSB6j \n```");
}

if(comando === "convites") {
  const m = await message.channel.send("```Nossos links de convites: \nSite: https://discord.me/aop \nDireto: https://discord.gg/f4eSB6j \n```");
}

if(comando === "teste") {
    const m = await message.reply(` estou em ${client.guilds.size} servidores. \nCom ${client.users.size} usuários e ${client.channels.size} canais!`);
}

if(comando === "comandos") {
  const m = await message.channel.send({embed: {
    color: 3447003,
    author: {
      name: message.author.username,
      icon_url: message.author.avatarURL
    },
    title: "**Comandos**",
    description: "\nconvites ou convite : Para ver convites disponiveis!\n \nhelp : Para o menu de Ajuda!\n \nping : Para ver o Ping do Gateway e API!\n \ncomandos : Para ver todos os comandos disponiveis!\n",
    timestamp: new Date(),
    footer: {
      text: "© sozinho#5021"
    }
  }
}
);
}

if(comando === "embed") {
  let link = member.user.displayAvatarUR
  const m = await message.channel.send(
    "Está na mão: ${link}"
  )
}

if(comando === "pimba") {

/*  {
    "content":"",
    "embed": {
       "color":-6250077,
       "title":"😭 so teste",
       "description":"teste",
     "footer": {
       "text": "teste"
     }
    }
 }
*/

const m = await message.reply({embed: {
  color: 3447003,
  author: {
    name: client.user.username,
    icon_url: client.user.avatarURL
  },
  title: "**Ajuda**",
  description: "Isso é apenas um teste!",
  timestamp: new Date(),
  footer: {
    text: "${guild.name}© sozinho#5021"
      }
    }
  });
}

}

});


client.login(config.token);