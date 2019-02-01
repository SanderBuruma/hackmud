function(context, args)
{
	var caller = context.caller
	var l = #fs.scripts.lib()

	let sellMe = {}, sellMeNot = false
	let upgradePricing = [ // these objects will determine the bot its valuation of the items that match the names
		//the first stat attribute is the attribute that modifies the cost of the item based on its value
		//incrememntor is the x in basecost * 2^((upgradestat-stat)/incrementor) calculation
		//basecost is the base cost...
		{name:"cron_bot_v2",cooldown:1500,incrementor:-300,basecost:1e8,floorcost:1e6},
		{name:"channel_count_v2",count:2,incrementor:1,basecost:25e6,floorcost:1e6},
		{name:"public_script_v2",slots:2,incrementor:1,basecost:25e6,floorcost:1e6},
		{name:"script_slot_v2",slots:2,incrementor:1,basecost:25e6,floorcost:5e7},
		{name:"char_count_v2",chars:1e3,incrementor:500,basecost:1e8,floorcost:1e6},
		{name:"magnara",magnara_len:4,incrementor:1,basecost:1e7,floorcost:1e6},
		{name:"sn_w_glock",expire_secs:300,incrementor:-50,basecost:5e7,floorcost:1e7},
		{name:"balance_v1",cooldown:3600,incrementor:-1800,basecost:2e7,floorcost:1e6},
		{name:"expose_access_log_v2",cooldown:720,incrementor:-60,basecost:1e7,floorcost:1e6},
		{name:"expose_upgrade_log_v1",cooldown:3600,incrementor:-600,basecost:1e7,floorcost:1e6},
		{name:"expose_upgrades_v1",cooldown:5400,incrementor:-600,basecost:1e7,floorcost:1e6},
		{name:"log_writer_v2",cooldown:1950,incrementor:-300,basecost:1e7,floorcost:1e6},
		{name:"transactions",cooldown:3600,incrementor:-300,basecost:2e7,floorcost:1e6},
		{name:"DATA_CHECK_V2",acc_mod:5,incrementor:3,basecost:1e7,floorcost:1e6},
		{name:"l0cket",count:7,incrementor:1,basecost:2e7,floorcost:1e6},
		{name:"CON_SPEC",p1_len:10,incrementor:-1,basecost:2e7,floorcost:1e6},
		{name:"l0ckbox",count:21,incrementor:2,basecost:3e7,floorcost:1e6}
	]

	let upgrades = #hs.sys.upgrades({full:true}).reverse().forEach(x=>
	{
		if (x.name.includes("k3y") || x.loaded || x.tier > 2)
		{/*continue*/}
		else
		{
			if (x.rarity > 1 && x.tier == 2)
			{
				sellMeNot = true
				let cost = 0

				for (let i of upgradePricing)
				{
					let rareStat = ""
					if (x.name.includes(i.name))
					{
						let count = 0
						for (let j in i) // find the stat attribute
						{
							if (count == 1)
							{
								rareStat = j
								break
							}
							count++
						}
						cost = i.basecost*Math.pow(2,((x[rareStat]-i[rareStat])/i.incrementor))
						cost = Math.floor(cost)
						cost = Math.max(cost,i.floorcost)
						cost = Math.min(cost,2e9)
						let msg = `Listed ${x.name} for ${l.to_gc_str(cost)}. ${rareStat} : ${x[rareStat]}`
						#fs.chats.tell({to:"cubit33",msg})
						#ls.market.sell({i:x.i,cost,confirm:true})
						break
					}
				}

			}
			else if (x.rarity == 1 && x.tier == 2)
			{
				if (typeof sellMe[x.name] != "undefined")
				{
					sellMe[x.name].count++
				}
				else
				{
					sellMe[x.name] = {name:x.name,count:1,i:x.i}
				}
			}
		}
	})
	let random = []
	for (let i in sellMe)
	{
		random.push(i)
	}
	if (random.length > 0 && !sellMeNot)
	{
		sellMeNot = true
		let i = random[Math.floor(Math.random()*random.length)]

		let cost = 2e6
		for (let j in upgradePricing)
		{
			if (j.name == i)
			{
				cost = j.basecost
			}
		}

		count = sellMe[i].count;
		let kv = {i:sellMe[i].i,count,cost,confirm:true}
		let response = #ls.market.sell(kv)
		return {kv,response}
	}
	else if (!sellMeNot)
	{
		let u = #hs.sys.upgrades({full:true})
		
	}

	return { ok:true }
}
