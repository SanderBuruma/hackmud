function(context,args) 
{
    let s = args.s, d = args.d

    return (s.match(new RegExp(`(${d})`, "g")) || []).length
}