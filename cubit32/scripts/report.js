function(context, args)
{

	//reports its access, transaction & upgrade log as well as balance and date to cubit32
	//cubit32 has a script to report on the status of its alt users on request of any of its alt users

  if (!args)
  { //insert report
    var caller = context.caller
    var l = #fs.scripts.lib()
    let accessLog = #ls.sys.access_log({count:1e3}).filter(x=>{return !/state reset.$/.test(x.msg)}).map(x=>
      {
        x = l.to_game_timestr(x.t) + " " + x.msg
        return x
      })
      let transactionLog = #hs.accts.transactions({count:1e3}).filter(x=>{return x.amount > 1e7-1})
      let upgradeLog = #hs.sys.upgrade_log({count:1e3})
      let balance = l.to_gc_str(#hs.accts.balance())
      let date = l.get_date_utcsecs()
      let upgrades = #hs.sys.upgrades({full:true})

      let report = {date,balance,upgrades,transactionLog,accessLog,upgradeLog}
      let dbresponse = #db.us({script:context.this_script,caller}, {$set:{report}})
      return {dbresponse,msg:"report inserted or updated"}
  }
  else if (typeof args.user == "string")
  {
    let report = #db.f({script:context.this_script,caller:args.user}).first()
    if (report) return report.date+" "+balance
  }
  else if (args.overview)
  {
    let reports = #db.f({script:context.this_script}).array().map(x=>
    {
      let string = ""
      for (let i in x)
      {
        string+=i+" "
      }
      return string+"\n"
    })
    return reports
  }
  else
  {
    return "invalid input"
  }
}
