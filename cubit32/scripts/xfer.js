function(context, args)
{
	var caller = context.caller;
	if (/cubit3[345]/.test(caller) || context.calling_script == "cubit33.unlock_t2" && args.amount < 3007 || /dcd2bf967e13c1c106be0d843ef75ba4/.test(#fs.cubit33.cubit_hash128(args.hash)))
	{
		if (!args)
		{
			return "amount:<number or GC string> must be included. This script only works for user cubit33 and his alts."
		}
		return #fs.accts.xfer_gc_to_caller({amount:args.amount});
	}
	else
	{
		return { msg:"You are not an approved user of this script" };
	}

}
