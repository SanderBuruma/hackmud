function(context, args) // target:#s.halperyon.public regex:"_jr_"
{
	if (!args) {
		return 'Please provide a `Ntarget` argument.\nOptional: `Nregex` argument, to filter the results with regex.'
	}
	let project_phrases = [
		/^(\S+) announces beta testing/g,
		/Work continues on (\S+), hope/g,
		/new developments on (\S+) progress/g,
		/critical review of (\S+), the/g,
		/project (\S+) has come clean/g,
		/release date for (\S+)\./g,
		/fake backstarters for (\S+) since/g,
		/of project (\S+) has come clean/g,
		/Look for (\S+) in your/g,
	]

	let temp, target

	if (args.target)
	{
		target = args.target
	}
	else {
		return "Please provide a target"
	}

	let now = Date.now();

	// Get the key and value info from the command input reply
	let command = #fs.cubit33.decorruptor({target,args:{}}).split(/access directory with /g)[1].split(':')[0]
	let member_command = #fs.cubit33.decorruptor({target,args:{}}).split(/access directory with .*?:"/g)[1].split('"')[0]
	
	// Get the news and strategy page values from the front page
	let main_page = #fs.cubit33.decorruptor({target}).split(/\n/g)
	let news_page = main_page[main_page.length-1].split(/\n/g)[0].split(/ /g)	
	news_page = main_page[main_page.length-1].split(/ ?\| ?/g)[0]
	let strategy_page = main_page[main_page.length-1].split(/ ?\| ?/g)[1].split(/ /g)[0]

	// Get password
	let keyVals = {}
	keyVals[command] = strategy_page
	temp = #fs.cubit33.decorruptor({target,args:keyVals})
	let password = temp.split('this strategy ')[1].split(' and')[0]

	// Get the news page projects
	keyVals[command] = news_page
	temp = #fs.cubit33.decorruptor({target,args:keyVals})
	if (typeof temp == "object") {
		temp = temp.join('\n');
	}
	let projects = []
	for (let project_phrase of project_phrases) {
		let match
		while (match = project_phrase.exec(temp)) {
			projects.push(match[1])
		}
	}

	// Prepare to get the project members
	keyVals[command] = member_command
	keyVals["p"] = password;
	keyVals["pass"] = password;
	keyVals["password"] = password;

	keyVals = Object.getOwnPropertyNames(keyVals).reduce((acc, key) => acc['key'] = keyVals[key],{})

	// Find project members
	let members = [];
	while(keyVals["project"] = projects.pop())
	{
		// Timeout check
		let x = Date.now() - now < 4000
		if (!x) {
			break;
		}

		temp = #fs.cubit33.decorruptor({target,args:keyVals})
		if (typeof temp == "object") {
			temp = temp.join('\n');
		}
		let list = temp.split('\n');
		for (let i of list) {
			if (i.includes('<') || i.includes(' ')) {
				continue;
			}

			let lv = #fs.scripts.get_level({name:i})
			if (typeof(lv) != "number") continue
			if (lv < 4) continue
			members.push(i);
		}
	}

	if (args.regex) {
		let regexp = RegExp(args.regex)
		return members.filter(x=>regexp.test(x))
	}
	return members.filter(x=>x).sort();
}