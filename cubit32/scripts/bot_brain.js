function(context, args)
{
	var caller = context.caller
	var l = #fs.scripts.lib()
	
	#ns.cubit32.report()

	let sellMe = {}, sellMeNot = false
	let upgradePricing = [ // these objects will determine the bot its valuation of the items that match the names
		//the first stat attribute is the attribute that modifies the cost of the item based on its value
		//incrementor is the x in basecost * 2^((upgradestat-stat)/incrementor) calculation
		//basecost is the base cost...
		{name:"cron_bot_v2",cooldown:1500,incrementor:-300,basecost:4e7,floorcost:1e6},
		{name:"channel_count_v2",count:2,incrementor:1,basecost:25e6,floorcost:1e6},
		{name:"public_script_v2",slots:2,incrementor:1,basecost:25e6,floorcost:1e6},
		{name:"script_slot_v2",slots:2,incrementor:1,basecost:25e6,floorcost:5e7},
		{name:"char_count_v2",chars:1e3,incrementor:500,basecost:1e8,floorcost:1e6},
		{name:"magnara",magnara_len:4,incrementor:1,basecost:1e7,floorcost:1e6},
		{name:"sn_w_glock",expire_secs:300,incrementor:-60,basecost:1e7,floorcost:1e7},
		{name:"balance_v1",cooldown:3600,incrementor:-1800,basecost:2e7,floorcost:1e6},
		{name:"expose_access_log_v2",cooldown:540,incrementor:-120,basecost:1e7,floorcost:1e6},
		{name:"expose_upgrade_log_v1",cooldown:3600,incrementor:-600,basecost:1e7,floorcost:1e6},
		{name:"expose_upgrades_v1",cooldown:5400,incrementor:-600,basecost:1e7,floorcost:1e6},
		{name:"transfer_v1",cooldown:7200,incrementor:-300,basecost:1e7,floorcost:1e6},
		{name:"acct_nt",acct_nt_min:4,incrementor:2,basecost:5e6,floorcost:1e6},
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
						#D(x)
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
	
	for (let k in sellMe)
	{
		//sell white items
		if (sellMe[k].count > 2 && !sellMeNot)
		{
			let cost
			for (let j in upgradePricing)
			{
				if (sellMe[k].name == upgradePricing[j].name){cost = upgradePricing[j].basecost} else {cost = 5e6}
			}
			
			sellMeNot=true
			let count = sellMe[k].count
			let kv = {i:sellMe[k].i,count,cost,confirm:true}
			let response = #ls.market.sell(kv)
			let msg = kv.count+" of "+k.name+" put on market for "+l.to_gc_str(kv.cost)
			#fs.chats.tell({to:"cubit33",msg})
			return {kv,response}
		}
	}
	
	if (!sellMeNot)
	{
		//sell k3ys which aren't rare
		let u = #hs.sys.upgrades({full:true})
		let k3yCount = {}
		for (let i of u)
		{
			if (i.name.includes("k3y_") & i.tier < 3 & i.rarity < 2)
			{
				let arrKey = i.name+" "+i.rarity	
				if (typeof k3yCount[arrKey] == "undefined")
				{
					k3yCount[arrKey] = {count:1,tier:i.tier,rarity:i.rarity}
				}
				else
				{
					k3yCount[arrKey].count++
				}
			}
		}
		for (let i in k3yCount)
		{
			if (k3yCount[i].count > 10)
			{
				for (let j of u)
				{
					if (j.name.includes("k3y_") && j.tier == k3yCount[i].tier && j.rarity == k3yCount[i].rarity)
					{
						let cost = 1e7
						cost*=(j.tier)
						cost*=(j.rarity+1)
						if (i.rarity == 1) cost*=2
						let msg = `${k3yCount[i].count} k3ys put on market of tier ${j.tier} and rarity ${j.rarity} for ${l.to_gc_str(cost)} each`
						#fs.chats.tell({to:"cubit33",msg})
						return #ls.market.sell({i:j.i,count:k3yCount[i].count,cost:cost,confirm:true})
					}
				}
			}
		}
	}
}