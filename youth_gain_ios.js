/*
更新时间: 2021-08-14
中青看点浏览赚+看看赚任务，手动完成任务，获取请求体，支持boxjs及Github Actions，多请求用"&"分开，点击任务，支持自动获取请求
https:\/\/kandian\.wkandian\.com\/v5\/task\/browse_start\.json url script-request-body youth_gain.js
https:\/\/kandian\.wkandian\.com\/v5\/Nameless\/adlickstart\.json url script-request-body youth_gain.js
  强制增加中青看点看看赚入口，和签到Cookie有冲突，请使用时添加，不用时请禁用
  https:\/\/kd\.youth\.cn\/WebApi\/NewTaskIos\/getTaskList url script-response-body youdata.js
多个请求体时用'&'号或者换行隔开"，本脚本可自动删除失效请求，请须知 ‼️
*/


const $ = new Env("中青看点浏览赚&看看赚")
const notify = $.isNode() ? require('./sendNotify') : '';
let startArr = ["p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP0b80G-JgABPRZCN_BPRQsfC8GU__l9M3idoLoc106_4FcDO8whTM7YaVmi22aDzD7Rn_H4QCaAYVfqmGwTkJfTtEJCtv1aKja9UOwqrAOzyQ9G2LvCMLD8A_6KwT5zXN0fVsW62U8wQvYPd56b-l64GlWwkdm11KvKMB2Ha6ZiThcXJxee9LOGJhRERYAVAQdh_bGKhg31h1S6oCBhfjHjoorBbALnSN5YExwFODL0-YiL7qz4xf9vr-ef5tf0eo6j3MvbtOND3gDhqgslEw7xziahD7hGcEvFPEOdm1PEEyGv66tRgMrybsEBoC_pH8LQpJl6eAw1DRWZ16TNFhyhr-3yUpfASigeHCOs37lKP1DuoUTeIjcG6K-orEODeDUQ0yeAhYAra8H6sV_J7LQie7d7itYZkp1s-u1uc1yDeksFSJtAm0_-00WpKj9WJfHmq9zEZGd6PsKzE2hPqO1LU29QhGuTP-KRoOOf4EzOlfIzgGVmRRQ4XNjORpJdxK0N03LBPC2GZiPs2mjtau7OKvM0h_KFFZwLIQqXXfGin27cuSuceQXy","p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP2q0XJVC5hLNhJ0TjgIekh4MagANBAJGXhaXdVX8tSIUgyKCSGDiHySHkbeIYXbuuuUKKSwey-KW6azZpAeXJk_t-6v5AbsI2quGoLaxKiS1cgj4E45b-AOpQghWANanorbO8E0Pt0pg6NzDuFby2E_-nSjARlP83S9n5ZGIEnKM5Vtop5I4cpQKMXr66Q6rGtG6GxdAgYZQ_401rd6Qjx9WOxfzJepoSdNj5U8JGLo_yA1H3H6ITloIKx4rU1sdxhR3hZQ8NvxzX1xgsUyYqtbAaSYPetipcS3shA6qzwoeJRGnuRj4dNBY9rdxad_YkiA4_kNA3s3BM3Xcx73tgMMoTRS_jQ-wsfVHe4gKeGWJRR4eAdy-Vy7pE2kQ9ze3S1g3yafRsX1aHhSp9EHWxfuEQ_zUEvR5t5IiXELnJ3o_bNRM-EYD_-LfqDOc5vlp5zVdglkCHX6P3EY3FHaOSOvONOMWGauwzMTS8b3DnZWvXANDSFuDFE6GYkwlArezcUu-s2Fho1rT-NmD4_kjnTN8S_HjbcENQN-oJEE5LHQyRB4ZZAhvFfi","p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP00OzZFHkmUXBLU73vxulHsa2bM4FpPQG46Wl8LscpfRJGs3tSJq8yZjjkiCsJU-vfsDjcPTtlKq06tGXOr5RsiCBH1i2q6JY3_PvFcm7YiIKFM8IxEgGCxvFfCVzTBDP2ecucX0PcjasBkDUNW_WIKYSlyupZEv5Tny6B9xZMHviMuhQQFq7PVzAcgaVP3hP8gYRccJSlXu-aLQltbST3YbaRooam1E0waAxvcLdKlBfqGTCaLNR8-NgbSEFfxDj6ViFQS7327t_Pj15MFFcU8Orm4MQl3i-a9T_Ipbokv67C-s25vQXRjcLm_TJrSPVG88w2z9o-hQbu2P-PTfaGBkKDx8Qd9z8dpG9kDn-MtX5kW0mLEF3HE_Na6mBhJYNgjaJ9bJVUry6zVHYpvYoz4mxUH7708Dopf_PocyEobkXOIE-snnS_AbCMB-1H387Lr0pIzZXPumzNJMtKLEBSCUsn3QQ-coYP_2gVDRslbcuDtb_E6OtMC4DD5WJ2BfKtjUnj6T8KXzEliWhZG5pQnDpv33r7xzhESnvy71F7c5J85E_UFOlKd","p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP2U8q8jWNE0Kaxirb8O8lH0SfMgcaxAcqsfV2XdGFQL6M7OmNRuEUzHbTCNjcPbDKuZLAA4nm9Oqf8T1b2V0cu38wqLRjso9ddugbfL5_TkHioATYaUl3xlpN5Rmtf39XU8f424uE_Ip1VAmKAbYiDPJIQsIINXqZSQ22M62eT0y_85dZa3ec5cvGcV-sXXjmL67r5GXhb8xpcRhVyazADQcYX9aRP-iFk3dL_otsV2SYftnYV9rFaK8M7R_mg4umYCoBSfSrmLdYXeXt3KH1ZlgCLNZXvfliFy5fIZ1Fx6Wqylwr1iOYRoNIUBxobppbBVCwauH5heKHVg7mxp8FW7nwSt-KJtYBPAMdQcSCASToyw387BeSm4wV-Wza4PAxwnHLZOFi7iSNMELDtUxCoWm7lQ3SPZwoYJcvtFOAgYldiOOODksfIwRSGTl1ftxyVBhTLIzMQR-QRLggVjzuWDg0rlyuKrFtdx6mzOAh6CUvKm5N01Pp1onWW1be7TZPx0bdBwvm2-3sJDaca1ynEeuGeMaRoe8_6cA3FSzWC6ADArATwRp3m0","p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP1IMoX8UxDabTEDpwPaospEC891hcbE47bDzWni_bAvTCccSX1zXnWjBZWs37Q7Efb3avFxNZgpkJTB_0OnmcH-gliHy4LM-IBKdTWf5zjOpDKiB8e43wQjU9NDnKARHuwr5zE9ywFSnHehwCNMIuZumyhNXE_lBIwqd9olZ-YlvzAXvvXbPKTSBmNpOdUzcu-lT-lLEdh2rEdlXyMTctr2PdxLs5igqfZ1kbyP9nuDjDoj45e5MaEztPiVa8LrXVvVSl_dmV-MxqrBOBhx7yaNwjv8EeZP-1iPo2jW4ew6FzL0tzhYtz4oXUDaXsv6BhLRRjZgKNriIwdb4wdNG4N3I4v_ESOA6_su8E39knDNj6vqsPJh9W-Wr9Mqo74qwnliXtbJD-fnJjimJyXt18oRmU82ahmUcmz4eDo4Hv3epvv1VcQHpt2XucnaQ78qooHGSNbbveGR4AznLthaZzs6zbcOZGJSVLuP7kYKZXYtXhj4DcITwJgwCidKdR-Cxx1OVbJPBdpb3r9txliQXhyHL87UesgPnBarl6efK71uYHLff12CTryf", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP3Tuuk-zQS4zYEKpsXIyKCx4IFmiSO4cvuWlWjWG587lCsgq2VSM7Ifiqv_6r7paa5kedsGozhGjWqytoJEEbc1ST7rkrTeDJQXzLCQBSfPIcXEcLoQfh-FyDdnkzynkeqJduezlKxxphGAXIEmnYTUXmljLYBdU3MO9KvpglxJ2TJsFLIC00CfJVIkiP-uqW9zYyfp88UCMalqQTS-7xwbQZRwOAQdoOSeublBg7Weh6ItksTAkicwCv-gzdQVyNgAd-FUJXXx98D9OJp6z6QBqohPFlqlXwqxaCPG5czjHeE323Sx1nTI1AumKbVxXG8sd7Xu7t3oaTCWtpKWyN2ERb8JvC9FtxvIbsoPq1EsoXz-TQPjTzypaDfsIK_APNbOWrdZNwKKcWXVxq8R4xH4wgTyGu0Kh6puFQ3FRD4ieUyUUL_uWUfHb376IknIkRs9Cybu4u_UXQIPPFzb8swyQyfvhiskufaFINSO3ScsSDxwcB--5yhsEVRuTV5PfO3Yu2NpIpW4SFX81Ht8mrg6DfvHA7hfJj6QFQhzJ1emWjWd0gJRqo48", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP2aeiugDKhVejMovXMl15AbZg04hZvONxvLrdFIRSXffhi-cqgHmkx5JV-p0KeFBRxSx4N2wuW4KzPlSapvW1om-pg1mjq1YQDB4zvx_Jt9AcgRWYhPRM3HKB70CyPFafDza3GuUrH1QFbnbAyMeLPBGX4BWI4_dnE3FJ7bmkWAl6ESzsfTviYOOv2hQV5Y1sVw-WpyCm9AytMjbRZpwI9_CPoWExR9nA8zF87Byyw9_J4x2s8QgRATVBi8W1gCl_w9kBL-FpiKs5ityH6-RThMWy7CphTL7351iAV24RZsQlSZIEcMqiS2lPVuMPsSs_QZB_QPvCiPQnFJcPVd29ar-1-nTT9Rgx-NrJa0hNJaOmK17Oem7hOOXtZ_i1YldKnLQrOFugachvstGEaGwoZW3wj1PJS_CD0znV-0FNfuwa_j-CXX2HBj9953wvfYE9uwyZp0CMwiLUR0Ix3Hv1rOIU_fYwGX_oFKoUzuBtgyKJBFthH2TgO4tZjDa2Y8hUhLWNcMFGhM9yozcvQgwD_kHBH2lbzIeKj8uh8lFT0QRIcPQcXrxDTi", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP1aUzm4mezpATx59sKUWhkIRg1tvdXg8QJeAB7VRH5tHU-BVXaA1RVYSa8A7c9Btd6Clp_kjfdLRpL_uRcT_1S_3TNMrtSzrPXtJttPTyx_9QDF4CnElUbf-uXEtc4MitIdarWW9mPQq0gIG6zkbUsfdFJCr_ymv4W0T2YHDBWfT2-LI4Gumxya47oqx7aCMy5YP4VFXPC0XR0QnkTPtx_kGas48HD4Kp56Uo4Fy502zruwgz21Wbe9OpUVbTBWlPZsbP_cglKxrGwQfD7pIw8GhFVKy_ZZaWjBFVhsDHcCzb6qgP_r5Xc-x4117zKFwaWcdhqmwDry_fg121nfrp9UOBhtZFmTZdGHs15m5gO5JWH9ynoa2zSUMwM8zh4OSUVIPQPx4YKF5qRBWkEotZPkbf-J7PVgjW8_uflJ_3YCVx1HY8MkNpK93xNX-YAeZdbWbhcSQtQ2mbdYumixjOiKsxhh-8t-uuftxz8alFvTAdw8xgpniZjbGgB90OBTj-oWuw7TKu9GRFrfbfaO8X1zpGWROwkBzo8k3Da82l4fDc2zoo9xJG83", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyExYNP5Hry2GAZVs_b9iPfhiABYILFq1WP0OhXIAHhLrH4ARBZ0Z65vGzlLukeZw8BripQ2HeBBcA_uY98K1x_HPlP-RM-42zIkLJofJrYfayelR6v3syQLDj_S1uimuel_iTC90Ha6WGZBU0dsJUx4VbJVHPjRopXEmfjsIMv45FN3F7KHgecCObHipPXFRkFd543w0wNhjaa8LaU1J_zXbenjbTusIMnnNwLD0utQtTcsH03wFyF-e-wZui8FYyN8cU153RaszjWGfPGFwzPePhK6XO7lnqDuhN5PCaI4gBlm7VCM_5jU0PzoboHh-8xfZgvWKznqEg00gGbv6zlA9NqKm_QBGOmfDv4wtvH87MKPYJVw8cqddOWZhrsdXcD3G-7qKyUW6y4BZPJjeWHGvhCuzG2SO3GUI0rH3N875xGNp2eTn__EEaYM1ArEg1jJR5slXk43Utnut6NLusuBQnVMjaZP-y3ikxOqmBCerYeSIk6nlLVfmLiUwLfyMAU3R9NEdKdtKdQyFwJ7Xls_c1kDuKNeecdaTEIwyijV3tn4nkixe-wUROs3tfxXVjHxe3FQMQ-Zgu1hTENWARqLT"], lookArr=["p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgSK-u5ZpaeaPZFYubb6vW85cZ3pv7Mtd-LIOV8jrcxeHAmqx74eu5xqO-FSQxPf33xpNCg7qF8XL_ADCEXuKO5y2JqxjgxXL9BjGd9iB6sAxKhPtzEelTFAc4HgP-tcDV7KCQiIXyo4DcQu3ssQibmDpCBI4JUJzh8bUsrgJUDPz0qMbP5kcGic6p5STaaNRPqWFl4K-oNQ7InB_E2YfpkY7FYwfzpRY_gQkWf8hrBrfDlciTPKxDdunWZ0gn3agYRw2x7-s0SMYYwfq8Uyce_SE3G50y5qAS45O2a5A1UnxLIiYH7sPSUKiXVCIvP0VBXm0iQyoh9Uw%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgaSuA_H5w6YNMp6kvPAhnvWEAe0NdcfKsJgZyxt9VndL_eoRpkoHVRUf_759hUSO3On2NOyrWTWuuKvDRdHK0SPlezuB_pgOSbru9optxiBxKTaK0aN0CLwSP97l03HylWDCtQNobPOeQcQhDTTA-eCuZrFjFrNHtxDvOKZkRMtJGoQOF4_vqqoNtjv30DuYeScN8WQZcHr6WhcpXJ_zckyqa8j3HNTX4QWNmUqqmJetnYTBhjAbuifDAacACAGKT26dsszm-zkvkKVMBoyDaf2X3cHAezqz3jn0ad_RkShVGaE-Gd8RFoz3uRjt46rqCvL931ep22d8%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgJh9s1h2_qVNs5guHFcFTsdGddaPzpefL2vxBWTA8wcuqY7u8AVveWdSjtJC5Okv4dz26wjic3fuarrWlPU_jA2-3yzptTycGR25NRlBE0ZsmvJ3MvPkBd8CANvN-Ak54KkAFsylpZu7bFvx6TxvDhIqHG_UNYCJbLvM-ZkFkqrHaNFpjwnZR6T8PxG5VtXDE-HHgUJMNXWaub6kSSe8hVXT_FojPWY601p_RcSFnFbESvOJ5WXrK_x7IHLtM9j5Ny8BMPheuj-ratp_5QjSb_d34iN5jFpw4pZaQ29-6-DX83imRNzHEYuOVrJnQWOFDxN4KbPec3IQ%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgOYGvg46uf0fgCjFgEBDs_486j13-RpDCGlKnibIcBeFoKaTKmtiaJAo8jTi8wnA3BPp4zPnGUsvySG6Sr-MWpAtmXGK1F5e1Y01Nn1zUgVGOMryZWxsoI4MmrWQaCF2oX-dbpUAoAV8-5iGqUky0fO_K2T-4m4RpJ_bYSnxsztYzoDsR7uCph70P3zc0Q-RHxAAB5E9iHTImMS59WhL2YtwGyJy6mjP5ChiCiCR3xkDfyEiT8BwAAPrbx0UeLSb7psyu321xtnrnXdTAfp5f6eE1txM81znioo7_xGahKHfkKB4wfYJPWwqqrD52DejC7iCSl8tnzLk%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgOYGvg46uf0cppUdGRtoYl_6uKuA5zVIksf1UnF02IPS4EXbRaQZSyP_TerOt5FOZAk1gRotIc4xGNjzs_yJ8R-rchiCqANM6sNmw_6gKIgndLhdVQ46RMg4SmpYorY0NdWJgbnw91ZQAc1nQ_hq1LCBWtJZxGjZp11TBIlbYMY_8wXK13acBydltLx3WQn0HfoJb0XeLw5p7YLiR32fieIDRT1HV7rqb_K8ZzEvPAzNYhBb1wpcBt8a7NEvDX9ikQK1DS9oIk_EXebEMOdzbHFK8Dz3IZnIB4egLfotEah53IzTIXA97SpQ-wLVliGeKnPruyicZ67Q%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgZ9LUmfG9IMHSDyC2AqG6AkXD1XaTJqF2Xkrsh_n3B0_4lAD7kylxZEe_JrqLPkSfn79UXm8qSy5-svEqkkInG3mAgiN7bSrzwQ63ko3dgCVLZA7-sMkvtN_qnCjqarbshOq50YgqRGvh89HlHtf7PLiWxL3a4Kyx4F2fie69EOfXGchxaRa00HTDtp_zRaODegGu7UaqIQiWOeBc_JcKjotFHLiju9YTGNjBctx7i539k9x4vmq2XsWOFh9hSHpijB4qUpqnoA1RGPFeA7hVcRzOwnC5ZKEmbCyLSsLm_Rz-DIUmaPiVnOjOtmNmiB7Av93fFvo5RFk%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgG9zHjMAhbFdN6L3n2pXsTzvQX4lZNjWP4rmSDoAFaGxQPwARb_WU3p-rbwCcDZ3U2RIG93wyMtwI0W9fsiIoOdygO_SuglT4dUmR7mBTuOyh_uZyL8nx0Pu4_w00EH3yJhyn3hLE_3LErBVKELh5T0KYWT77gUU8WLOPoAJqErWxtYitE_6SGRYcNUOgoPVr_8Lx051nvYIF78pyT1NG5RUtYwQNgqi6rNUMUvWeLQYgkou5dNMmIouTn4bw-zWEWlB1QDgA9X1m7xo2_M_CYlhFsfCsmtcJ0do4TQZwETchn3bHCzRiWmZjcH30AaC281vcv-fxtzE%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgG9zHjMAhbFcBEwEWwOCeeURy9o6BEjzpG6L-p-DRxvD3LaR8JyXtxSS26hRAZ9teRJqvyhqcVM37RHoT-g-Pmd41u8wPuq5aZciFziwwiqbYHLoc_6e8rOiHPjbmJ6RtcbzseDOZitb99PWt0IxjZfgidaCxfgi6yNUcaQQ0de9v1c4WOMEcfZGZXTMAfuIA6Q0BKkkGS_EUSIVbg2UYZhKzEqRb-rEQjZ_jFuxQzKO2bGoumUpX1D_HzLxG3Jv9AFPIx8v_SQCZjTTa1BcfWJDQ6K4I4iyZO-sxcAApLuPu1bgY8z3LzNsJM09a-j1wfnjo49UsNLM%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgG9zHjMAhbFdUQ1yLF0JVm-42tuRw04vSbaL6rbzUh0pjkMmOYRg_s1GvEit2AWV_-oSIPnmKFOyq51KggIileP4S4jk7ypZuBys43RxGwUQqQrkEF53n-BbG-JTTYxMJYG4Cbuq5TKBOWQDdHHYHuEhgz-vg1e9N6kNL3izR5G9IpC7BtfuxZLwzKG7nRZ2RWljyt87cBOodrBB98-vm5_8fy6PBIxtMRyP890SUc58fl5E4aWeKWcTmRcfaRjNltnb_vsJkKN9RuB25m5tFABRB5zM8mPQdQZINPUAKVGSLNWiMtRORcPVBW92cz-KPtD-NpvuGgOc%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgG9zHjMAhbFf8N1v7DQemXX7l1Q42cpPAnTGtW5uTdj6A996ocx0JJxDGS8T5jYPXDXl_BszygH-oyhbvKf4kv0VNsKtKLdOAzd2XJ9vapM60NVkp_wTbN9C3LuF6p-kCayP_6JyE4v3XVuFkTeWo2XJ7AEIQPuzzGyJjN6dQAP6IRBITf1TXeIWAge7i3Ls4ipancpiLNiEcgs1-ge_Su2RdJVSWZKnjVXId9gEKO5U96JavzKCjxdkoJmMtm0gLxollWFTw_w_oUTEr02PUiJiZ6GaCAMEeKUQuS9Uh7zIfKpcXUPalpl0ePszDw9EuL9H8syNxwJ4%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgG9zHjMAhbFeXDKbQusJ93DdcnMS4rupIkYTrgK_GZZiBmBI9gQv45JD_85c3Wnate8klbNs2_S0MoU6m-CtZzXjfNshZHZP93h_jHVLKta5bUux9YDp9AR3tdqO_SGbZ7233MIi6mWmlC8HhobuCVV3SkVpGpWfF3nxpMM-MexEVSuRJ8fEnsmmf11tUd__6cRdH5f9IcXvgSwDzrxPUznM--EuxbYEnUyVcX-45fwBLg8VUUPFmoVBAZrqot7lY_nQtIM9fzv3CY07OlTpFgWKIq-n6WIyCN8EjnpeZTYBrM1O_DdPAArAbt6pkxlbf12RgQEeU20k%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgZ9LUmfG9IMGhGlGk8XHMJ3tA9MK0LQlWreL3gcTs21QjjkEX3NoHmj8zrSs_zeNaLafkEc3aX2N9zqRadMD6DKm4w2rSBpzAQgMvv3myBLWfSmpJhChX5OG97OxHNSCDx5E6zj3NMkyBvNhGcNb0q-eYNxhGz_0pfywAm6BU3iA-6VBhxok895WSs3LqtddSpYmfjVXFxVifRZQDdrCdq_SYN0q86nFG2Qup4oXjEgGQXukRy0-4jS2k8b__R7FE6h64tCfHfnaTpovyMpE0lDrQj3B6GH8HVsVA3hAaCHo4FLY5qArCfKqwMvpJOVCXn-Wlg76bbv0%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgZ9LUmfG9IMHoseyuBhfc7cWPEa50T7Wh_fMooFPyiwDV1vMBIqjbbXiBB2S-EiufMnrZ8CS8z3NM0e0mXT8UwLyhe8bpAvDy5mwTUKxQAT3VbW_m9cKogUARniFx9o3_fIt7EuodiO0rhuPcAJQn4C4K7kHZWCVJ5qQuHmhJqoReIB3Ebe3e1vTnNpBlGL7HZnVWnWW5rVfeO7KFZ9VXQ3FtDCOUV0ebrtpCuQvJmv6BQIBJ5qsD_e1MqhMSJcRF6svv-TuSnwKYE0gczduMHCCt8fUakzdv_sUM07iYt244Cr_AJEoibPHix78scjNsO58rHL7dJZ4%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgZ9LUmfG9IMF6SafTZfvr86L_Gfc2BJ7o0l7oQ2eonSVFA_wO_cRCerRF_xT4Igf9taz3ENunufhjVkGGMZ-INP0LEHWseFcTX7H8kNjrHuBe4JGv_XjwrShVJO6z-Nux2Cyk_P2AfP7_ZQijecC5rKnsmu3m3UsvzbprvzFwdwhQUdTjLF0VuQlRdt3MHf62KHixEeswztCTcolgQtmY48Va2_Tjcdawy0ZYWAztLxRjoIm1IdPjocpwhqxa9BYPNMtb1fClZLapaJ34HUHNe2q9-1_md1rQLwXnE-RwLF996dGssdmtRPW0u_JKK-coRQIlOMskb5M%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQK_5thm6m095SKXJBfNmfxIeDJjAgqub3dg_qhgW4kozKm-pgDaile-0ddYSdOCIenLqTqsGbc0vf9T2R-OUn3gWyynMB4ylAvd8XqiAR6mtAmL1FMrDwcmVxqVoI7c6TqlOaiaMBUhVpqJgyvUsZoEQeuU0fTokGSfYRBw99c5CbP9of42X4UYudcxaZQqw4QV5oq6hipMbhxrZ0cT8JHbY0t1Vcwkadm1ms2IVzTfSyXV1IkKn043WAc3fWMmN6QolTn1xoivH0pEWGYQQhDbrJLcFdnjVcXpdzhN3AcRXwK0tHnvRER9M_NFdzC6YbM%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQKncgzGtrSYo-TjNnw5bMTpewtc4BKrBrgdffv7Qe2GNdtnTlgWk3lcvY-VP9M8K5AYBlSyULaklXjE_NFy1amPwa_ZSJPA43Dqjw8B6XJhsap9l250IqEzn_X-_RQJYHtPky-VynlUOwzBJlNNmN1O4tbt_tHuJ0ZA5YO_1msMdONqiEJbRAmdS5aeqqHINLDPhi-Ig9uzgDiP0XJWRimvuq5fnFPlNB0GBYKHQLaqa__aYx73V7HqDcq0LAxy7l87C1svCi84ENgQ8D3vy2P8gEj-2BokDrh2YB7utIV_Eoccy0Da2WfZqV-hS506GkM%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQILFdX683XG9YRrR4HScBnhjAgOcMDk4G8Os-WP0kW0wk_Y-Nh-d-orse4pyhTryvok7NnipNg3P1tHd6CvMqf3-Fr03Kgknf7kk416eY7CYCOiy51_SCJwAtL58vdYk00buFMApXQ76HfXybud3rB-hnb6UyQEQ0ru1HmBjZoQb1CxhjeajDxthutxmgUjZnaFHG8zIofF1TCeoNDa5teHWdLaTgEXkQJY56b8hLvUC-sWfA4sKY8VE3vq9x02Mp9l07atUy5tOmG51VrgtXghLdAJIdXOTnxzkjow8WOv9MhwnjDpHrD3KFI2uK1AqbI%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQJyutkpQY61fAq-nQwdO-M1TdvSVdiKHLNiPvBZxaNcPVtJCnR9KZdMU_aT_nnmzIrjwyFtc4zMH7HHlxSTu9zIZEdt7gD_t6xIU4jJHKrfKjCivJYHFQ1cPfEv7GvDh30GJlvVkiZ3PMTqMF2hFubnb1n7dx0EpmBgLLbWRFFxygnIorQR_iiGaKtpM1h1XivakD982Y6G69bPqk-qSfysMbzGvR74Jkw7CQLMKhpobUmiLWtBAqbip9iC1T9Tydg-cO8pT4e9wWYT4w_cJ1YkqxWwddzfr6DM9v_2ZEf7xVfFTjQUK7-JDe2NcOz_EkE%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQKi6hvqLVgy_8CtcvWOatsEJVU6Q35HcmCHqVxuFz5lzvTl2Wjsc2GV7Vzlz_qGikEAwVFuiVY4b0tAEswqAyy-Qgyec9sZNwZxX6ZOm6NbgaE9fKu6c2M2TSWytKQr61uOhJcv4TIwkGu2LcU9lfP4qcATnHkMYwGULod0zhhUWrGbIN4NgaUUgSTSE9x3DFkGTIV70a4NZUJBuCd9CsDxDACktDNDJXkdYyWc1cyFRPlOyHWmmP7DzF6lTXp6kEc9OBtuVL9LU_ngwi7L4vwDllwPBFLnbODmWDlMOFW10Y6brxebxe5kr8nj9-PsQPY%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQJxmF6OeEBv6wE2D9bUjtwEup6nP_6vVADPCb1LDB0PPJOAIKOyHimAkenUbwfMtjTXooYqL-G1J8x9m6w9cYRZ5L2pGxyFRAeK1CSefi8XSqfFKOtdtDiC5F7DebFuIUeX1n1fYD8BBSuCJYyD8_jK9OMM3Uzlyx4Uj-kglVP5FiPGoeDZMMikZslntHCR-sprsIWaffq2nNBoE4S9epDG51W8aF6eAtFrjqFnw4H-FvDnCrDJl3bYCO2qf9SHUhwrRYtAajZaLekAApypMjXdesPAxz-qTciBRhkG12rp3GJQQWk8c410raXC7Wg9_Gc%3D",  "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQLZ9HNFfwMT8HOI-wOXbNSkuzaryJS5N6OL3mrWvZkxP1m5AMb0ymAzq_fQVBeXR1ZENOuYl4hs7i4NQVwdMLNLnb3wG_PfKwJPE8-7pQoeI7CkSSt7CGMWTngvynXA_ZKH1O5Nre26kAtBWs_Z-gkBPdxgEH-a6re8w10n-8fvKOKel6SJBAK4SfFBod4cB-dBW8NiX-12x6bQtdJlurrFEGigmHH7x_qg_QQ6WonjVdibcGnt44YNpOvo6Gs4jod28I3-fU4v3FyvvEJZ3v8F30r2-yIxgU2AXHsAtxbpzvD4p7ZAkZa3HAG_KZlOqUw%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQL9cbEkX6O5iCH2urd14vIPwjaL08q_CFVyxZqoMEaXuIh9kUI5LGHcKMnzYHw193C3qjDYoHTFAAman5JyUuZfwd-Y8Y3rfYoEyVG5R6AXd2ZTRfK0f4aE7b07slF7sU5pif3aC7ShbN4kx2uaCDCwTDOv6LysbNlhUj8cto4A90cjgIA9F_koJRKQltJDIc4Xvpc_JIkra8tpYGh3vHwHhSLUYaifeFsEsBMDZ6U9MQUhAXDpYEx5cDrUDNbBHl6ycmBYxB1FND4UDJFf2hjaUlnrRKBexIZYZBufdjVWZduMLDmo_wxZHbWmegnzzGY%3D", "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgeugSZANVRQLYLxtg2Uv7o15DOO3-0QtAMoaWe_yCqOCPvuVSOxj2Io26LqYwHKoPSbRiFUeLz5NOt5cEXX4Rtm_6nfdsO2AukIssGDMtoIHc7KEdCC9qXKQTwMrFmNFLyg6QSh7YfhB5zzzkxvyPIk8srKPalbrkmk_smmRTCLo8RwYZnKOk4jrueaA_JkOlntw22LXNuu-Zi6WKdeY8lT85QSXvKyxIfn7dapBNCE5-oobI0gZOQAwob5CXOg5VCbzux8FTiAlp1jB3VH0if-lmSXWp31_ZLivGTz3j44p8uf8dXWDQ_pYxQjK32QH2BJ-7NHzR-CI%3D"];
let gainscore = 0, lookscore = 0;
let StartBody = [],LookBody = [];
let startbodys = $.getdata('youth_start');
let lookbodys = $.getdata('youth_look')

if (isGetCookie = typeof $request !==`undefined`) {
   GetCookie();
   $.done()
} 
if (!$.isNode() && !lookbodys) {
    $.msg($.name, "您未获取看看赚请求，请先获取");
} else if (!$.isNode() && !startbodys) {
    $.msg($.name, "您未获取浏览赚请求，请先获取");
}
if (!$.isNode() && !startbodys.indexOf("&") == -1) {
    startArr.push(startbodys)
} else if (!$.isNode() && !lookbodys.indexOf("&") == -1) {
    lookArr.push(lookbodys)
} else {
    if (!$.isNode() && !startbodys.indexOf("&") > -1) {
        StartBody = startbodys.split('&');
    }
    if (!$.isNode() && !lookbodys.indexOf("&") > -1) {
        LookBody = lookbodys.split('&');
    }
    if ($.isNode()) {
        if (process.env.YOUTH_START && process.env.YOUTH_START.indexOf('&') > -1) {
            StartBody = process.env.YOUTH_START.split('&');
        } else {
            StartBody = [process.env.YOUTH_START]
        };
        if (process.env.YOUTH_LOOK && process.env.YOUTH_LOOK.indexOf('&') > -1) {
            LookBody = process.env.YOUTH_LOOK.split('&');
        } else {
            LookBody = [process.env.YOUTH_LOOK]
        }
    }
    Object.keys(StartBody).forEach((item) => {
        if (StartBody[item]) {
            startArr.push(StartBody[item])
        }
    });
    Object.keys(LookBody).forEach((item) => {
        if (LookBody[item]) {
            lookArr.push(LookBody[item])
        }
    })
}
timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);
!(async() => {
    $.log(`您共提供${startArr.length}次浏览赚任务`)
    if (startArr.length !== 0) {
        for (let i = 0; i < startArr.length; i++) {
            if (startArr[i]) {
                gainbody = startArr[i];
                $.index = i + 1;
                $.log(`-------------------------\n\n开始中青看点浏览赚第${$.index}次任务`)
            }
            await GainStart();
        }
        console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${gainscore}个青豆，浏览赚任务全部结束`);
        //$.msg("中青看点浏览赚", `共完成${$.index}次任务`+`  共计获得${gainscore}个青豆`);
    }
    $.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n您共提供${lookArr.length}次看看赚任务\n`)
    if (lookArr.length !== 0) {
        for (let k = 0; k < lookArr.length; k++) {
            if (lookArr[k]) {
                lookbody = lookArr[k];
                $.index = k + 1;
                $.log(`-------------------------\n\n开始中青看点看看赚第${$.index}次任务`)
            }
            await lookStart();
        }
        console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${lookscore}个青豆，看看赚任务全部结束`);
        $.msg("中青看点看看赚", '共完成' + (lookArr.length + startArr.length) + '次任务，共计获得' + parseInt(lookscore + gainscore) + '个青豆');
    }
    if ($.isNode()) {
        //await notify.sendNotify($.name, `共完成${$.index}次任务，\n共计获得${gainscore}个青豆`)
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function GainStart() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('task/browse_start.json', gainbody), async(error, resp, data) => {
            let startres = JSON.parse(data);
            if (startres.success == false) {
                if(!$.isNode()) {
                    smbody = $.getdata('youth_start').replace(gainbody + "&", "");
                    $.setdata(smbody, 'youth_start');
                    $.log(startres.message + "已自动删除")
                }
            } else {
                comstate = startres.items.comtele_state;
                if (comstate == 0) {
                    $.log("任务开始，" + startres.items.banner_id + startres.message);
                    await $.wait(10000);
                    await GainEnd()
                } else if (comstate == 1) {
                    $.log("任务:" + startres.items.banner_id + "已完成，本次跳过");
                }
            }
            resolve()
        })
    })
}

function lookStart() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/adlickstart.json', lookbody), async(error, resp, data) => {
            startlk = JSON.parse(data);
            if (!$.isNode()&&startlk.success == false) {
                smbody = $.getdata('youth_look').replace(lookbody + "&", "");
                $.setdata(smbody, 'youth_look');
                $.log(startlk.message + "已自动删除")
            } else {
                comstate = startlk.items.comtele_state;
                if (comstate == 0) {
                    $.log("任务开始，" + startlk.items.banner_id + startlk.message);
                    for (let j = 0; j < startlk.items.see_num - startlk.items.read_num; j++) {
                        $.log("任务执行第" + parseInt(j + 1) + "次")
                        await $.wait(8000);
                        await lookstatus()
                    }
                    await $.wait(10000);
                    await lookEnd()
                } else if (comstate == 1) {
                    $.log("任务:" + startlk.items.banner_id + "已完成，本次跳过");
                }
            }
            resolve()
        })
    })
}

function GainEnd() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('task/browse_end.json', gainbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message + "，恭喜获得" + endres.items.score + "个青豆");
                gainscore += parseInt(endres.items.score)
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function lookstatus() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/bannerstatus.json', lookbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message);
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function lookEnd() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/adlickend.json', lookbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message + "，" + endres.items.desc)
                lookscore += parseInt(endres.items.score)
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function gainHost(api, body) {
    return {
        url: 'https://kandian.wkandian.com/v5/' + api,
        headers: {
            'User-Agent': 'KDApp/2.1.1 (iPhone; iOS 14.6; Scale/3.00)',
            'Host': 'ios.baertt.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}


function GetCookie() {
    if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/browse_start\.json/)) {
        startbodyVal = $request.body;
        if (startbodys) {
            if (startbodys.indexOf(startbodyVal) > -1) {
                $.msg($.name, '阅读请求重复，本次跳过');
                return
            } else if (startbodys.indexOf(startbodyVal) == -1) {
                startbodys += "&" + startbodyVal
            }
        } else {
            startbodys = $request.body
        }
        $.setdata(startbodys, 'youth_start');
        $.log("获取浏览赚请求: " + startbodyVal);
        $.msg($.name, '获取浏览赚请求成功')
    } else if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/adlickstart\.json/)) {
        seeVal = $request.body;
        if (lookbodys) {
            if (lookbodys.indexOf(seeVal) > -1) {
                $.msg($.name, '阅读请求重复，本次跳过');
                return
            } else if (lookbodys.indexOf(seeVal) == -1) {
                lookbodys += "&" + seeVal
                $.msg($.name, '获取看看赚请求' + lookbodys.split("&").length + '成功')
            }
        } else {
            lookbodys = $request.body
            $.msg($.name, '获取看看赚请求成功')
        }
        $.setdata(lookbodys, 'youth_look');
        $.log("获取浏览赚请求: " + seeVal)
    }
}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
