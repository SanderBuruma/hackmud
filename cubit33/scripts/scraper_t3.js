function(context, args) //t:#s.context.internal
{
	var caller = context.caller
	var l = #fs.scripts.lib(),
	rsp, username, callCount = 0

	if (!args || !args.t){return "input a target with t:#s.npc.corp, then /auto until the script asks you to input a backup server as a scriptor, run it again with the scriptor and /auto for the 2nd time until success is achieved"}

	let usernames = ["_123lt_jack","_3rd_3y3_grill","ad4m4","aeryn_s","amelie","arr_too_d_to","b3nd3r","b4cca","b4rry_vv","b_sisko","bassy_thecount","be_lavar","bella_swan","boba_the_hutt","bobranator","boris","brohda_99","bus_and_parks","c_vader","catness","chad_bose","cheechfiend91","childishg4mb","cking","computer_blue","corg_train","corgitruthsayer","crichton_j","curtfields0fmay","d4ft","d4ria","d_bowman","d_jackson","daa_freak","daurmith","derek_zoo","diamond_dogz","do_u_need_hal","doc_brown","du_boyz","duke_ell","firebreathingdragon","foxy_guy","frantimike","free_man_morg","geyser_soze","ginnypig","gwashc","h_jimi","hand_solo","hermione","htubman","huey_n","ice_ventura","indie_jones","inigo","jack_sparrow","jamesb","janeway","jermaine","jim_c_kirk","journer_of_truth","juno_macguff","killa_kara","king_luther","lass_doug","leia_it_ontheline","leon","lion_eyes","lt_col_j_shepp","luke_5kywalker","m_ali","m_c_fly","m_clarke_dunk","m_poppins","madthugpug","marc_garv","med_evarz","mjay_m_walker","muld0r","neoone","oz","pick4rluc","poitier_27","pugluv4vr","purple1","q_bey","r0bertm4rley","renaldos_malc","revolution808","ripley_or_not","rob_rob_taylor","robo_deckard","rocky_b","runningman23","sam_cart","sammy_l_jack","scook","seven_out_of_9","shareef_j","shawn_aa","sidney_prescott","sp0ck_08","sportsfan2031","tam_riv","tchalla","terrance_cruz","thadd_0s","thedude","theformalartist","thegreat","thegreatvandross","thepowerful","theshrillery","troy_cole","turn_a_nat","turner_t","uhur4","wc_handy","whois_hermano","wiley_curry","will_de_vaughn","wonderous_steve","x_mal","youngtwokay","zap_dweezil","zap_franscisco","zap_moon","zoe_wash"]

	let si = #db.f({script:context.this_script,caller}).first(), //scrapeInfo
	currentDate = Date.now()
	// si.username = 7
	// si.pin = 0
	// si.rts = 2
	// si.ids = []
	// si.enumeration = -8
	// si.enumeration2 = 0
	// si.rts = 4

	if (!si || currentDate - si.lastRunDate > 144e5 || (args && args.reset === true))
	{
		si = {script:context.this_script,caller,lastRunDate:currentDate,rts:0,username:0,pin:0,ids:[],enumeration:-8,enumeration2:0,idInfos:[],kv:{}} // rts=runTimeState
	}

	let targetName = args.t.name.split(".")[0]

	while (!tmo() && callCount < 200)
	{
		if (si.rts == 0) // find username
		{
			username = usernames[si.username]
			si.kv = {username}
			tc()
			if (!/employee /.test(rsp) && !/not exist/.test(rsp))
			{
				si.rts++
			} else {
				si.username = (si.username+1)%usernames.length
			}
		}
		else if (si.rts == 1) //find pin
		{
			username = usernames[si.username]
			si.kv.pin = pad(si.pin,4,"0")
			// return {pin}
			tc()
			if (!/\nincor/.test(rsp) && !/ect pin/.test(rsp))
			{
				si.rts++
				si.kv.a_t="w_ek"
				si.kv.perform="flow"
				si.kv.work="calendar"
			}
			else
			{
				si.pin++
				si.pin%=1e4
			}
		}
		else if (si.rts == 2) //gather calendar ids
		{
			si.kv.d = si.enumeration++
			tc()
			rsp = rsp.match(/\b[a-z\d]{6}\b/g)||[]
			rsp.forEach(x=>{si.ids.push(x)})
			if (si.enumeration > 7)
			{
				delete si.kv.d
				si.rts++
			}
		}
		else if (si.rts == 3) //collect info from calendar
		{
			si.kv.i = si.ids.shift()
			tc()
			rsp = rsp.replace(/^\S+- \n\n/,"")
			si.idInfos.push(rsp)
			if (si.ids.length < 1)
			{
				delete si.kv.i
				delete si.a_t
				delete si.perform
				delete si.work
				si.rts++
			}
		}
		else if (si.rts == 4) //find backup server
		{
			// return si
			let backupserver = false
			si.idInfos.forEach(x=>{
				if (x.includes(targetName+".")) backupserver = x.match(new RegExp(targetName+"\.[a-z0-9_]*","g"))[0]
			})
			if (!backupserver)
			{
				// return si.idInfos.filter(x=>x.includes(targetName)).slice(0,100)
				// throw "no backupserver"
				si.pin=0
				si.username++
				si.username%=usernames.length
				si.rts = 0
				si.enumeration = -8
				si.enumeration2 = 0
			}
			else
			{
				si.bs = backupserver
				si.rts++
			}
		}
		else if (si.rts == 5) //output the name of the backup server and request the user input it as a scriptor
		{
			si.kv2 = {pin:si.kv.pin}
			break
		}
		else if (si.rts == 6) //scrape the backup server for key
		{
			if (typeof args.bs == "undefined") throw `runstate 6 requires bs:something argument, please input ,bs:#s.${si.bs} into the argument field of this script`
			bsc()
			si.kv2.i = parseInt(rsp.split("\n").filter(x=>/key/.test(x)).join("\n").substr(0,2))
			let key
			while (true)
			{
				bsc()
				rsp.split("\n").forEach(x=>{if (x.length==7&&/[a-z\d+/]/i.test(x)) key = x})
				if (typeof key == "string" && key.length == 7) break//if key is invalid, repeat
			}
			si.key = key
			si.rts++
			si.enumeration = 0
		}
		else if (si.rts == 7) //decrypt idinfos
		{
			let str = si.idInfos[si.enumeration]
			if (!str.includes("invitee:"))
			{
				str = #fs.cubit33.deseancrypt({key:si.key,str})
				if (typeof str.returnArray == "undefined" || str.returnArray.length==0) {/*continue*/}
				else si.idInfos[si.enumeration] = str.returnArray[0].s
			}

			si.enumeration++
			if (si.enumeration >= si.idInfos.length) si.rts++
		}
		else if (si.rts == 8)
		{
			let strings = si.idInfos.filter(x=>/[^a-z\d+/=]/i.test(x)).map(x=>x.split("\n")[0])
			// return si.idInfos.slice(300,400)//.length
			let tempArr = [], resultArr = []
			strings.forEach(x=>{if (tempArr.indexOf(x) == -1) tempArr.push(x)})
			si.kv.perform = "enhance"
			si.kv.a_t = "t_st"
			//si.kv.flow = ???
			tempArr.forEach(x=>
			{
				si.kv.passphrase = x
				resultArr.push(args.t.call(si.kv)+si.kv.passphrase)
			})
			return resultArr
			// throw "end of script"	
		}
	}

	if (si.rts==5)
	{
		si.rts++
	}
	let timeout = tmo()

	#db.r({script:context.this_script,caller})
	#db.i(si)

	if (si.rts==6) throw  `please input ,bs:#s.${si.bs} into the argument field of this script`
	else return { timeout, callCount, rts:si.rts, kv:si.kv, enum:si.enumeration, idsLen:si.ids.length }

	function tc() // target call
	{
		callCount++
		rsp = args.t.call(si.kv)
	}
	function bsc()
	{
		callCount+=2
		rsp = args.bs.call(si.kv2)
	}
	function pad(num, size, char)
	{
		char=char||" "
		var s = num+""
		while (s.length < size) {s = char + s}
		return s
	}	
	function tmo(x)
	{//timeout checker
		x=x||45e2 //npcs stop paying out after 4s of runtime
		return Date.now()-_START>x
	}
}
