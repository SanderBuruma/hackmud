function(context, args)
{
	var caller = context.caller;
	if (!/cubit3[345]/.test(caller))
	{
		return "You are not an approved user of this script\n\nSource code:\n" + fs.scripts.quine()
	}
	if (!args || !args.amount)
	{
		return "amount:<number or GC string> must be included. This script only works for cubit3 and his alts."
	}

	return #fs.accts.xfer_gc_to_caller({amount:args.amount});

}
