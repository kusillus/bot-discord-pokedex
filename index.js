require('dotenv').config()
const {Client, MessageEmbed} = require('discord.js'),
      axios = require('axios'),
      BASE_URL = 'https://pokeapi.co/api/v2/',
      client = new Client()

function cardPokemonInfo(data){
  let num_dex =  data.id

  if(num_dex < 10){ num_dex = '00'+num_dex}
  else if(num_dex > 9 && num_dex < 100) { num_dex = '0'+num_dex }

  const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(data.name)
    .setURL(`https://www.pokemon.com/es/pokedex/${data.id}`)
    .setThumbnail(data.sprites.front_default)
    .setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num_dex}.png`)
    .addFields( data.types.map( (slot, i) => {
      return {name: `Tipo ${i+1}`, value: slot.type.name, inline: true}
    })) 
    .addFields(
      { name: '\u200B', value: '\u200B' },
    )
    .addFields( data.abilities.map( (slot, i) => {
      return {name: `hab. ${i+1}`, value: slot.ability.name, inline: true}
    })) 
    .addFields(
      { name: '\u200B', value: '\u200B' },
    )
    .addFields( data.stats.map( slot => {
      return {name: slot.stat.name, value: slot.base_stat, inline: true}
    })) 
    .setTimestamp()
    .setFooter('fb.com/rotomdexdiscord', 'https://i.imgur.com/0T7ZabG.png');

    return exampleEmbed
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  let u_msg = msg.content.split(' ')

  if(u_msg[0] === '!pokemon'){
    if(u_msg[1]) {
      axios.get(`${BASE_URL}pokemon/${u_msg[1]}`)
      .then(response => {
        msg.channel.send(cardPokemonInfo(response.data))
      })
      .catch(error => {
        msg.reply('Pokémon no encontrado TnT')
      })
    }
    else {
      msg.reply('¿Qué pokémon quieres buscar?')
    }
  }
});

client.login(process.env.DISCORD_KEY);