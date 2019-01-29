function(context, args)
{
	// var caller = context.caller
	// var l = #fs.scripts.lib()
	if (!args) {return "Input a target with target:#s.npc.loc\nreport:true to receive feedback"}

	let kv = {} //the variable that will contain all keys and values
	let response,
			lock = "",
			ez = ["open","release","unlock"],
			colors = "red,orange,yellow,lime,green,cyan,blue,purple".split(','),
			n1 = "is not the",//the 1st not comparison string for the incorrect parameter checkers
			l0cket = "cmppiq,sa23uw,tvfkyq,uphlaw,vc2c7q,xwz7ja,i874y3,72umy0,5c7e1r,hc3b69,nfijix,4jitu5,6hh8xw".split(','),
			debug = [],
			times = {},
			report = {}
		
	rspC()

	// return typeof args.target
	// return args.target.name
	let lastCycle = 0
	while (true)
	{

		if (!response)
		{
			report["msg"] = "error, target does not exist"
			break
		}
		if (rspI("chain your hardline"))
		{
			return response
		}

		if (lock.length)
		{
			times[lock] = Date.now()-_START-lastCycle
		}
		lastCycle = Date.now()-_START
		// times.push(Date.now()-_START-times[times.length-1]|0);
		if (!rspI("ion terminated.") || !rspI("system offline"))
		{
			rspC()
		}

		if (rspI("Denied acc")) // lock found
		{
			lock = /`N(\S*?)` lock./.exec(response)[1]
			if (lock.includes("EZ_"))
			{

				for (let i of ez)
				{
					kv[lock] = i
					if (!rspC().includes(n1))
					{
						break
					}
				}
				if (rspI("digit"))
				{
					ezDigit("digit")
				}
				else if (rspI("ez_prime"))
				{
					ezDigit("ez_prime")
				}

			}
			else if(lock.includes("c00"))
			{

				for (let i in colors)
				{
					let j = parseInt(i)
					kv[lock] = colors[i]
					if (lock == "c001")
					{
						kv["color_digit"] = kv["c001"].length
					}
					else if (lock == "c002")
					{
						kv["c002_complement"] = colors[(j+4)%8]
					}
					else if (lock == "c003")
					{
						kv["c003_triad_1"] = colors[(j+5)%8]
						kv["c003_triad_2"] = colors[(j+3)%8]
					}
					rspC()
					if (!rspI(n1))
					{
						break
					}
				}

			}
			else if(lock.includes("l0cket"))
			{

				let error = true
				for (let i of l0cket)
				{
					kv["l0cket"] = i
					if (!rspC().includes(n1))
					{
						error = false
						break
					}
				}
				if (error)
				{
					report["msg"] = "error, unknown lock argument"
					break
				}

			}
			else if(lock.includes("DATA_CHECK"))
			{

				kv["DATA_CHECK"] = ""
				let data_check = rspC().split("\n")
				if (data_check.length != 3)
				{
					report["msg"] = "error, DATA_CHECK error, less then 3 questions"
					break
				}
				let string = "";
				for (let i of data_check)
				{
					string += #fs.lore.data_check({lookup:i}).answer
				}
				kv["DATA_CHECK"] = string

			}
		}
		else if (rspI("nection terminated.") || rspI("system offline"))
		{
			report["msg"] = "success!"
			report["success"] = true
			break
		}
		else if (rspI(n1)) //a lock argument is wrong, something went wrong in the unlocking process
		{
			report["msg"] = "error, wrong lock argument"
			break
		}
		else if (Date.now()-_START > 4500)
		{
			report["msg"] = "error, timeout"
			break
		}
		else if (rspI("breached")) //a lock argument is wrong, something went wrong in the unlocking process
		{
			report["msg"] = "error, target already breached!"
			break
		}
		else
		{
			report["msg"] = "error, response not recognized"
			break
		}

	}
	report["kv"] = kv
	report["rsp"] = response
	report["times"] = times
	report["ms"] = Date.now()-_START

	if (args.report) return report

	function ezDigit(key){
		let digit = 0;
		if (key.includes("prime"))
		{
			digit = 1;
		}
		while (true)
		{
			kv[key] = digit++
			digit>9?digit++:null
			if (!rspC().includes(n1))
			{
				break
			}
		}
	}

	function rspC()
	{
		response = args.target.call(kv)
		return response
	}

	function rspI(x)
	{
		return response.includes(x)
	}

}