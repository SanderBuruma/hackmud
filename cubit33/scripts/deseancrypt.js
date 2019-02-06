function(context, args) // key:"iG1AmNA",str:"encryptedstring"
{
	let base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	let regexIllegal = /[ÀºÍª¨õÚßúÊ¶çì¹Ù½ÄÞÂÓã¡äæáÒ»­¿ÇÌóø¤©£þïÝàÛù¢¸âåÅðË§¯Ôè³òü¥Ü²ë÷×ÿÁÃ·û¬ÕÏØýÑñé®µÐîêö°Öí¾Æ´«Î¼ô]/g

	let key = args.key
		.split("")
		.map(x=>base64.indexOf(x))
	let returnArray = [], discardArr = []
	let keyVariations = 
	["0", //only the first char of the key
	"0246135", // skipNKey, shift:1 addmode:true, skips every 2nd
	"0123456601234556012344560123345601223456011234560", //rotateKey shift:1, repeats every 6th keychar
	"0123456123456023456013456012456012356012346012345", //skips every 8th
	"01234456011234556012234566012334560", //repeats every 5th
	"012456123560234601345", //skips every 7th
	"012234456601123345560", //repeats every 2nd
	"01234601235601245601345602345612345"] //skipNKey, shift:1, skips every 6th

	for (let i of keyVariations)
	{
		let count = -1,
		string2 = [],
		string = args.str.split("")
			.map(x=>base64.indexOf(x))
			.map(x=>
			{
				string2.push((x-key[i[++count%i.length]]+base64.length)%base64.length)
				return 			(x+key[i[count%i.length]])%base64.length
			})
			.map(x=>base64[x])
			.join("")
		
		string2 = string2
			.map(x=>base64[x])
			.join("")

		// return {string,string2,count}
		discardArr.push("decode")
		testString(string,i)
		discardArr.push("encode")
		testString(string2,i)
		if (returnArray.length>0) break
	}

	let decode
	if (discardArr.join("").includes("decodeencode")) decode=true 
	else 																							decode=false
	let ms = Date.now()-_START
	// #D({discardArr})
	let count = 0
	discardArr = discardArr.map(x=>count++ +" "+ x)
	// return discardArr
	return {decode,ms,returnArray,discardArr}

	function testString (s,i)
	{
		if ((s.match(/\+/g)||[]).length/s.length > .10) returnArray.push({s,i,t:"plain"}) // plain text
		else if (/\/{6,}/.test(s)) returnArray.push({s,i,t:"jpeg||png"}) // jpeg or png file
		else
		{
			s = decrypt64(s)
			let illegalCount = 	(s.match(regexIllegal)||[]).length
			let otherCount = 		(s.match(/[^\w\d-+_/?\[\](){}|\\<>]/g)||[]).length
			// #D({illegalCount,otherCount,len:s.length,s})
			if (/invitees/.test(s)) returnArray.push({s,i,otherCount,illegalCount,len:s.length,t:"b64"}) //base64 converted
			else if (/\/{6,}/.test(s)) returnArray.push({s,i,t:"b64:jpeg||png"})
			else discardArr.push(s)
		}
	}

	function decrypt64(s)
	{ //i don't take credit for this, this is not cubit32's code
		var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
		var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		for(i=0;i<64;i++){e[A.charAt(i)]=i;}
		for(x=0;x<L;x++){
			c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
			while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
		}
		return r;
	}
}
