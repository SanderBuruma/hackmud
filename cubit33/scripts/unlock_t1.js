function(context, args)
{
	// var caller = context.caller
	// var l = #fs.scripts.lib()
	if (!args) {return "Input a target with target:#s.npc.loc"}
	#db.i({script:context.this_script,args,context})

	let keyParams = {}; //the variable that will contain all keys and parameters
	let response,
			lock,
			ez = ["open", "release", "unlock"],
			colors = "red,orange,yellow,green,blue,purple,cyan,lime".split(','),
			n1 = "is not the",//the 1st not comparison string for the incorrect parameter checkers
			l0cket = "cmppiq,sa23uw,tvfkyq,uphlaw,vc2c7q,xwz7ja,i874y3,72umy0,5c7e1r,hc3b69,nfijix,4jitu5,6hh8xw".split(',')

	while (response = args.target.call(keyParams))
	{
		// if (keyParams.EZ_21)
		// {
		// 	return keyParams
		// }
		if (response.includes("Connection terminated.") || response.includes("reached"))
		{
			return {rsp:response, kp:keyParams, msg:"success", ms:Date.now()-_START, lock:lock}
		}
		else if
		(response.includes("hardline required") ||
		response.includes("rently breach") ||
		response.includes("cannot chain") ||
		response.includes("Connected to"))
		{
			return {rsp:response, kp:keyParams, msg:"error", ms:Date.now()-_START, lock:lock}
		}
		else if
		(Date.now()-_START > 4500)
		{
			return {rsp:response, kp:keyParams, msg:`timeout ${Date.now()-_START} ms`, lock:lock}
		}
		
		if (response.includes("Denied access by"))
		{
			
			//new lock
			lock = response.match(/\S+(?= lock\.)/)[0]
			lock = lock.substr(2,lock.length-3); //find the lock name
			if (lock.includes("EZ_"))
			{
				for (let i of ez)
				{
					keyParams[lock] = i
					if (!args.target.call(keyParams).includes(n1)) {break}
				}
			}
			else if (lock.includes("c00"))
			{
				for (let i of colors)
				{
					keyParams[lock] = i
					if (!args.target.call(keyParams).includes(n1)) {break}
				}
			}
			else if (lock.includes("DATA_CHECK"))
			{
				keyParams["DATA_CHECK"] = ""
				let strings = args.target.call(keyParams).split("\n")
				for (let i of strings)
				{
					keyParams["DATA_CHECK"] += #fs.lore.data_check({lookup:i}).answer
				}
			}
			else if (lock.includes("l0cket"))
			{
				for (let i of l0cket)
				{
					keyParams["l0cket"] = i
					if (!args.target.call(keyParams).includes(n1)) {break}
				}
			}
		}
		else
		{

			//complimentary parameters block
			if (response.includes("ez_prime"))
			{
				keyParams["ez_prime"] = 2
				while (args.target.call(keyParams).includes(n1))
				{
					keyParams["ez_prime"]++
				}
			}
			else if (response.includes("color_digit"))
			{
				keyParams["color_digit"] = 0
				while (args.target.call(keyParams).includes(n1))
				{
					keyParams["color_digit"]++
				}
			}
			else if (response.includes("digit"))
			{
				keyParams["digit"] = 0
				while (args.target.call(keyParams).includes(n1))
				{
					keyParams["digit"]++
				}
			}
			else if (response.includes("c002_complement"))
			{
				for (let i of colors)
				{
					keyParams["c002_complement"] = i
					if (!args.target.call(keyParams).includes(n1)) {break}
				}
			}
			else if (response.includes("c003_triad_1"))
			{
				for (let i of colors)
				{
					keyParams["c003_triad_1"] = i
					if (!args.target.call(keyParams).includes(n1)) {break}
				}
			}
			else if (response.includes("c003_triad_2"))
			{
				for (let i of colors)
				{
					keyParams["c003_triad_2"] = i
					if (!args.target.call(keyParams).includes(n1)) {break}
				}
			}

		}
	}
}
