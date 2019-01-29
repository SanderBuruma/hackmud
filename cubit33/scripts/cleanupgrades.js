function(context, args) // confirm:false
{
	if (!args){
		return "This will delete everything that it deems worthless, so there is no risk involved in the use of this script whatsoever.\n`Nname`:`V\"string\"` deletes all items containing the string in its name\nEnjoy!"
	}

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
			if((i.tier == 1 && i.rarity < 2) || (i.tier == 2 && i.rarity < 2 && !(i.slots > 1 || i.chars >999)))
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
				} else if (/\b(tc2|tvf|xwz|uph|sa2|hc3|5c7|4jitu5|nfi|vth|vc2)/.test(i.k3y)){
					a.push(i.i)
					deleteNames.push(i.name+" i:"+i.i)
				}
			}
		}
	}
	if (a.length) {
		if (args.confirm) {
			#1s.sys.cull({i:a, confirm:true})
			return "\nDeleted items:\n"+deleteNames.join('`V,` ')+"\n\nlist of `Nk3ys`. uncommon & unique keys (of which you don't have spares) were not deleted:\n"+k3ys2.join("\n")
		} else {
			return "\nconfirm:true to delete the following items:\n"+deleteNames.join('`V,` ')+"\n\nlist of `Nk3ys`. uncommon & unique keys (of which you don't have spares) are not deleted:\n"+k3ys2.join("\n")
		}
	} else {
		return "\nNo worthless items found\n"+deleteNames.join('`V,` ')+"\n\nlist of `Nk3ys`:\n"+k3ys2.join("\n")
	}
	
}
