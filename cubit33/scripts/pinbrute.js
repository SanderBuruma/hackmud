function(context, args)// targetL#s.aon.internal,username:"thugluv4ever"
{
	var caller = context.caller
	var l = #fs.scripts.lib()

	let pin, rsp, timeout = false
	if (typeof args.pin == "undefined")
	{
		// #db.r({script:context.this_script})
		let pins = #db.f({script:context.this_script}).first()
		if (!pins)
		{
			pins = {script:context.this_script,pins:[]}
		}
		// return pins
		try
		{
			while (!tmo())
			{
				pin = pad(Math.floor(Math.random()*1e4),4,"0")
				if (pins.pins.indexOf(pin) == -1)
				{
					pins.pins.push(pin)
					// return args.target.name
					rsp = args.target.call({username:args.username,pin})
					// return rsp.length
					if (rsp.length<68 || rsp.length>71)
					{
						return "`Lsuccess`"+"\npin:"+pin+"\n"+pins.pins.length+"\n"+rsp+"\ninput the pin with pin:\"0123\""
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
	}
	else
	{
		// a_t: m_g || w_ek || t_st || bo_s
		// boris pin: 2581
		// youngtwokay: 0071
		// the w_ek page takes a d:<digits> argument
		// let usernames = ["_123lt_jack","_3rd_3y3_grill","ad4m4","aeryn_s","amelie","arr_too_d_to","b3nd3r","b4cca","b4rry_vv","b_sisko","bassy_thecount","be_lavar","bella_swan","boba_the_hutt","bobranator","boris","brohda_99","bus_and_parks","c_vader","catness","chad_bose","cheechfiend91","childishg4mb","cking","computer_blue","corg_train","corgitruthsayer","crichton_j","curtfields0fmay","d4ft","d4ria","d_bowman","d_jackson","daa_freak","daurmith","derek_zoo","diamond_dogz","do_u_need_hal","doc_brown","du_boyz","duke_ell","firebreathingdragon","foxy_guy","frantimike","free_man_morg","geyser_soze","ginnypig","gwashc","h_jimi","hand_solo","hermione","htubman","huey_n","ice_ventura","indie_jones","inigo","jack_sparrow","jamesb","janeway","jermaine","jim_c_kirk","journer_of_truth","juno_macguff","killa_kara","king_luther","lass_doug","leia_it_ontheline","leon","lion_eyes","lt_col_j_shepp","luke_5kywalker","m_ali","m_c_fly","m_clarke_dunk","m_poppins","madthugpug","marc_garv","med_evarz","mjay_m_walker","muld0r","neoone","oz","pick4rluc","poitier_27","pugluv4vr","purple1","q_bey","r0bertm4rley","renaldos_malc","revolution808","ripley_or_not","rob_rob_taylor","robo_deckard","rocky_b","runningman23","sam_cart","sammy_l_jack","scook","seven_out_of_9","shareef_j","shawn_aa","sidney_prescott","sp0ck_08","sportsfan2031","tam_riv","tchalla","terrance_cruz","thadd_0s","thedude","theformalartist","thegreat","thegreatvandross","thepowerful","theshrillery","troy_cole","turn_a_nat","turner_t","uhur4","wc_handy","whois_hermano","wiley_curry","will_de_vaughn","wonderous_steve","x_mal","youngtwokay","zap_dweezil","zap_franscisco","zap_moon","zoe_wash"]

		//jermaine 3164

		#db.r({script:context.this_script})
		let scrapeInfo = #db.f({script:context.this_script}).first()
		if (!scrapeInfo)
		{
			scrapeInfo = {script:context.this_script,ids:[],enumeration:-8,enumeration2:0,idInfos:[]}
		}
		// return scrapeInfo

		while (!tmo() && scrapeInfo.enumeration < 8)
		{
			let calendarPage = scrapeInfo.enumeration++ *12	
			let calendar = args.target.call({username:args.username,pin:args.pin,a_t:"w_ek",perform:"flow",work:"calendar",d:calendarPage}).match(/[a-z\d]{6}/g)
			// return calendar
			try {
				if (!!calendar) calendar.forEach(x=>{if (!x.includes("calen"))scrapeInfo.ids.push(x)})
			} catch (e) {return "error\n"+calendar}
		}

		while (!tmo() && scrapeInfo.enumeration == 8 && scrapeInfo.ids.length>0)
		{
			let i = scrapeInfo.ids.shift()
			let response = args.target.call({username:args.username,pin:args.pin,a_t:"w_ek",perform:"flow",work:"calendar",i:i}).replace(/^(w_ek|calendar|flow)- \n\n/,"")
			// if (response.includes("calendar")) return i
			scrapeInfo.idInfos.push(response)
		}

		while (!tmo() && scrapeInfo.enumeration == 8 && scrapeInfo.ids.length==0 && scrapeInfo.enumeration2 < scrapeInfo.idInfos.length)
		{
			let str = scrapeInfo.idInfos[scrapeInfo.enumeration2]
			if (str.indexOf("invitees") == -1)
			{
				let response = #fs.cubit33.deseancrypt({key:"iG1AmNA",str})
				scrapeInfo.idInfos[scrapeInfo.enumeration2] = response.text
			}
			scrapeInfo.enumeration2++
		}
		
		#db.us({script:context.this_script}, {$set:{ids:scrapeInfo.ids,enumeration:scrapeInfo.enumeration,enumeration2:scrapeInfo.enumeration2,idInfos:scrapeInfo.idInfos}})
		// return {timeout,scrapeInfo}
		return scrapeInfo.idInfos
	}
	
	return "/auto this"
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
		timeout = true
		return Date.now()-_START>x
	}

	
}
