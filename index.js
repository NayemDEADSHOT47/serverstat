const { Client, MessageEmbed } = require('discord.js');
const chalk = require("chalk")
const fetch = require("node-fetch")
const config = require("./config")
const client = new Client();

/* Configuration */
var prefix = config.prefix

let interval;
client.on('ready', () => {
    /* Embed Refresh Interval */
    interval = setInterval(editor, config.interval)

    console.log(chalk.yellow(`Logged in as `) + chalk.green(client.user.tag) + chalk.red('!'));
    console.log(chalk.blue("Invite Link : ") + chalk.green(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`))

});

let editor = async () => {

let embed = new MessageEmbed()

try {

    /* Fetching The Server Information */
    const data = await fetch(`http://${config.server.ip}/players.json`, { timeout: 3000 })
.then(res => res.json());

/* Player Count */
var pc;
if(data === null || data === []) {
    pc = 0
} else {
    pc = data.length
}

/* Identifiers */
    const getIdentifiers = ids => ids.reduce((res, id) => {
      const [type, val] = id.split(':');
      res[type] = val;
      return res;
    }, {});

let list = data.map(player => `[ ID: ${player.id} ] \`${player.name}\` <@${getIdentifiers(player.identifiers).discord || "None"}>`).join('\n')

 

} catch(e) {
    
}
    client.user.setActivity(` [${pc}/${config.server.maxplayers}] Playing in Dhaka City Roleplay`)

}



client.login(config.token);