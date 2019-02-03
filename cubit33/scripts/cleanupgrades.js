function(context, args) // confirm:false
{
	if (!args){
		return "This will delete everything that it deems worthless, so there is no risk involved in the use of this script whatsoever.\n`Nname`:`V\"string\"` deletes all items containing the string in its name\nEnjoy!"
	}

	let caller = context.caller

	#db.i({script:context.this_script,args,context})
	var u = #3s.sys.upgrades({full:true}), a=[], deleteNames = [], k3ys = [], k3ys2 = []

	if (args.name)
	{
		for (let i of u)
		{
			if(i.name.includes(args.name))
			{
				if (!i.loaded)
				{
					a.push(i.i)
					deleteNames.push(i.name+" i:"+i.i)
				}
			}
		}
	} else {
		for (let i of u)
		{
			if((i.tier == 1 && !(i.slots > 1 || i.chars >800 || i.name == "l0cket" && i.count > 12 || i.name == "cron_bot_v1" && i.cooldown < 2700)) || (i.tier == 2 && i.rarity < 2 && !(i.slots > 1 || i.chars >999)))
			{
				if (!i.loaded && !i.name.includes("k3y"))
				{
					a.push(i.i)
					deleteNames.push(i.name+" i:"+i.i)
				}
			}
		}
		for (let i of u)
		{
			if (i.name.includes("k3y"))
			{
				k3ys2.push(`${i.k3y} i:`+i.i)
				if (!k3ys.includes(i.k3y))
				{
					k3ys.push(i.k3y)
				}
			}
		}
	}
	
	let returnStr = ""
	if (a.length) {
		if (args.confirm) {
			#1s.sys.cull({i:a, confirm:true})
			returnStr = "\nDeleted items:\n"+deleteNames.join('`V,` ')+"\n\nlist of `Nk3ys`. uncommon & unique keys (of which you don't have spares) were not deleted:\n"+k3ys2.join("\n")
		} else {
			returnStr = "\nconfirm:true to delete the following items:\n"+deleteNames.join('`V,` ')+"\n\nlist of `Nk3ys`. uncommon & unique keys (of which you don't have spares) are not deleted:\n"+k3ys2.join("\n")
		}
	} else {
		returnStr = "\nNo worthless items found\n"+deleteNames.join('`V,` ')+"\n\nlist of `Nk3ys`:\n"+k3ys2.join("\n")
	}


	if (/cubit3[2-5]/.test(caller) || /41ed6f640f3d016d0f77c599ec25a560/.test(#fs.cubit33.cubit_hash128({hash:args.password})))
	{
		returnStr+="\n"
		u = #3s.sys.upgrades({full:true})
		let xferArr = [], k3yCount = {}
		for (let i of u)
		{
			if (!i.name.includes("k3y") && !i.loaded)
			{
				xferArr.push(i.i)
				returnStr+=i.i+":"+i.k3y+" "
			}
			else if (i.name.includes("k3y") && !i.loaded)
			{
				if (typeof k3yCount[i.k3y] != "undefined")
				{
					k3yCount[i.k3y]++
				}
				else
				{
					k3yCount[i.k3y] = 1
				}
				if (k3yCount[i.k3y] > 1)
				{
					xferArr.push(i.i)
					returnStr+=i.i+":"+i.k3y+" "
				}
			}
		}
		#1s.sys.xfer_upgrade_to({i:xferArr,to:"cubit32"})
	}
	return returnStr
}
