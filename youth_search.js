const $ = new Env("中青看点搜索赚");
const notify = $.isNode() ? require('./sendNotify') : '';
message = ""

let zqsszbody= $.isNode() ? (process.env.zqsszbody ? process.env.zqsszbody : "") : ($.getdata('zqsszbody') ? $.getdata('zqsszbody') : "")
let zqsszbodyArr = ['p=ZCWwRj3eGxCw%3DOY4T2_YuUnfMV_DVMms3dy-7E68zUruwOuq80MZh2z7wzxaSQTdW366z3bx-AmivWumxRqrXHwUhepGqiQ90enrq5GTDQ-cZc-ydO8PFsB6JJFwaoe2kzchrIk9Dz81omN_eInkmGjsQ69WBFvRgHmjig40Yi8AePhGdXGJWwG7rZ_OGBYzPUs1oUQrvcx9jDIzUY6ZjwsqFWFsSaQ8uGlsoAVx2Mle8Qon5aAwLovGLGfzgCDXmt1VW6IQo4pPzeCRTayGXwXv_4e7VogiGgVm7VZhHYz2XUBqBdg432fFgiqHSI7z80SbwiOTfVF6_AhT3uAdvNlPvemq_--kYVO5MqpwCEAKxMltQiXKgi0o2eZhOp8yAT6XrJCeNkRaIXek7k1HpU28lgTxDGgAJC3znvyA6OFaNL1MNgZfSC3TYi5B1cLm7hDzm7sWeZ_huhiniYqhT5kRoXIJtiLTgGrQQZhwnj_ABt0nVXuLs6NmXUIZBzOaLCwvqbWB4adX7b8_49pre27MX2HmZHXWEkCQMhrvP5uGv3qc9DzoYb240O1dVWiIdjGWJJutn_QB4k0XtZkvfRBNuAXCfZ9WtwslbwdUglgeCeTluIeWQwJaLn0Rjj-TzxTag-eCWAfm-qqYtTHJNkrDUZ-pbBl25zl4xXt3UCZ0NPCYl-9h6MNeBineA5qtPbbYa9enBDPPp0cw-o515SIBaSQn1-gROmzFjurCVNfoKYKGZG9AUjyGuD4mCuKaCBL_e9rILR-Yh7_EcO_dqfhd6BZ0sb09g3nwXLqCMa5bLL630TAaZ_ryrBI6XZnujxCdTmZbtrh7nobuuLy8BokqWOZi_rrkjXUrVey4RlYn65ePtl-8gj_obGN94OhGFdvEIxtkuu_oKd-kvd44472h6MRG40qEs4Q-rm7PXzB_vMrXb0V-BtuOeZwlqbLYYFF5pxucYjPXzmCF_MnRAr0ebFeeGxlWR2euOEEmcetqdweEZmamMI1NkMwO7CU1RHgZBUuth5ELyeoABQNEd0AckXxuVj9FUCxfPrLPQS3Xu1Rbut0jxRWnW3hnpdfdU_EQ1633lHX5JIQfTZfKt6kYN5QeFlPmvw4_IdXdK5tcGQFeV7Ht7A7SetAZIcygAPv8LIjom9SusXSBbm9BfL_0xndTrakbjPzRsjI333JXNV-osSwMl1PJ8UX2ir-px0vOnSGCuHSGdctjRQbf8-pyCsRXORJXNOFMCybKqT2KI2lgFLzf2javLIuE755HTN-PlZtzY6XySdKxnQYylbuf7dQ4iURNjoubGAMmNQOzmXKuF88EWWY0-NPx_e9YM-bF3D3Q42XAfd2iHDLGl85SwOA-NaR-QywkoNpHBMT6TypRw_1bhpjDoWP69BYsPOz7a0vAnsHmK1ZjC6QRH8WjjlCq6wLKc3K5RDK2stTO31b7q7IESFgDQcWlx2CCO23beNPEsRtGOfUFr7m5BsLf81yFq998b0nWP2-d0Da3Q','p=HUJybc31G2V0%3DUiVImOW0NxgHxY6TZ0me3WBplEX2kK6ARh3Wcs5Z6YN8CyEl_D54EwT96bYbNNifVtpS46KLLlSe5a7xVdmvSUBy4N1FDy98RripVSQqB9R3_7ohhzJTrDgY1auKD0jhEGKL1MN9tqHyslJQDTsnUScKCJiFWABUQO_u2ZulG7qPHeazxv5tLLb5ojQqYQu0ACjPat290fv1VQOijZlnSaDS0Fu7tOGsiqikshXhF7nM4c_KHl6iwsoROOyFsrc5Alk6sZBN7POIY_MvQHOxF90fWMJk4ntSsuBNlZuRUnAIpqeHKy2AtmWKbFG8imPEd3CoDM046CkUy9hUY9SxZzQ-Y62C3hCvPN-SojPg41DAEB4yah71v9qXjUzAPCrWJ0hbI6a1RTo7Zos9p233eHrBvT1Sw9V1EoPXt0aYEWLKYMklvjVjUs-RZ8HuFRxVpmlmkNF2cEUY8m2q-Eh52jyesgJhO7kBWUiPexUw-P14EuDHnElMjC30Vlrp1v82TR7CBDsZkVzJo9uoBjgT36r7VkXE9RzxHl1JfZRgAIb925JLgmiMmVYYxMJixDIYkAgO57yJRUtcCYwJUhdh_VIQ96tmsX4iqksU6KSu_KFxx3WYE9VbLVdr1ezWX-kFLEgdaTijq-bmHyyF_c8eJevsMMgXKm79PTQtKVlyE1OCWaMSkcCkR70DTuDzneGySYyaCtVAFlHl5YG5dRQdFG6AVAWsKB227HUdtPC6y1ZnrHSy3gMa5bD1-I-yrtE1EkysaWiH2dCxay3gxzLStQPrYtW1u6frD5XqUOxzpJ8lFe8A2fLEnY2CHpnbyQRegRdKhZkocE5yWggEBBTn8fbGvXHxv-VAf68VLWq5nDsCdCHWF4BK_BM7Ca6sy_ZvpeBqD3k6b0KS6GW_cIxeN5YhMFC2Gg9kAW2bqNDLUXi8LkKLs-z4OE64MHw58gZiW-y6blolF2uzO78mhfOkowdmzH-dnyAnAQ-B0a-B0PFslMsTKUoh_C31RdH7xF2d4fYsEglU3D00eoTeh_PcKD986hUNnxkt01qiCkZ90MC-wE6WID7FfETvpA4l4ECVJqvPSEL2fwTDlBVZw9eJ-uGSdaoYXWhPCSLY0wKe36GcgxYUtdzDvOlDkunt0bVrVyGEJcwwz_e0BICmUHMlDtI7JgJPjiDwxlm10DFbHXmXK9-W-oUycvIm8qCYNFzbzk0dhP08ZUuI9HTK1yZ4UVAHITN2P2xctIrWC2THdxs3qJxy_a5BVpjLayvaiypvBdZjAGqLSLKxAAGUsAbxJjwvy6AXaYywsCW2ms3MMLcEH-2V9TSd5idLbeJUAdvw5k0kuEGHS95h8ncbSItsAg88OBeFE9kJSLW65ekCkCmh4JKzh6quQk_WhT1Zosiy-wMFUdjx-kwCADjkQfo4Xx64l-cak4dikuonIgm7zGCh6asoxbey-eqYLZmBlfa6yjxXeNxX1dLVmbufNNKPC6aCg9fM9fnSmO','p=w2JgR8oZr6IU%3D3jJeRBx8_TqMKODKaSpA_eqZR1q9bNtsssU1yfodc1eDKseMMzXDNymoLyKjDQLg0KufwDiHw4rwbK3sgaFSX2N_ZwNDuDLkUVud44MhnmlRZWtnU8KwEkwBYd69IdHDsF99VtxZKpVcmCwk3WtAfUL_WutJ-O_z7jFByF0v2YXBwLbUxcAKmPtAaCmuR5eH51hd2_mq3aOmi7TcbsPTkmJZV3uT6xDKp-rgKSifA3DD8mNoAuzyY42SQTujDSS9ZGNnZJz2wCtt8gtgEGUdomAvBMWtYHgyUWbKOltZLVJrKR_5HsHZ2BB0e_FCU2RmW-UI4TCCuhiimJ_xnQ2yx8mFBlBH1LNMq7SHRLoAvBZS5yssRUCYhCd76wlI_V5MU6qz2uqzribAnhaf13MlqzNhmznLrjnuYjnHgwyro84-kP0fMnUw9RyAdd0ovXh-ei4voB6yv0eNT93BNBO_fuO2d-aqEpsI2UOPFnronoSk-tjSo-6HfG8_KLgJ5bIGgx4E5rRb3R6k4s0CTRfL7n2JiksULl2yRhWzgUCc41OnOAkoM0tOQ8TWO0HrO8r-gWWGL8_UPx1pCR-kv6vqrLD1RE3-uIAJYZkxwxKmnOiRCFti8ueKTrPejHhPfxEO9c3VfwEdULcsTmgSrrcooAR4T-7KmSjpgBLYRHkY9xTBcjsuug2jTT0IkO2upKSJxACtiqLzzyr-kQrdZdOXJQ0Wvcd29xqg8PVsoYOxnfQ9kMXS80V0QdB6IJ_oJhUPADz8GSOqTiIm_4Pfie_uT3HEP-C-zivIUwbfc9yts526zMU-thWpnpkolUTL1mH7k3x8CP8-xi5hLBfXMPmXek-QnZ5yt_1gZWpuxOSGTl3e9x9zDCgrSfPgg8tWr3O-vR1mPwYd4jAhhg4US2qBQTCtB5h7bTgBf54lxy6brkr4NLKyyDIZyk8LL-zgt2hvgxcN6WlsasSbzrkMK-3600zzSehwajC7x7PvACQFE57rrA8ZkNPiuutrRlPlXcg4mMB69yzF8SUkMrD-kODTl25h9rjphtD4ya3nrC9CJuBW8TxqEQDWRvSZ6MjJqsW53IdyIMl6GNc4WMO86DQGsoiELgeBbmwlmOAmDvrsaGP60i2Ad7OUJonMF5DC9ATNkQjZMhu0E2L1bBKLkTgSsdvOlzdfvvwCGPln23acwXBgyNUfdXGtkcGOIrZ6HGkatt7RsYfrTn_sCaZNEOlM9xPsjlU15coqFwY9Y1GH-jKrYXXFPuv3MSI5z5FF37PAHXtLFm1pdHduCiogoe9yk7dqb9RcCK2UmgQXxpK2EdT5Vciix37MOugOJwupak591WobzOG1F2apdvaF9I1ajKlP-PBNvRWzV-keKy5OR0fULojqcSDKLRSDrHFphlCtFMXHyVOCl8WSxXTQ2krEw2n9PoDr_MdRmZwx5QIKV_TSgL-P7eGNw25ZDVy3u4L8x3QMjCAU74LRv0InT_bGB4rbmFF00dRO&p=12JgR8oZr6IU%3DBty5sXh9aR9qYRLTZOTU178MyLkRYeBiZOP65oO7v9d3X1XkWsbHYXRX5qSJzmRF9aipuP6sYogn35nPUxkYiyD7bcwa0pY9Epm5VqD5bBkgUuG6gh4eN6pfDb03xCqhc8cKQAZyVinqWxxy4AAB6bXOR7mk8rOCOE9_AJDuHZVIKX679r-mItgEmvKC7mMk6DTBRrYY-dvegDafbg6yk_Q45cahfl51GnnsoSRlPT52ZJTQbvvyBG5CIwExe8K6amFSO5awU_Rg2qS74gTh5vpcDAj3belSbm-MFx_PKvQc3wyhWWrog-0hfFlSEROelhqjlfNo-OFetKLQ2NbBXs0rEOcD80DXOEcYIKBkBjS3agMBlDrsZfpS-TT8e_1lC4RYwXCCJUEuQgJjfbQqONd2lS6Bln5VmnoFvWZIDmm2vmnJI1MwFMFjH8Hvp_9IOUcLeCCvJGN4jLoUoAhos55FNPxJczy5kfTyt6QPvG5PK5PTbNbyX3HFVz6ElCKVhaQPuxLw9MKx5JrdfeQHHolKfexKegzaOUPhRxcHHAQ6VDx18vt-G_V7pSU51VAs3u2o0a_TCHJYF9g00IYXiDlGx2BmlnML_MBQD2CSKCXpphWQRrcM3_ixmjAqIPYZ0tY53P1UhoqTddws0nj2wgYNR5LCao4cpS3JmJXBklIf-yozFmHkcncHF3xldewEb6oupK7WMrNG3CcI5sN4-Xkgic40BfB_7ASugFYa3Wy7f7AQ8X52uRQaJvtgJo1RN-LeYtKJn--7Q37hIIkNJIpZ-_bxIrsIvo2yvc9ZZVV0NS-JePgSJ0CrWogF8V87eald_ag8uigFMB10HHmK_FM-x0f7Ha5laZTTQN2IwFy3aOAeV3GoAMh_sYPY_0lJG26e7JJldxYH-iiNaT92MRcwc32o0IqTU2pSE1m-z_hS4YxtaPzeKGyRbTROgqQbGjVLPjZhuz95HGcv4TFYQC3H4FdwJcIlleqDfufb3twq2ELe3mHGXD3OJheeNf5YVBU5yp4Niehg4uMOYs1BX9Z0umEtbAHQZ8aOXY5Y7AhsTejOIM25bYVu6T9xX1FWp3eivqZD0lYf8ZzO-huiDiND1SPazfQ29_aIjrvW15NWG36Rf4nnWVickJbL17mD2AF-ddOqIVFXHDmp8V0TIjQ-IZR97B6ogCXICBN6KPoRVqjL4vBskoIghiYles1OFt4IaClY_enr89TMC-D_KXEqmLghoS0c02HlWp281tOZdbtDrCNl5VU8uwDyaUge']
let zqsszbodys = ""

const lookStartheader={
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1249',
    'Host': 'kandian.wkandian.com'
}


!(async () => {
     if (typeof $request !== "undefined") {
     await getzqsszbody()
     $.done()
 }else{
    console.log(`共${zqsszbodyArr.length}个搜索赚body`)
	        for (let k = 0; k < zqsszbodyArr.length; k++) {

                zqsszbody1 = zqsszbodyArr[k];
                console.log(`--------第 ${k + 1} 次搜索赚激活执行中--------\n`)
                    await Start()
                await $.wait(1000);
                console.log("\n\n")
            }

     }
    })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())




//获取搜索赚激活body
async function getzqsszbody() {
if ($request.url.match(/\/kandian.wkandian.com\/v5\/Sousuo\/playStart.json/)) {
          bodyVal=$request.body
          await $.wait(1100);
        if (zqsszbody) {
            if (zqsszbody.indexOf(bodyVal) > -1) {
                $.log("此搜索赚任务请求已存在，本次跳过")
            } else if (zqsszbody.indexOf(bodyVal) == -1) {
                zqsszbodys = zqsszbody + "&" + bodyVal;
                $.setdata(zqsszbodys, 'zqsszbody');
                $.log(`${$.name}获取搜索赚任务: 成功, zqsszbodys: ${bodyVal}`);
                bodys = zqsszbodys.split("&")
                $.msg($.name, "获取第" + bodys.length + "个搜索赚任务请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'zqsszbody');
            $.log(`${$.name}获取搜索赚任务: 成功, zqsszbodys: ${bodyVal}`);
            $.msg($.name, `获取第一个搜索赚任务请求: 成功🎉`, ``)
        }
    }

  }
//搜索赚激活
function Start(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/v5/Sousuo/playStart.json',
            headers : lookStartheader,
            body : zqsszbody1,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.success === true ){
                    console.log('\n激活搜索赚任务成功')
                    comstate = result.items.comtele_state
                    if(comstate === 1){
                        console.log('\n任务: '+ result.items.task_id+'已完成，跳过')
                    }else {
                        $.log("任务开始，" + result.items.task_id + result.message);
                        for(let i = 0;i<4;i++){
                            await $.wait(2000);
                        await look()
                        await $.wait(10000);
                        await look()
                        await $.wait(10000);
                        await end()
                        }

                    }
                    }

                else{
                    console.log('\n激活搜索赚任务失败')
                    smbody = $.getdata('zqsszbody').replace(zqsszbody1 + "&", "");
                    $.setdata(smbody, 'zqsszbody');
                    console.log("该搜索赚任务已自动删除")
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}

function look(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/v5/Sousuo/playStatus.json',
            headers : lookStartheader,
            body : zqsszbody1,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                console.log(result)
                // if(result.items.score !== "undefined" ){
                //     console.log('\n搜索赚获得：'+result.items.score + '金币')
                // }else{
                //     console.log('\n领取奖励失败')
                // }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}
//搜索赚奖励
function end(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/v5/Sousuo/playEnd.json',
            headers : lookStartheader,
            body : zqsszbody1,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.items.score !== "undefined" ){
                    console.log('\n搜索赚获得：'+result.items.score + '金币')
                }else{
                    console.log('\n领取奖励失败')
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}


function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
