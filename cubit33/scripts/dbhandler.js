function(C,A){
   
  //from ♪Leming☼#1700 on discord
  let pw = "password"
  , { p } = A = (A) ? A : {}
  , v = (
  ( _=>( C.caller=="admin_name" ) ? 2 :
   ( ( p===pw ) ? 1 : 0  )    
  )()
  )
 , stf = T=>JSON.stringify(T)

// --- //M//A//I//N --- //M//A//I//N// --- //M//A//I//N// --- //M//A//I//N// ---
 function main ({c='?', q, a ,u}={}){
  let X
     switch (c){
      default:
       return "{ c : \"dbf\"\n,( q:null )\n,(a:1) OR (u:{})\n }\n\ndbf : Find your (q)uery , show (a)ll matching results\ndbi : Insert a new (q)uery into the DB\ndbr : Remove \`D!all!\` results matching \ndbus : UP-sert (If none to be updated found, insert new entry)\ndbu : Update \`D!all!\` query results with the change\ndbu1 : -||- \`D!one!\` query result with the change`"
      case "dbf"://Find
       a = ( q==undefined || a ) ? "array" : "first" // IF (query is FALSE  |OR| all is TRUE) return Array ELSE return First
       X = #db.f(q)[a]()//Perform Search
      break
      case "dbi" : //Insert
       Object.assign(q, {
          info : {
             v ,
             creator : C.caller ,
             script : C.calling_script ,
             timestamp : Date.now()
          }
         })
         X = {    in : #db.i( q ) ,    out : #db.f(q).first() }
      break
      case "dbus"://UP-sert (If none to be updated found, insert new entry)
       X = #db.us(q,u);break
      case "dbu" ://Update ALL
       X = #db.u(q,u);break
      case "dbu1" ://Update ONE entry
       X = #db.u1(q,u);break
      case "dbr" : // !!!REMOVE!!!
          if ( stf(q)==stf({})&&A.ok===pw ) X = #db.r({})
        else if ( stf(q)==stf({}) ) X = "This will delete the whole database! Are you sure?"//Sanity Check
         else X = #db.r(q)
     }
  return { c, q, u, a, X }
 }   
//---------------------------------------------\\M\\A\\I\\N\\
 return main(A)
}