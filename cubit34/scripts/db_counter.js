function(context, args)
{
	var l = #fs.scripts.lib()
	let debug = "";

	if (!args)
	{
		return "A counter script, pass an empty object or del:false to increase the counter, or insert it if it exists. Pass del:true to delete the current counter element."
	}

	let count = #db.f({name:"count"}).first()
	if (!count)
	{
		count = {name:"count",count:1}
		debug = #db.i(count)
		return {msg:"insert",count,debug}
	}

	if (args.del)
	{
		debug = #db.r({name:count.name})
		return {msg:"delete",count,debug}
	}
	else
	{
		debug = #db.u({name:count.name}, { $inc:{count:1} })
		return {msg:"update",count,debug}
	}

}