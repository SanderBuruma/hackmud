function(context, args)// info:true
{
	if (info) return "/auto this"
	var caller = context.caller
	var l = #fs.scripts.lib()

	let pins = #db.f({script:context.this_script}).first()
	// return pins
	if (!pins)
	{
		pins = {script:context.this_script,pins:["test"]}
	}
	let pin, rsp
	try
	{
		while (tmo())
		{
			pin = pad(Math.floor(Math.random()*1e4),4,"0")
			if (pins.pins.indexOf(pin) == -1)
			{
				pins.pins.push(pin)
				rsp = #ls.nuutec.employees({username:"madthugpug",pin})
				if (rsp.length<55 || rsp.length>70)
				{
					return "`Lsuccess`"+"\npin:"+pin+"\n"+pins.pins.length+"\n"+rsp
				}	
			}
		}
		pins.pins = pins.pins.sort()
		#db.us({script:context.this_script}, {$set:{pins:pins.pins}})
		return "timeout"+"\n"+pin+"\n"+pins.pins.length+"\n"+rsp
	}
	catch (error)
	{
		return error+"\n"+pin+"\n"+rsp
	}

	function pad(num, size, char)
	{
		char?0:char=" "
		var s = num+""
		while (s.length < size) {s = char + s}
		return s
	}
	function tmo(x)
	{//timeout checker
		x?0:x=1900 //npcs stop paying out after 4s of runtime
		return Date.now()-_START<x
	}

}
