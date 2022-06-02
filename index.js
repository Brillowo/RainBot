const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const firstMessage = require('./first-message')
const command = require('./command')
const privateMessage = require('./private-message')

client.on('ready', () => {
  console.log('The Bot is ready!')

  command(client, 'serverinfo', (message) => {
    const { guild } = message

    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .addFields(
        {
          name: 'Region',
          value: region,
        },
        {
          name: 'Members',
          value: memberCount,
        },
        {
          name: 'Owner',
          value: owner.user.tag,
        },
        {
          name: 'AFK Timeout',
          value: afkTimeout / 60,
        }
      )

    message.channel.send(embed)
  })

  

  //privateMessage(client, 'ping', 'pong!')


  //firstMessage(client, '866988941769179156', 'hello world!!', ['🔥', '🍉'])
  

  command(client, 'servers', (message) => {
      client.guilds.cache.forEach((guild) => {
        message.channel.send(
            `${guild.name} Has A Total Of ${guild.memberCount} Members!`
        )
      })
    })

    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', message => {
        const content = message.content.replace('!status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            }
        })
    })
})

client.login(config.token)