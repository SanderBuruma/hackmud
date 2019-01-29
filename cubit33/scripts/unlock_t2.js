function(context, args) //info:false,target:#s.unknown_jrttl_820zd5.entry_97kjq3,report:true,xfer:"cubit32"
{
	let
	kv = {},
	rsp, lastrsp,
	lk,
	ez = ["open","release","unlock"],
	colors = "red,orange,yellow,lime,green,cyan,blue,purple".split(','),
	n1 = "is not the",
	l0cket = "cmppiq,sa23uw,tvfkyq,uphlaw,vc2c7q,xwz7ja,i874y3,72umy0,5c7e1r,hc3b69,nfijix,4jitu5,6hh8xw,9p65cu,j1aa4n,voon2h,d9j270,i874y3,lq09tg".split(','),
	calls = {},
	rpt = {}, //rpt
	upgrades = #hs.sys.upgrades({full:true}),
	k3ys = [],
	caller = context.caller,
	lib = #fs.scripts.lib(),
	glock = [
		{magician:1089},
		{secret:7},
		{elite:1337},
		{monolithic:2001},
		{hunter:3006},
		{secure:443},
		{beast:666},
		{meaning:42},
		{special:38}
	],
	bal = #ms.accts.balance()

	#db.i({script:context.this_script,args,context})

	args=args||{}
	if(args.info || !lib.is_def(args.target)) {return "`Donly unlocks CON_SPEC with WEAVER class users`\n\nInput a target with target:#s.abandoned_jrttl_info6js9kq\nxfer:\"user\" an alt user of yours to transfer your spare cash to\nreport:true (optional) to receive detailed feedback\n\nThis script works most of the time (provided you have the keys for l0ckbox) if it doesnt work, run it a few more times and make small transactions inbetween runs.\n\nmacro:\n/u2 = cubit33.unlock_t2{{target:#s.{0},report:true,xfer:\"youruserhere\"}}"}
	if (!lib.is_def(args.xfer)) return "Please pick an xfer:\"user\" to transfer excess funds to"
	if (/\bcubit3[2-5]\b/.test(args.target.name))
	{
		return "you're not allowed to target the script owner, silly"
	}
	if (context.calling_script && !/\bcubit3[2-5]\b/.test(caller))
	{
		"You're not allowed to call this script from another script!!!"
	}

	#ms.accts.xfer_gc_to({to:args.xfer,amount:bal})
	
	for (let u of upgrades)
	{
		if (u.k3y)
		{
			k3ys.push(u)
			if (u.loaded)
			{
				#ms.sys.manage({unload:u.i})
			}
		}
	}
		
	let lastCalls = 0, totalCalls = 0
	rspC()
	while (tmo())
	{
		if (!rsp)
		{
			rpt["msg"] = "error, target does not exist"
			break
		}
		if (rspI("chain your hardline"))
		{
			return rsp
		}
		
		if (lk && lk.length)
		{
			calls[lk] = lastCalls
		}
		totalCalls += lastCalls, lastCalls = 0
		if (!rspI("ion terminated.") || !rspI("system offline"))
		{
			rspC()
		}
		
		if (rspI("Denied acc")) // lock found
		{
			lk = /`N(\S*?)` lock\./.exec(rsp)[1]
			
			if (lk.includes("magnara"))
			{
				
				kv["magnara"] = ""
				rspC()
				let last4 = /\b\w+$/.exec(rsp)[0].split(""),
				gsses = [], gss, error=true // guesses and guess
				while (tmo())
				{
					
					let last4copy = Array(...last4)
					gss = []
					while (last4copy.length)
					{
						let copy = last4copy.splice(Math.floor(Math.random()*last4copy.length),1)
						gss.push(copy)
					}
					gss = gss.join("")
					if (gsses.indexOf(gss) == -1)
					{
						gsses.push(gss)
						kv["magnara"] = gss
						rspC()
						if (!rspI("recinroct magnara ulotno"))
						{
							error=false
							break
						}
					}
				}
				rpt["magnara_gsses"] = gsses.length
				if (error)
				{
					rpt["msg"] = "error, unknown magnara answer"
					break
				}
				
			}
			else if (lk.includes("acct_nt"))
			{
				let txs = #hs.accts.transactions({count:25}).map(e =>
				{
					e["time"] = parseInt(lib.to_game_timestr(e.time).replace(".",""));
					(e.recipient==caller)?null:e["amount"]*=-1
					return e
				}), rgx=/withdrawal|deposit/
				kv["acct_nt"] = 0
				rspC()
				if (!/spent|earned|What was|withdrawal|deposit/.test(rsp))continue
				
				if(rgx.test(rsp))
				{
					while (txs.length)
					{
						let temp = txs.shift()
						if (temp.recipient == caller && rspI("deposit"))
						{
							kv["acct_nt"] = Math.abs(temp.amount)
							rspC()
							if (!rgx.test(rsp))
							{
								rpt["acct_nt"] = {tx:temp}
								break
							}
						}
						else if (!(temp.recipient == caller) && rspI("withdrawal"))
						{
							kv["acct_nt"] = Math.abs(temp.amount)
							rspC()
							if (!rgx.test(rsp))
							{
								rpt["acct_nt"] = {tx:temp}
								break
							}
						}
					}
				}
				else
				{
					let ts = /(\d+\.\d+)\D+(\d+\.\d+)/.exec(rsp) //timestamps
					ts[1] = parseInt(ts[1].replace(".",""))
					ts[2] = parseInt(ts[2].replace(".",""));
					if (!/ net /.test(rsp)){/without/.test(rsp)?txs=txs.filter(e=>!e.memo):txs=txs.filter(e=>e.memo)} //remove transactions with or without memos if no net GC is asked
					
					let nTM=[], txMid = [], tLL = 0 //nTM = not transaction middle, tLL = transaction lead length
					txs.forEach(e => {
						if (e.time==ts[2])tLL++
						if(e.time==ts[1] || e.time==ts[2]){nTM.push(e)}
						else if (e.time>ts[1] && e.time<ts[2]){txMid.push(e)}
					})

					let midSum = 0; for (let i of txMid) midSum+=i.amount
					let count = 0, count2 = 0, gsses = [], error=true
					while (tmo())
					{
						let sum = midSum, end=false, nNM = nTM.slice(count) //nNM means new not mid
						if (nNM.length) {sum += nNM.reduce((a,o) => { return a + o.amount },0)}
						while (nNM.length>=(tLL-count)&&nNM.length)
						{
							if (gsses.indexOf(sum) == -1)
							{
								gsses.push(sum)
								kv["acct_nt"] = (!/What was/.test(rsp))?Math.abs(sum):sum
								rspC()
								if (!/(total (spent|earned)|What was th)/.test(rsp))
								{
									rpt["acct_nt"] = {count,gsses,ts}
									error=false, end=true
									break
								}
							}
							// #D("\n");#D({nNM:nNM.length,sum});
							sum-=nNM.pop().amount
						}
						if (end) break
						
						count++
						if (count > nTM.length)
						{
							if (!rspI(" net ")) midSum=Math.abs(midSum)
							kv["acct_nt"] = midSum
							rspC()
							if (!/(total (spent|earned)|What was th)/.test(rsp))
							{
								rpt["acct_nt"] = {count,gsses,ts}
								error=false
							}
							else
							{
								rpt["error"] = "could not find the correct amount for `Nacct_nt`"
								rpt["acct_nt"] = {gsses,ts,nTM,rsp}
							}
							break
						}
					}
					if (error) break
				}

			}
			else if (lk.includes("N_SP"))
			{//con_spec only unlocks with weaver class
				kv["CON_SPEC"] = ""
				rspC()
				let az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), // a to z
				sq = /\w{3}(?=\n)/.exec(rsp)[0].split("").map(x=>az.indexOf(x)), // sequence
				nr = [sq[2]-sq[1],sq[1]-sq[0]]
				kv["CON_SPEC"] =
					az[sq[2]+nr[1]]					+
					az[sq[2]+nr[1]  +nr[0]] +
					az[sq[2]+nr[1]*2+nr[0]]
				rspC()
				if (rspI("three letters"))
				{
					rpt["msg"] = "wrong CON_SPEC guess"
					break
				}
			}
			else if (lk.includes("sn_w"))
			{
				kv["sn_w_glock"]=0
				rspC()
				for (let i of glock){for (let j in i)
					{
						if (rspI(j))
						{
							#hs.cubit32.xfer({amount:i[j]})
							rspC()
							if (kv.acct_nt != "undefined")
							{
								rpt["acct_nt_1"] = kv.acct_nt
								delete kv.acct_nt
							}
						}
					}
				}
			}
			else if (lk.includes("EZ_"))
			{

				for (let i of ez)
				{
					kv[lk] = i
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
			else if(lk.includes("c00"))
			{

				for (let i in colors)
				{
					let j = parseInt(i)
					kv[lk] = colors[i]
					if (lk == "c001")
					{
						kv["color_digit"] = kv["c001"].length
					}
					else if (lk == "c002")
					{
						kv["c002_complement"] = colors[(j+4)%8]
					}
					else if (lk == "c003")
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
			else if(lk.includes("l0cket"))
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
					rpt["msg"] = "error, unknown lock argument"
					break
				}

			}
			else if(lk.includes("DATA_CHECK"))
			{

				kv["DATA_CHECK"] = ""
				let data_check = rspC().split("\n")
				if (data_check.length != 3)
				{
					rpt["msg"] = "error, DATA_CHECK error, less then 3 questions"
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
		else if (rspI("To unlock, please load the appropriate k3y:"))
		{
			let reqK3y = /(......)$/.exec(rsp)[1]
			rpt["l0ckbox"] = reqK3y
			let error = true
			for (let i of k3ys)
			{
				if (i.k3y.includes(reqK3y))
				{
					error = false
					#ms.sys.manage({load:i.i})
					rspC()
					break
				}
			}
			if (error)
			{
				rpt["msg"] = "error, l0ckbox requests absent key:"+reqK3y
				break
			}
		}
		else if (rspI("nection terminated."))
		{
			rpt["msg"] = "success!"
			rpt["success"] = true
			break
		}
		else if (rspI(n1))
		{
			rpt["msg"] = "error, wrong lock argument"
			break
		}
		else if (tmo())
		{
			rpt["msg"] = "error, timeout"
			break
		}
		else if (rspI("breached"))
		{
			rpt["msg"] = "error, target already breached!"
			break
		}
		else
		{
			if (!/(total (spent|earned)|What was th)/.test(rsp))
			{
				rpt["acct_nt_count"]?rpt.acct_nt_count=1:rpt.acct_nt_count++
				continue
			}
			rpt["msg"] = "error, rsp not recognized"
			break
		}

	}
	rpt["kv"] = kv
	rpt["rsp"] = rsp
	rpt["lock_calls"] = calls
	rpt["ms"] = Date.now()-_START
	rpt["calls"] = totalCalls+lastCalls
	rpt["timestamp"] = Date.now()
	rpt["caller"] = caller
	rpt["target"] = args.target.name
	rpt["xfer"] = args.xfer
	rpt["script"] = "cubit33.unlock_t2"

	#db.i(rpt)
	if (args.report) return rpt

	function ezDigit(key){
		let digit = 0;
		if (key.includes("prime"))
		{
			digit = 1;
		}
		while (tmo())
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
		lastrsp = rsp
		rsp = args.target.call(kv)
		lastCalls++
		return rsp
	}


	function rspI(x)
	{
		return rsp.includes(x)
	}

	function tmo(x)
	{//timeout checker
		x?0:x=3900 //npcs stop paying out after 4s of runtime
		return Date.now()-_START<x
	}

}