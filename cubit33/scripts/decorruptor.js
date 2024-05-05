function(context, args)//target:#s.cyberdine.public,args:{arg1:value1,arg2:value2,etc3:etc3}
{

	var caller = context.caller
	var lib = #fs.scripts.lib()
	if (!args || !args.target)return `cubit33.decorruptor{target:#s.cyberdine.public,args:"arg1:value1,arg2:value2,arg3:value3,etc:etcetera"}\n\nArguments are optional. All values will be converted to strings\n\nmacro:\ncubit33.decorruptor {{ target:#s.{0}, args:{1} }}`
	let response, response2, crp = /`.[¡¢Á¤Ã¦§¨©ª]`/g, join=false

	#db.i({script:context.this_script,args,context})

	if (args) {
		response = args.target.call(args.args)
		response2= args.target.call(args.args)
	} else {
		response = args.target.call()
		response2= args.target.call()
	}
	
	if (typeof response != "string")
	{
		response = response.join("\n").replace(crp,"§")
		response2=response2.join("\n").replace(crp,"§")
		join=true
	}
	else
	{
		response = response.replace(crp,"§")
		response2=response2.replace(crp,"§")
	}

	while (Date.now()-_START<3900)
	{
		
		let corIndex = response.indexOf("§")
		if (corIndex == -1)
		{
			return response
		}
	
		let r2char = response2.substr(corIndex,1)
		if (r2char == "§")
		{
			if (join)
			{
				if (args) {
					response2 = args.target.call(args.args).join("\n").replace(crp,"§")
				} else {
					response2 = args.target.call().join("\n").replace(crp,"§")
				}
			}
			else
			{
				if (args) {
					response2 = args.target.call(args.args).replace(crp,"§")
				} else {
					response2 = args.target.call().replace(crp,"§")
				}
			}
			continue
		}
		
		response = replaceAt(response,corIndex,r2char)

	}
	return response

	function replaceAt(string, index, replacement)
	{
		return string.substr(0, index) + replacement+ string.substr(index + replacement.length)
	}

}