function(context, args)
{
	var l = #fs.scripts.lib()
	let debug = "";

	if (!args)
	{
		return "A delete script, pass an empty object or del:false to increase the counter. Pass del:true to delete the current counter element."
	}

	let count = #db.f({name:"count"}).first()
	if (!count)
	{
		count = {name:"count",count:0}
		debug = #db.i(count)
		return {msg:"insert",c:count,dbg:debug}
	}

	if (args.del)
	{
		debug = #db.r({name:count.name})
		return {msg:"delete",c:count,dbg:debug}
	}
	else
	{
		count.count++
		debug = #db.u({name:count.name}, { $set:{count:count.count} })
		return {msg:"update",c:count,dbg:debug}
	}

}