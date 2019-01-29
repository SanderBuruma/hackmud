function(context, args)
{
	//Need to know the total earned on transactions without memos between 190121.1040 and 190121.1132
	if (!args) {
		return "acct_nt helper, str:<the string with the between timestamps, eg \"190121.1422 and 190221.1452\"\ndebug:true to get debug information>"
	}
	if (!args.str) {
		return "include str:<the string with the between timestamps, eg \"190121.1422 and 190221.1452\">"
	}

	var l = #fs.scripts.lib();

	let trn = #hs.accts.transactions({count:50}),
	str = args.str.match(/[\d.]+/g),
	deletes = [],
	debug = [],
	sumGC = 0;
	let startTime = timeStr2Nr(str[0]);
	let endTime = timeStr2Nr(str[1]);

	for (let i in trn) {
		trn[i].timeint = timeStr2Nr(l.to_game_timestr(trn[i].time))
	}

	//delete irrelevant transactions
	for (let i of trn) {
		if (i.recipient != context.caller || !!i.memo) {
			deletes.push(i);
		}
	}
	delTrns();

	//delete transactions outide of the time window
	for (let i of trn) {
		if (i.timeint > endTime || i.timeint < startTime){
			deletes.push(i);
		} else {
			sumGC+=i.amount;
		}
	}
	delTrns();
	
	if (!args.debug) {
		debug = false;
	}
	return {trn:trn, debug:debug, sta:startTime, end:endTime, msg:"success...?", sumGC:sumGC};

	function delTrns() {
		let delme;
		while (delme = deletes.pop()){
			trn.splice(trn.indexOf(delme),1);
			debug.push(delme);
		}
	}
	function timeStr2Nr (nr) {
		return parseInt(nr.replace(/\D+/g,''))
	}
}