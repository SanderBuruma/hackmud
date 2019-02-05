function(context, args)//info:true
{
	var caller = context.caller
	var l = #fs.scripts.lib()

	if (typeof args.info != "undefined") return `mode:"corps" to get all currently active T2 corps\ntarget:#s.some.corp to target a specific corp and get their locations after running this script a couple of times\nfilter:"_wb" filters out every location which doesn't have "_wb" in it`

	//the account screen isalways 94 to 97 characters in length

	//steps:
	// 1. find a valid username
	// 2. stack kv with all command keys and add order_qrs as value, put that through dtr.qr
	// 3. loop order_ids through cubit33.decorruptor with added keyvalue cust_service:id

	// return #ms.cyberdine.member_access({username:"geyser_soze"}).length

	let T1corps = ["amal_robo","aon","archaic","bluebun","bunnybat_hut","context","core","cyberdine","empty_nest","etceteraco","futuretech","goodfellow","halperyon","kill_9_1","kill_bio","legion_bible","legion_intl","light","lowell_extermination","marco_polo","merrymoor_pharma","nation_of_wales","nogrub","nuutec","pica","protein_prevention","ros13","ros_13_update_checker","setec_gas","skimmerite","sn_w","soylentbean","subject_object","suborbital_airlines","tandoori","the_holy_checksum","turing_testing","tyrell","vacuum_rescue","weathernet","welsh_measles_info","weyland","world_pop"]
	let suffixes = ["members","member_access","memberlogin","members_only","private","employees","internal","emplogin","priv","employee_login","intern"]     
	let usernames = ["_123lt_jack","_3rd_3y3_grill","ad4m4","aeryn_s","amelie","arr_too_d_to","b3nd3r","b4cca","b4rry_vv","b_sisko","bassy_thecount","be_lavar","bella_swan","boba_the_hutt","bobranator","boris","brohda_99","bus_and_parks","c_vader","catness","chad_bose","cheechfiend91","childishg4mb","cking","computer_blue","corg_train","corgitruthsayer","crichton_j","curtfields0fmay","d4ft","d4ria","d_bowman","d_jackson","daa_freak","daurmith","derek_zoo","diamond_dogz","do_u_need_hal","doc_brown","du_boyz","duke_ell","firebreathingdragon","foxy_guy","frantimike","free_man_morg","geyser_soze","ginnypig","gwashc","h_jimi","hand_solo","hermione","htubman","huey_n","ice_ventura","indie_jones","inigo","jack_sparrow","jamesb","janeway","jermaine","jim_c_kirk","journer_of_truth","juno_macguff","killa_kara","king_luther","lass_doug","leia_it_ontheline","leon","lion_eyes","lt_col_j_shepp","luke_5kywalker","m_ali","m_c_fly","m_clarke_dunk","m_poppins","madthugpug","marc_garv","med_evarz","mjay_m_walker","muld0r","neoone","oz","pick4rluc","poitier_27","pugluv4vr","purple1","q_bey","r0bertm4rley","renaldos_malc","revolution808","ripley_or_not","rob_rob_taylor","robo_deckard","rocky_b","runningman23","sam_cart","sammy_l_jack","scook","seven_out_of_9","shareef_j","shawn_aa","sidney_prescott","sp0ck_08","sportsfan2031","tam_riv","tchalla","terrance_cruz","thadd_0s","thedude","theformalartist","thegreat","thegreatvandross","thepowerful","theshrillery","troy_cole","turn_a_nat","turner_t","uhur4","wc_handy","whois_hermano","wiley_curry","will_de_vaughn","wonderous_steve","x_mal","youngtwokay","zap_dweezil","zap_franscisco","zap_moon","zoe_wash"]
	let navCommands = ["nav","get","see","dir","process","action","action","cmd","command","navigation","entry","open","show"]
	let timeout = false

	if (args.mode == "corps")
	{
		let T2corps = []
		for (let i of T1corps)
		{
			for (let j of suffixes)
			{
				let name = i+"."+j
				let rsp = #fs.scripts.get_level({name})
				if (typeof rsp == "number")
				{
					T2corps.push(rsp+" "+name)
				}
			}
		}
		return T2corps.sort().reverse().join("\n")
		// return T2corps
	}

	if (typeof args.target != "undefined")
	{
		let emptyAttempt = {script:context.this_script,target:args.target.name,date:0,usernames:[],orderIds:[],workingUsername:"",locs:[]}
		let previousAttempt = #db.f({script:context.this_script,target:args.target.name}).first()
		previousAttempt = previousAttempt || emptyAttempt
		if (l.get_date()/1-previousAttempt.date > 120e5) previousAttempt = emptyAttempt
		// return l.get_date()/1-previousAttempt.date
		// return previousAttempt
		
		if (previousAttempt.usernames.indexOf("x_mal") == -1)
		{
			for (let i of usernames)
			{
				if (previousAttempt.usernames.indexOf(i) == -1)
				{
					previousAttempt.usernames.push(i)
					let rsp = args.target.call({username:i})
					if (rsp.length > 93 && rsp.length < 98 && !/(member|account|panel)/.test(rsp))
					{
						let kv = {username:i}
						navCommands.forEach(x=>kv[x] = "order_qrs")
						try {
							let orderIds = #fs.dtr.qr({t:args.target,a:kv}).map(x=>x.id)
						} catch (e) {return {err:"qr",kv,rsp}}
						orderIds.forEach(x=>previousAttempt.orderIds.push(x))
						previousAttempt.workingUsername = i
					}
				}
				if (tmo()) {break}
			}
		}
		
		if (!tmo())
		{
			let kv = {username:previousAttempt.workingUsername}
			
			navCommands.forEach(x=>kv[x] = "cust_service")
			while (previousAttempt.orderIds.length>0 && !tmo())
			{
				kv["order_id"] = previousAttempt.orderIds.pop()
				let rsp = #fs.cubit33.decorruptor({target:args.target,args:kv})
				if (rsp.includes("refunds"))
				{
					rsp = rsp.match(/\w{1,32}\.\w{8,16}/g)
					if (rsp.length > 1) rsp.forEach(x=>previousAttempt.locs.push(x))
				}
			}
		}

		previousAttempt.date = l.get_date()/1
		#db.r({script:context.this_script,target:args.target.name})
		#db.i(previousAttempt)
		
		let ms = l.get_date()-_START
		if (previousAttempt.orderIds.length > 0)
		{
			return {msg:"please run me a few more times",timeout,ms,previousAttempt}
		}
		else
		{
			if (typeof args.filter != "undefined" && args.filter.length>0)
			{
				let regExp = new RegExp(args.filter,"g")
				previousAttempt.locs = previousAttempt.locs.filter(x=>{return regExp.test(x)})
			}
			previousAttempt.locs.sort().push("success! Here are all the locs!\n")
			return previousAttempt.locs
		}
	}



	function tmo()
	{
		if (l.get_date()-_START > 1900)
		{
			timeout=true
			return true
		}
		else
		{
			return false
		}
	}
}