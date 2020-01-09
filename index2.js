var data = new Date()
var hora = data.getHours()
var min = data.getMinutes()
var seg = data.getSeconds()
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



client.on("message", async message => {
  
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	//if(message.comando) return console.error()
	  const args = message.content.slice(config.prefix).trim().split(/ +/g);
	  const comando = args.shift().toLowerCase();
  /*const arquivoCmd = client.comands.get(comando.slice(ix))
  
  if(arquivoCmd) arquivoCmd.rum(client,message,args)
  */
  if(comando == "criar") {
   db.get(message.guild.id).push({
	id: message.author.id,
	nick: message.author.username,
	avatar: message.author.displayAvatarURL
   }).write()
   message.channel.send(`Perfil criado com sucesso!`) 
  
  }
  if(comando == "editar") {
	let [novonome] = args
	if(!args[0])return  message.channel.send(`Você esqueceu de informar o novo nome!`)
	db.get(message.guild.id)
	.find({id: message.author.id}).assign({nick: novonome}).write()
	message.channel.send(`Perfil editado com sucesso!`)
  
  if(comando == "apagar") {
	 db.get(message.guild.id)
	 .remove({id: message.author.id}).write()
	 message.channel.send(`Perfil apagado com sucesso!`)
  }
  if(comando == "m!ping") {
	  const m = await message.reply("**PINGANDO...**");
	  m.edit(`🏓 **|** ${message.author} **Pong** \n**⏱ | Gateway Ping:** ${m.createdTimestamp - message.createdTimestamp}ms \n**⚡ | API Ping:** ${Math.round(client.ping)}ms\n\nTemplate pegada da Loritta!`);
	
  }
  
  /*if(message.content.toLowerCase().startsWith("play")) {
	let VoiceChannel = message.channel.find(channel => channel.id == `639541150423973908`)
  
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
  
  /*if(comando == "ping") {
	  const m = await message.reply("**PINGANDO...**");
	  m.edit(`🏓 **|** ${message.author} **Pon** \n**⏱ | Gateway Ping:** ${m.createdTimestamp - message.createdTimestamp}ms \n**⚡ | API Ping:** ${Math.round(client.ping)}ms\n\nTemplate pegada da Loritta!`);
	
	}*/
  
  if(comando == "help") {
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
  
  if(comando == "convite ") {
	  const m = await message.channel.send("```Nossos links de convites: \nSite: https://discord.me/aop \nDireto: https://discord.gg/f4eSB6j \n```");
  }
  
  if(comando == "convites") {
	const m = await message.channel.send("```Nossos links de convites: \nSite: https://discord.me/aop \nDireto: https://discord.gg/f4eSB6j \n```");
  }
  
  if(comando == "teste") {
	  const m = await message.reply(` estou em ${client.guilds.size} servidores. \nCom ${client.users.size} usuários e ${client.channels.size} canais!`);
  }
  
  if(comando == "+comandos") {
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
  
  if(comando == "embed") {
	let link = member.user.displayAvatarUR
	const m = await message.channel.send(
	  "Está na mão: ${link}"
	)
  }
  
  if(comando == "pimba") {
  
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
client.on("ready", () => {


    let ready = client.channels.get("641437316669374474")
    ready.send(`_console.log:_ O BOT foi reiniciado em ${client.guilds.size} servidores, no total de ${client.users.size} usuários, em ${client.channels.size} canais.`)
    console.log(`O BOT foi reiniciado em ${client.guilds.size} servidores, no total de ${client.users.size} usuários, em ${client.channels.size} canais.`); 
		client.user.setPresence({ game:  { name: `Estou em ${client.guilds.size} servidores`, type: 3, url: 'https://www.google.com'} });
		/*function Testehora(){
			ready.send(`Agora são: ${hora}:${min}:${seg}`)
		}

		setInterval(Testehora, 1000)*/
    
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


  
  
  client.login(config.token);