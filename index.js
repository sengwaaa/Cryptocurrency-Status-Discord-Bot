const axios = require('axios')
const Discord = require('discord.js')
const client = new Discord.Client()

// variables
const coinId = 'vigorus';
const gildId = '772338781045915650';
//const clientId = '';
const botSecret = 'OTQ1OTU0ODkyODIzMDE5NTcz.YhXrJQ.9eFbVdz6DILQj360AYyPod2yGk4';

function getPrices() {
	// API for price data.
	axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${process.env.PREFERRED_CURRENCY}&ids=${process.env.COIN_ID}`).then(res => {
		// If we got a valid response
		if(res.data && res.data[0].current_price && res.data[0].price_change_percentage_24h) {
			let currentPrice = res.data[0].current_price || 0 // Default to zero
			let priceChange = res.data[0].price_change_percentage_24h || 0 // Default to zero
			let symbol = res.data[0].symbol || '?' 
			client.user.setPresence({
				game: {
					// Example: "Watching -5,52% | BTC"
					name: `${priceChange.toFixed(2)}% | ${symbol.toUpperCase()}`,
					type: 3 // Use activity type 3 which is "Watching"
				}
			})

			console.log('Updated price to', currentPrice)
			current.guilds.find(guild.id === '${guildId}').me.setNickname('${symbol} $${(currentPrice).toLocaleString().replace(/,/
										      g,',')}')
		}
		else
			console.log('Could not load player count data for', process.env.COIN_ID)

	}).catch(err => console.log('Error at api.coingecko.com data:', err))
}

// Runs when client connects to Discord.
client.on('ready', () => {
	console.log('Logged in as', client.user.tag)

	getPrices() // Ping server once on startup
	// Ping the server and set the new status message every x minutes. (Minimum of 1 minute)
	setInterval(getPrices, Math.max(1, process.env.MC_PING_FREQUENCY || 1) * 60 * 1000)
})

// Login to Discord
// https://discord.com/api/oauth2/authorize?client_id=945954892823019573permissions=0&scope=bot%20applications.commands
client.login('${botSecret}')
