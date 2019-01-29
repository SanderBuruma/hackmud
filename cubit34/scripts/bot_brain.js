function(context, args)
{
	var caller = context.caller
	var l = #fs.scripts.lib()

	let msg = [], call = [], unit
	#D({msg:"debug message 0n3"})
	
	// call.push({call:x=>#fs.dtr.t1_lock_sim(x)})
	// call.push({call:x=>#fs.dtr.t1_lock_sim(x)})
	// call.push({call:x=>#fs.dtr.t1_lock_sim(x)})
	// call.push({call:x=>#fs.dtr.t1_lock_sim(x)})
// call.push({call:x=>#ns.anonymous_ddttl_x5wkbt.info_4m3qsp(x)})
// call.push({call:x=>#ns.anonymous_ddttl_z9nhf9.p_rxdh7k(x)})
// call.push({call:x=>#ns.derelict_ddttl_ckhfmc.public_wh4du0(x)})
// call.push({call:x=>#ns.uknown_ddttl_gba4fd.access_3ri0ek(x)})
// call.push({call:x=>#ns.abandoned_ddttl_9sloy8.out_n4vyld(x)})
call.push({call:x=>#ns.abandoned_ddttl_ixpes0.entry_y6j15y(x)})
call.push({call:x=>#ns.anon_ddttl_h1fa0r.access_elxgmt(x)})
// call.push({call:x=>#ns.anon_ddttl_r7t1ib.pubinfo_20abgs(x)})

	

	while (call.length)
	{
		unit = call.pop()
		unlock({target:unit})
	}
	
	function unlock(scriptor)
	{
		msg.push(#fs.cubit34.unlock_t1(scriptor))
	}

	let stringify = JSON.stringify(msg).substr(0,1e3-5)
	#fs.chats.tell({to:"cubit33",msg:stringify})

	return {err:false, msg:msg}
	
	//replace npc locs with fancy scriptor voodooo
	//\w*_jr\w*\.\w*
	//call.push({call:x=>#ns.$0(x)})
}