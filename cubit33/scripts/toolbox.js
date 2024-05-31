function(context, args) //t:#s.context.internal
{
    //{"man":"t2_corps:true = list currently available t2 corps\nt2_scrape:#s.t2.corp = scrape t2 corp for npc locations\nk3y:\"vc2c7q\" to load the vc2c7q k3y in your inventory if available\nk3ys:true = list all k3ys in your inventory\n\n(optional) regex:\"_jr\" filters out any lines from the return message not matching the regex","corps":"amal_robo,aon,archaic,bluebun,context,core,cyberdine,empty_nest,futuretech,goodfellow,halperyon,kill_9_1,kill_bio,legion_bible,legion_intl,light,lowell_extermination,marco_polo,merrymoor_pharma,nation_of_wales,nogrub,nuutec,pica,protein_prevention,ros13,ros_13_update_checker,setec_gas,skimmerite,sn_w,soylentbean,subject_object,suborbital_airlines,tandoori,the_holy_checksum,turing_testing,tyrell,vacuum_rescue,weathernet,welsh_measles_info,weyland,world_pop","suffixes":"memb3rs_only,members_only,members,member_access,internal","usernames":"_123lt_jack,_3rd_3y3_grill,ad4m4,aeryn_s,amelie,arr_too_d_to,b3nd3r,b4cca,b4rry_vv,b_sisko,bassy_thecount,be_lavar,bella_swan,boba_the_hutt,bobranator,boris,brohda_99,bus_and_parks,c_vader,catness,chad_bose,cheechfiend91,childishg4mb,cking,computer_blue,corg_train,corgitruthsayer,crichton_j,curtfields0fmay,d4ft,d4ria,d_bowman,d_jackson,daa_freak,daurmith,derek_zoo,diamond_dogz,do_u_need_hal,doc_brown,du_boyz,duke_ell,firebreathingdragon,foxy_guy,frantimike,free_man_morg,geyser_soze,ginnypig,gwashc,h_jimi,hand_solo,hermione,htubman,huey_n,ice_ventura,indie_jones,inigo,jack_sparrow,jamesb,janeway,jermaine,jim_c_kirk,journer_of_truth,juno_macguff,killa_kara,king_luther,lass_doug,leia_it_ontheline,leon,lion_eyes,lt_col_j_shepp,luke_5kywalker,m_ali,m_c_fly,m_clarke_dunk,m_poppins,madthugpug,marc_garv,med_evarz,mjay_m_walker,muld0r,neoone,oz,pick4rluc,poitier_27,pugluv4vr,purple1,q_bey,r0bertm4rley,renaldos_malc,revolution808,ripley_or_not,rob_rob_taylor,robo_deckard,rocky_b,runningman23,sam_cart,sammy_l_jack,scook,seven_out_of_9,shareef_j,shawn_aa,sidney_prescott,sp0ck_08,sportsfan2031,tam_riv,tchalla,terrance_cruz,thadd_0s,thedude,theformalartist,thegreat,thegreatvandross,thepowerful,theshrillery,troy_cole,turn_a_nat,turner_t,uhur4,wc_handy,whois_hermano,wiley_curry,will_de_vaughn,wonderous_steve,x_mal,youngtwokay,zap_dweezil,zap_franscisco,zap_moon,zoe_wash"}
    let quine = JSON.parse(#fs.scripts.quine().split('\n')[2].substring(6))
    let _start = Date.now()
    let msg = ''
	#db.i({script:context.this_script,args,context,date:Date.now()})
    // Select the code block to run
    if (!args) {
        msg += quine.man
    } else if (args.t2_corps) {
        let corps = quine.corps.split(',')
        let suffixes = quine.suffixes.split(',')
        let arr = []
        for (let corp of corps) {
            for (let suffix of suffixes) {
                let name = corp + '.' + suffix
                let rsp = #fs.scripts.get_level({ name })
                if (typeof rsp == 'number') {
                    arr.push(rsp + ' ' + name)
                }
            }
            if (tmo()) {
                arr.push('  Timeout after: ' + corp)
                break
            }
        }
        msg += arr.join('\n')
    } else if (args.t2_scrape) {
        let target = args.t2_scrape
        let usernames = quine.usernames.split(',')

        // Get existing users
        let qru = []
        for (let user of usernames) {
            let rsp = target.call({ username: user })
            if (/(settings|orders|faq|cust_service)/.test(rsp) && !/not exist/.test(rsp)) {
                qru.push(user)
            }
        }

        // Get qrs
        let q
        for (let u of qru) {
            q = 'order_qrs'
            dt('username:"'+u+'"')
            let a = {username:u, user: u, u:u, action:q, entry:q, navigation:q, nav:q, get:q, command:q, see:q, process:q}
            let test = target.call(a)
            if (!/▀/.test(test)) continue
            let rsp = #fs.dtr.qr({t:target,a})
            if (rsp.length == 0) continue
            let oids = rsp.map(x=>x.id)
            q = 'cust_service'
            for (let o of oids) {
                dt('order_id:"'+o+'"')
                let a = {order_id: o, username:u, user: u, u:u, action:q, entry:q, navigation:q, nav:q, get:q, command:q, see:q, process:q}
                let rsp2 = #fs.cubit33.decorruptor({target:target,args:a})
                try {
                    rsp2 = rsp2.split('\n')[1].split(': ')[1].split(' ')
                } catch (e) {
                    return {rsp2, a, target, oids, msg, tprsp: typeof(rsp), rsp, e:e.toString()}
                }
                for (let e of rsp2){
                    if (/</.test(e)) continue
                    let lv = #fs.scripts.get_level({name:e}) 
                    if (typeof(lv) != 'number') continue
                    msg += `\`${lv}` + lv + '` ' + e + '\n'
                    if (tmo()) break
                };
                if (tmo()) break
            }
            if (tmo()) break
        }
    } else if (args.k3ys) {
        let k3ys = #hs.sys.upgrades().filter(x=>/k3y/.test(x.name)).map(x=>#hs.sys.upgrades({i:x.i}))

        for (let k of k3ys) {
            msg += k.i + ' ' + k.k3y + '\n'
        }
    } else if (args.k3y) {
        let k3ys = #hs.sys.upgrades().filter(x=>/k3y/.test(x.name)).map(x=>#hs.sys.upgrades({i:x.i})).filter(k=>k.k3y==args.k3y)
        if (k3ys.length > 0 && !k3ys[0].loaded) {
            #ms.sys.manage({load:k3ys[0].i})
            msg += `${k3ys[0].i}:"${k3ys[0].k3y}" loaded`
        }
    } else {
        return {ok:false, msg: quine.man}
    }

    // Filter output by regex
    if (args && args.regex) {
        msg = msg.split('\n').filter(x=>new RegExp(args.regex).test(x)).sort().join('\n')
    }
    // Reduce output if necessary
    if (msg.length > 20000) {
        msg = msg.substring(0, 19999)
    }
    if (msg.split('\n').length > 999) {
        return msg.split('\n').slice(0, 999).join('\n')
    } 
    return msg
    function tmo() {
        return Date.now() - _start > 3600
    }
    function dt(m = '') 
    {
        msg += (Date.now() - _start) + ' ' + m + '\n'
    }
}
