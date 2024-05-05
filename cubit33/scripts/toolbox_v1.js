function(context, args) // info:true
{
	var caller = context.caller
	var l = #fs.scripts.lib()
	let infoString = "This is my toolbox, current options:\n\n`AKey Loader` - `Nk3y`:`V\"string\"` - loads or unloads the first available key with that value, if available\ncubit33.toolbox {k3y:\"4jixaw\"}\n\n`AMarket Sort` - market:true, name:\"string\", key:\"key\" (the referenced key must be a number) - items are Sorted by the key:value\n/mrkt = cubit33.toolbox {market:true, name:\"k3y_v2\", key:\"k3y\"}\n\n`ATransactions` - transactions:true to see a handy display of all your transactions\n/txs = cubit33.toolbox {{transactions:{0}}}\n\n`ASafescript` - safescript:#s.user.script to check a user script and run it if it is fullsec. Include safescript_level:3 to run high sec scripts. a:[argument:value,argument2:\"string\"] to pass along arguments for the script (no spaces)\nmacro:\n/safe = cubit33.toolbox {{ safescript:#s.{0} }}\n\n`ATransfer k3ys` - a quick way to transfer all your keys to another user\n/xferk3ys = {{ k3ysxfer:#s.sys.xfer_upgrade_to, to:\"{0}\" }}"+(isCubit(caller)?"\n\nquerydb:0 to view database, add i:\"oid\" to view a specific user.":""),
	error = true
	#db.i({script:context.this_script,args,context})

	if (!args || args.info)
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
		let page = args.transactions*100-100
		let txs = #hs.accts.transactions({count:100,start:page}), str="", count=0
		txs.forEach(x=>
		{
			str+=`\n${pad(count++,2," ")} ${l.to_game_timestr(x.time)} ${x.recipient==caller?"`N in`":"`Vout`"} ${pad(l.to_gc_str(x.amount),20)} ${x.recipient!=caller?x.recipient:x.sender} \`V${!!x.memo?"MEMO":" "}\``
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
		if (args.k3ysxfer.name == "sys.xfer_upgrade_to")
		{
			if (typeof args.to == "string")
			{
				let upgrades = #hs.sys.upgrades(),
				k3ys = []
				for (let i of upgrades)
				{
					if (i.name.includes("k3y")) k3ys.push(i.i)
				}
				#ms.sys.manage({unload:k3ys})
				return args.k3ysxfer.call({to:args.to,i:k3ys})
			}
			else
			{
				return "to:\"username\" must be inputted as a string with quotes around it"
			}
		}
		else
		{
			return "the k3ysxfer scriptor must be inputted as k3ysxfer:#s.sys.xfer_upgrade_to"
		}
	}
	else if (typeof args.querydb == "number" && /\bcubit3[2-5]\b/.test(caller))
	{
		if (args.i)
		{
			let regExp = new RegExp(args.i+"$","g")
			let results = #db.f({script:"cubit33.unlock_t2"}).array().filter(x=>{return regExp.test(x._id.$oid)})
			return results[0]

		}
		else
		{
			args.querydb-=1
			let results = #db.f({script:"cubit33.unlock_t2"}).array().reverse(),
			count = -1+100*args.querydb,
			string = "",
			pageJump = 100+100*(args.querydb||0)

			// results = results.filter(x=>{return /_(wb)/.test(x.target) && x.success})
			string += `   oid                        target        calls  caller\n`
			while (count++ < pageJump)
			{
				// if (count%100 == 5) return results[count]
				if (typeof results[count] == "undefined") break
				let result= results[count]
				string+= `\n${pad(result._id["$oid"].slice(-8,99))} - ${pad(result.target?result.target.split(".")[0]:"",25)} ${pad(result.l0ckbox || "",6," ")}   ${pad(result.calls||-1,3)} ${pad(result.caller?result.caller.substr(0,8):"",8)} ${result.success?"`2success`":"`Vfailure`"} ${l.to_game_timestr(new Date(result.timestamp||0))} ${result.success?"":typeof result.rsp=="string"?result.rsp.slice(-22,99):""}`
			}
			return string+"\n\n`2"+results.length+"` results! page "+(Math.floor(count/100))+" of "+(Math.floor(results.length/100)+1)
		}
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
	function isCubit(x)
	{
		/\bcubit3[2-5]\b/.test(x)
	}


	return infoString
}
