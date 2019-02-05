function (context, args) {
var s = args.s
var offset = 0
var lookup = {}
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
var regex = /^[^=]*(?:==?)?$/
for(var i = 0; i<alphabet.length; i++) {
	lookup[alphabet[i]] = i
}
var out = []
for(var offset = 0; offset<alphabet.length; offset++) {
	var o = ""
	for(var i = 0; i<s.length; i++) {
		o = o + alphabet[(lookup[s[i]]+offset)%alphabet.length]
	} if(regex.test(o))
		out.push(o)
} var rlookup = {}
var i = 0
alphabet.replace(/./g, a=>rlookup[a]=i++%64)
var mask = 255
function decode(str) {
	var o = ""
	var c = 0
	for(var i = 0; i<str.length; i++) {
		c = (c << 6) + rlookup[str[i]]
		if((i+1)%4==0) {
			for(var _=2;_>=0;_--) {
				var n = (c >>> 8*_) & mask
				if(n)
				//if(n<128)
					o += String.fromCharCode(n)
				else if(n!=0)
					return false
			}
			c = 0
		}
	}
	return o
}
var out2 = []
for(var v of out) {
	var d = decode(v)
	d && out2.push(d)
}
return out2
}