function(context, args)
{
	var caller = context.caller
	var l = #fs.scripts.lib()

	#fs.chats.send({channel:"0000",msg:"\ncubit33.scraper_t1 to unlock npcs. leave argument empty to get random t1 npc locations or fill in a t1 npc corp to get specific npcs. (may need to be run a few things in a row to get results)\n/s1 = cubit33.scraper_t1{{target:#s.{0}}}\n\ncubit33's unlocker is awesome, I've successfully unlocked 150 T2 npcs with them! Guaranteed to unlock T1 npcs!\n/u2 = cubit33.unlock_t2{{target:#s.{0},report:true,xfer:\"youralternateuserhere\"}}\n\ncubit33.cleanupgrades is awesome, it automatically cleans out all the junk and leaves all the good stuff!\n/cu = cubit33.cleanupgrades{confirm:true}"})
}
