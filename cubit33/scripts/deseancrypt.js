function(context, args) // key:"iG1AmNA",string:"encryptedstring"
{

	let base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

	let string
	let key = args.key
	key = key.split("")
		.map(x=>base64.indexOf(x))
	let returnString = ""
	let keyVariations = 
	["0",
	"0246135",
	"0123456601234556012344560123345601223456011234560",
	"0123456123456023456013456012456012356012346012345",
	"01234456011234556012234566012334560",
	"012456123560234601345",
	"012234456601123345560",
	"01234601235601245601345602345612345"]

	for (let i of keyVariations)
	{
		let count = i
		string = args.string.split("")
			.map(x=>base64.indexOf(x))
			.map(x=>(x+i[count++%i.length])%base64.length)
			.map(x=>base64[x])
			.join("")

			returnString += decrypt64(string)+"\n\n"
	}

	return returnString

	function decrypt64(s){
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
