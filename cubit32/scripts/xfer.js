function(context, args)
{
	var caller = context.caller;
	if (/cubit3[345]/.test(caller) || context.calling_script == "cubit33.unlock_t2" && args.amount < 3007)
	{
		if (!args)
		{
			return "amount:<number or GC string> must be included. This script only works for user cubit33."
		}
		let msg = #hs.accts.balance();
		#fs.chats.tell({to:caller, msg:msg})
		return #fs.accts.xfer_gc_to_caller({amount:args.amount});
	}
	else
	{
		return { msg:"You are not an approved user of this script" };
	}

}
