### /cubit3[2-5]/g's hackmud repository

This is my online stratchpad and respository for sharing of hackmud scripts and information

### scripts

you make a script named bot_brain on that user
it can be private
feed user with some money
load cron bot
and dont touch this user
I mean, dont run scripts on it, dont log into it etc
or cron will skip its action
then every <cooldown> seconds cron will eat <cost>GC and run bot_brain script

### scratchpad

utility users, ls.users on these to find out what scripts they offer
matr1x
beta
dtr
lore
skriipts
preen
googl.search

### locks

# T1

EZ_21: open,release,unlock
EZ_35: open,release,unlock
  digit: 0-9
EZ_40: open,release,unlock
  ez_prime: prime < 100
c001: <color> (red, orange, yellow, green, blue, purple, cyan, lime)
  color_digit: <length of color>
c002: <color>
  c002_complement: <color>
c003: <color>
  c003_triad_1: <color>
  c003_triad_2: <color>
DATA_CHECK: <trivia>
l0cket: asks for a k3y value

# T2

(l0ckbox|magnara|CON_SPEC|acct_nt|glock)

acct_nt:
  1. Need to know the total spent on transactions without memos between 
  2. Need to know the total earned on transactions without memos between
  3. What was the net GC between
  4. Get me the amount of a large deposit near

Get me the amount of a large deposit near 190123.2142

CON_SPEC: tests you based on our class
  weaver: next three letters in the alphabetical sequence
  Possibilities:
  1.  ±1
  2.  ±2
  3.  ±1±3±1
con spec scriptor request: (for now) #s.matr1x.cs

sn_w_glock: your acc balance must be this amount
  ??????        3006,38,443 1963 77? 7007?
  secret        7?  NOT 3006 38 443 1963 77 7007
  special       38
  elite         1337
  hunter        3006
  monolithic    2001
  secure        443
  beast         666
  magician      1089
  meaning       42
  Not a monolithic balance.

l0ckbox: To unlock, please load the appropriate k3y: 
t1 keys: tc2, tvf, xwz, uph, sa2, 72u, cmp, i87, eoq, 6hh, 9p6, fr8, pmv, xwz, ell, xfn, sa2, 72u, uph, cmp, sa2, 6hh, xwz, eoq, y11 (from common to rare)
t2 keys: hc3, 5c7, 4ji, nfi, vth, lq0, voo, nyi, 4ji, j1a, nyi, lq0, d9j, j1a, vth, vzd, cy7, d9j, voo, cy7, vzd, 8iz

magnara:
this is an anagram lock, the opening message is incorrect anagram solution for: <anagram>

user script to use: ast.magnara_solver dictionary.lookup

# npc

difficulty
_jr_ < jr < dd < wb < pr < ls

dd doubledeck

wlf wolf
wvr weaver
rvn raven
stg stag
ttl turtle


# T1 corps

amal_robo.public,aon.public,archaic.public,bluebun.public,bunnybat_hut.public,context.public,core.public,cyberdine.public,empty_nest.public,etceteraco.public,futuretech.public,goodfellow.public,halperyon.public,kill_9_1.public,kill_bio.public,legion_bible.public,legion_intl.public,light.public,lowell_extermination.public,marco_polo.public,merrymoor_pharma.public,nation_of_wales.public,nogrub.public,nuutec.public,pica.public,protein_prevention.public,ros13.public,ros_13_update_checker.public,setec_gas.public,skimmerite.public,sn_w.public,soylentbean.public,subject_object.public,suborbital_airlines.public,tandoori.public,the_holy_checksum.public,turing_testing.public,tyrell.public,vacuum_rescue.public,weathernet.public,welsh_measles_info.public,weyland.public,world_pop.public

# corps general

.public is the T1 area highsec area

T2 areas:
.members_only
.members
.members_access
.memberlogin


#db

return #db.something
  1.  ok: success or not
  2.  n: number of elements matching query
  3.  nModified: number of elements modified

#regexes

1.  generates plain npc locs from the autocomplete string in the "settings" file
,\\"(\w+)\S+?(\w+).+?(?=,)
$1.$2\n

2.  matches all npc locations and allows you to replace with nothing, removing them from autocomplete selectively
,..(aba?ndo?ne?d|derelict|un?known|anonymous|anon|unidentified)_\w{2,5}_\w{6}.{6}\w+\S{8}

3.  matches every line WITHOUT ddttl in it
^(?!.*ddttl).*\n

4.  tag stripping regex
<[^>]+>

# new_user initialization
1.  create_user
2.  copy macros
3.  trust.sentience{f1rST:"H41f",S3c0nd:"h@/_F"}
4.  update cubit32.xfer to accept new user
5.  /xfer 1e6
6.  sys.init{confirm:true}