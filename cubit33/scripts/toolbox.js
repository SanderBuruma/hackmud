function(context, args) // info:true
{
	var caller = context.caller
	var l = #fs.scripts.lib()
	let infoString = "This is my toolbox, current options:\n\n`AKey Loader` - `Nk3y`:`V\"string\"` - loads or unloads the first available key with that value, if available\ncubit33.toolbox {k3y:\"4jixaw\"}\n\n`AMarket Sort` - market:true, name:\"string\", key:\"key\" (the referenced key must be numerical, ex. chars) - items are Sorted by the key:value\ncubit33.toolbox {market:true, name:\"k3y_v2\", key:\"k3y\"}\n\n`ATransactions` - transactions:true to see a handy display of all your transactions\ncubit33.toolbox {transactions:true,page:1}\n\n`ASafescript` - safescript:#s.user.script to check a user script and run it if it is fullsec. Include safescript_level:3 to run high sec scripts. a:[argument:value,argument2:\"string\"] to pass along arguments for the script (no spaces)\nmacro:\n/safe = cubit33.toolbox {{ safescript:#s.{0} }}",
	error = true
	#db.i({script:context.this_script,args,context})

	if (args.info || !args)
	{
		return infoString
	}
	if (args.k3y)
	{
		let upgr = #hs.sys.upgrades({full:true})
		upgr.forEach(x => {
			if (x.k3y && x.k3y == args.k3y)
			{
				if (x.loaded){#ms.sys.manage({unload:x.i})} else #ms.sys.manage({load:x.i})
				error=false
			}
		})
		if (error) return "`DKey not found`"
		return "`2"+args.k3y+" found`"
	}
	else if (args.market&&args.name&&args.key)
	{
		let kv = {name:args.name}
		let items = #fs.market.browse(kv)
		let temp = []
		while (items.length)
		{
			temp.push(items.pop().i)
		}
		kv = {i:temp,full:true}
		items = #fs.market.browse(kv).sort((a,b)=>(b.upgrade[args.key]-a.upgrade[args.key]))
		let string = ""
		items.forEach(i=>
		{
			string += `\`2${i.i}\` ${i.upgrade[args.key]} ${l.to_gc_str(i.cost)}\n`
		})
		return string
	}
	else if (args.transactions)
	{
		let page = args.page*100-100
		let txs = #hs.accts.transactions({count:100,start:page}), str=""
		txs.forEach(x=>
		{
			str+=`\n${l.to_game_timestr(x.time)} ${x.recipient==caller?"`N in`":"`Vout`"} ${pad(x.amount,15)} ${x.recipient!=caller?x.recipient:x.sender} \`V${!!x.memo?"MEMO":" "}\``
		})
		return str

	}
	else if (args.testscript && /\bcubit3[2-5]\b/.test(caller))
	{
		return "nothing"
	}
	else if (args.safescript)
	{
		args.safescript_level?0:args.safescript_level=3
		let temp = #fs.scripts.get_level({name:args.safescript.name})
		if (temp < args.safescript_level)
		{
			return `script sec level too low: `+l.get_security_level_name(temp)
		}
		else
		{
			if (typeof args.a == "undefined")
			{
				return args.safescript.call()
			}
			else
			{
				return args.safescript.call(args.a)
			}
		}
	}
	else if (args.k3ysxfer)
	{
		
	}

	function pad(num, size, char)
	{
		char?0:char=" "
		var s = num+"";
		while (s.length < size) s = char + s;
		return s;
	}
	function tmo(x)
	{//timeout checker
		x?0:x=4900 //npcs stop paying out after 4s of runtime
		return Date.now()-_START<x
	}


	return infoString
}
