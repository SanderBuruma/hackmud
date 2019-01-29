function(context, args) // target:#s.halperyon.public
{
	if (!args) {
		return "This is a `5next gen` script used to scrape T1 npc corps for npc locs, target:#s.npc.loc or leave arguments empty to have the script pick a random corp\njr:true to get only _jr_ npc locs\nwlf:true to get only _XXwlf_ locs\nall:true to get all noncorrupt locations";
	}
	#db.i({script:context.this_script,args,context})
	//get starting date of script run used to measure its run time
	let startDate = +new Date();

	var caller = context.caller;
	var lib = #fs.scripts.lib();
	let keyVals = {}, temp, target;
	if (args.target)
	{
		target = args.target
	}
	else
	{
		let t1npcCorps = [];
		let c = 0;
		let r = lib.rand_int(0,10)
				 if(r==c++){target = {call:x=>#fs.amal_robo.public(x)}}
		else if(r==c++){target = {call:x=>#fs.aon.public(x)}}
		else if(r==c++){target = {call:x=>#fs.archaic.public(x)}}
		else if(r==c++){target = {call:x=>#fs.bluebun.public(x)}}
		else if(r==c++){target = {call:x=>#fs.bunnybat_hut.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.context.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.core.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.cyberdine.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.empty_nest.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.etceteraco.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.futuretech.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.goodfellow.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.halperyon.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.kill_9_1.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.kill_bio.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.legion_bible.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.legion_intl.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.light.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.lowell_extermination.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.marco_polo.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.merrymoor_pharma.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.nation_of_wales.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.nogrub.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.nuutec.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.pica.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.protein_prevention.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.ros13.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.ros_13_update_checker.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.setec_gas.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.skimmerite.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.sn_w.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.soylentbean.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.subject_object.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.suborbital_airlines.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.tandoori.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.the_holy_checksum.public(x)}}
		// else if(r==c++){target = {call:x=>#fs.turing_testing.public(x)}}
		else if(r==c++){target = {call:x=>#fs.tyrell.public(x)}}
		else if(r==c++){target = {call:x=>#fs.vacuum_rescue.public(x)}}
		else if(r==c++){target = {call:x=>#fs.weathernet.public(x)}}
		else if(r==c++){target = {call:x=>#fs.welsh_measles_info.public(x)}}
		else if(r==c++){target = {call:x=>#fs.weyland.public(x)}}
		else if(r==c++){target = {call:x=>#fs.world_pop.public(x)}}
	}

	//get the key and value info from the command input reply
	let commands = target.call({}).match(/[a-z_]+:"?[a-z_]+"?/gi)[0].match(/\w+/gi);

	//get the command values from the front page
	let pages = target.call().split(/\n/gi).pop().match(/[a-z_]+/gi);

	//get possible passwords
	keyVals = {};
	keyVals[commands[0]] = pages[1];
	temp = target.call(keyVals);
	let passwords = temp.match(/[a-z]+/gi)

	//get possible projects
	keyVals = {};
	keyVals[commands[0]] = pages[0];
	temp = target.call(keyVals);
	if (typeof temp == "object") {
		temp = temp.join('\n');
	}
	let projects = temp.match(/[a-z0-9]+[._][a-z0-9]+/gi);

	//loop through passwords till we have the right one
	keyVals = {};
	let password;
	keyVals[commands[0]] = commands[1];
	while (password = passwords.pop()){
		keyVals["p"] = password;
		keyVals["pass"] = password;
		keyVals["password"] = password;
		temp = target.call(keyVals);
		if (temp.match(/Authenticated/)){
			passwords = password;
			break;
		}
	}
	if (typeof passwords != "string") {
		return "couldn't find the password, please try again `a:(`"
	}

	//find project members
	let members = [];
	while(
		keyVals["project"] = projects.pop()
	){
		temp = target.call(keyVals);
		if (typeof temp == "object") {
			temp = temp.join('\n');
		}
		if (args.jr) {
			temp = temp.match(/.*_jr_.*/g);
		} else if (args.wlf) {
			temp = temp.match(/.*wlf_.*/g);
		} else if (args.all) {
			temp = temp.match(/^((?![¡¢Á¤Ã¦§¨©ª]).)*$/g);
		} else {
			temp = temp.match(/(aba?ndo?ne?d|anon(ymous)?|derelict|unidentified|un?known)_..[a-z_\d]+\.(pub_info|[a-z]+)*?_[a-z\d_]{6}/g);
		}
		if (temp) {
			for (let i of temp) {
				members.push(i);
			}
		}
	}


	return members.sort();
}