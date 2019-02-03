function(context, args)//info:true
{
	var caller = context.caller
	var l = #fs.scripts.lib()

	//the account screen isalways 94 to 97 characters in length

	//steps:
	// 1. find a valid username
	// 2. stack kv with all command keys and add order_qrs as value, put that through dtr.qr
	// 3. loop order_ids through cubit33.decorruptor with added keyvalue cust_service:id

	// return #ms.cyberdine.member_access({username:"geyser_soze"}).length

	let T1corps = ["amal_robo","aon","archaic","bluebun","bunnybat_hut","context","core","cyberdine","empty_nest","etceteraco","futuretech","goodfellow","halperyon","kill_9_1","kill_bio","legion_bible","legion_intl","light","lowell_extermination","marco_polo","merrymoor_pharma","nation_of_wales","nogrub","nuutec","pica","protein_prevention","ros13","ros_13_update_checker","setec_gas","skimmerite","sn_w","soylentbean","subject_object","suborbital_airlines","tandoori","the_holy_checksum","turing_testing","tyrell","vacuum_rescue","weathernet","welsh_measles_info","weyland","world_pop"]
	let suffixes = ["members","member_access","memberlogin","members_only"]
	let usernames = ["b4rry_vv","bobranator","cheechfiend91","cking","corg_train","corgitruthsayer","d0ctor_wh0m","d4ft","d4ria","ada_love","amelie","bassy_thecount","boris","call_me_hal","chad_bose","doc_brown","du_boyz","foxy_guy","free_man_morg","geyser_soze","h_jimi","htubman","jermaine","journer_of_truth","juno_macguff","leon","lizzie_regna","luke_5kywalker","marc_garv","med_evarz","mh_hamilton","mjay_m_walker","poitier_27","r0bertm4rley","revolution808","rey_tr4cer","sammy_l_jack","scook","shareef_j","shawn_aa","theformalartist","theshrillery","tr4j4n","troy_cole","turn_a_nat","wc_handy","whois_hermano","youngtwokay","yung_lespaul","zap_dweezil","zap_franscisco","c_vader","carrie_on_","catness","childishg4mb","daa_freak","derek_zoo","duke_ell","firebreathingdragon","ginnypig","hermione","ice_ventura","indie_jones","king_in_yellow","king_luther","m_c_fly","m_poppins","pugluv4vr","rocky_b","runningman23","seria_mau_g","sidney_prescott","terrance_cruz","thadd_0s","thegreatvandross","there_is_enoether","turner_t","will_de_vaughn","wonderous_steve","purple1","rain3y","tchalla","lass_doug","lion_eyes","hypati4_370","i_am_the_eggman","jack_sparrow","computer_blue","coitruthsayer","curtfields0fmay","frantimike","bella_swan","bus_and_parks","bassy_thecount","bit33,let'sbegin.","madthugpug","q_bey","x_mal"]
	let navCommands = ["nav","get","see","dir","process","action","action","cmd","command","navigation","entry","open","show"]
	// people, directory, dir, employees, personnel, dir, list, 

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
					T2corps.push(name)
				}
			}
		}
		return T2corps.join("\n")
		// return T2corps
	}
	if (typeof args.target != "undefined")
	{
		let timeout = false
		let previousAttempt = #db.f({script:context.this_script,target:args.target.name}).first() || {script:context.this_script,target:args.target.name,date:0,usernames:[],orderIds:[]}
		for (let i of usernames)
		{
			if (previousAttempt.usernames.indexOf(i) == -1)
			{
				previousAttempt.usernames.push(i)
				let rsp = args.target.call({username:i})
				if (rsp.length > 93 && rsp.length < 98)
				{
					let kv = {username:i}
					navCommands.forEach(x=>kv[x] = "order_qrs")
					let orderIds = #fs.dtr.qr({t:args.target,a:kv}).map(x=>x.id)
					previousAttempt.orderIds = [...orderIds,...previousAttempt.orderIds]
				}
			}
			if (l.get_date()-_START > 4500) {break;timeout=true}
		}
		return {timeout,previousAttempt}
	}
}