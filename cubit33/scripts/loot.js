function(context, args)
{
	var caller = context.caller
	var l = #fs.scripts.lib()

	let upgrades = #hs.sys.upgrades({full:true})
	let attackUpgrades = {}
	for (let i of "balance,expose_balance,expose_access_log,expose_upgrades,expose_upgrade_log,transactions,w4rn_message,log_writer,transfer,transfer_upgrade".split(","))
	{
		attackUpgrades[i] = []
	}
	
	
	for (let i of upgrades)
	{
		if (/balance_v|expose_balance_v|expose_access_log_v|expose_upgrades_v|expose_upgrade_log_v|transactions_v|w4rn_message_v|log_writer_v|transfer_v|transfer_upgrade_v/.test(i.name))
		{
			if (!(l.is_def(i.last_time)) || (i.last_time + i.cooldown) < Date.now())
			{
				let name = i.name.substr(0,i.name.length-3)
				attackUpgrades[name].push(i)
			}
		}
	}
	let returnStr = ""
	for (let i in attackUpgrades)
	{
		for (let j of attackUpgrades[i])
		{
			let readyStatus = ""
			if (j.last_time)
			{
				j.last_time+j.cooldown*1e3<Date.now()?
					readyStatus="`Lready!`":
					readyStatus="`D"+(Math.floor((j.last_time+j.cooldown*1e3-Date.now())/1e3))+"`s"
			} else {
				readyStatus="`Lready!`"
			}
			returnStr += pad(`${j.i} - ${j.name}`,32)+`- ${readyStatus}\n`
		}
	}
	return returnStr

	function pad(num, size, char)
	{
		char?0:char=" "
		var s = num+"";
		while (s.length < size) s = s + char;
		return s;
	}
}
