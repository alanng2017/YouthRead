const $ = new Env("中青看点搜索赚");
const notify = $.isNode() ? require('./sendNotify') : '';
message = ""

let zqsszbody= $.isNode() ? (process.env.zqsszbody ? process.env.zqsszbody : "") : ($.getdata('zqsszbody') ? $.getdata('zqsszbody') : "")
let zqsszbodyArr = ['p=ZCWwRj3eGxCw%3DOY4T2_YuUnfMV_DVMms3dy-7E68zUruwOuq80MZh2z7wzxaSQTdW366z3bx-AmivWumxRqrXHwUhepGqiQ90enrq5GTDQ-cZc-ydO8PFsB6JJFwaoe2kzchrIk9Dz81omN_eInkmGjsQ69WBFvRgHmjig40Yi8AePhGdXGJWwG7rZ_OGBYzPUs1oUQrvcx9jDIzUY6ZjwsqFWFsSaQ8uGlsoAVx2Mle8Qon5aAwLovGLGfzgCDXmt1VW6IQo4pPzeCRTayGXwXv_4e7VogiGgVm7VZhHYz2XUBqBdg432fFgiqHSI7z80SbwiOTfVF6_AhT3uAdvNlPvemq_--kYVO5MqpwCEAKxMltQiXKgi0o2eZhOp8yAT6XrJCeNkRaIXek7k1HpU28lgTxDGgAJC3znvyA6OFaNL1MNgZfSC3TYi5B1cLm7hDzm7sWeZ_huhiniYqhT5kRoXIJtiLTgGrQQZhwnj_ABt0nVXuLs6NmXUIZBzOaLCwvqbWB4adX7b8_49pre27MX2HmZHXWEkCQMhrvP5uGv3qc9DzoYb240O1dVWiIdjGWJJutn_QB4k0XtZkvfRBNuAXCfZ9WtwslbwdUglgeCeTluIeWQwJaLn0Rjj-TzxTag-eCWAfm-qqYtTHJNkrDUZ-pbBl25zl4xXt3UCZ0NPCYl-9h6MNeBineA5qtPbbYa9enBDPPp0cw-o515SIBaSQn1-gROmzFjurCVNfoKYKGZG9AUjyGuD4mCuKaCBL_e9rILR-Yh7_EcO_dqfhd6BZ0sb09g3nwXLqCMa5bLL630TAaZ_ryrBI6XZnujxCdTmZbtrh7nobuuLy8BokqWOZi_rrkjXUrVey4RlYn65ePtl-8gj_obGN94OhGFdvEIxtkuu_oKd-kvd44472h6MRG40qEs4Q-rm7PXzB_vMrXb0V-BtuOeZwlqbLYYFF5pxucYjPXzmCF_MnRAr0ebFeeGxlWR2euOEEmcetqdweEZmamMI1NkMwO7CU1RHgZBUuth5ELyeoABQNEd0AckXxuVj9FUCxfPrLPQS3Xu1Rbut0jxRWnW3hnpdfdU_EQ1633lHX5JIQfTZfKt6kYN5QeFlPmvw4_IdXdK5tcGQFeV7Ht7A7SetAZIcygAPv8LIjom9SusXSBbm9BfL_0xndTrakbjPzRsjI333JXNV-osSwMl1PJ8UX2ir-px0vOnSGCuHSGdctjRQbf8-pyCsRXORJXNOFMCybKqT2KI2lgFLzf2javLIuE755HTN-PlZtzY6XySdKxnQYylbuf7dQ4iURNjoubGAMmNQOzmXKuF88EWWY0-NPx_e9YM-bF3D3Q42XAfd2iHDLGl85SwOA-NaR-QywkoNpHBMT6TypRw_1bhpjDoWP69BYsPOz7a0vAnsHmK1ZjC6QRH8WjjlCq6wLKc3K5RDK2stTO31b7q7IESFgDQcWlx2CCO23beNPEsRtGOfUFr7m5BsLf81yFq998b0nWP2-d0Da3Q','p=HUJybc31G2V0%3DUiVImOW0NxgHxY6TZ0me3WBplEX2kK6ARh3Wcs5Z6YN8CyEl_D54EwT96bYbNNifVtpS46KLLlSe5a7xVdmvSUBy4N1FDy98RripVSQqB9R3_7ohhzJTrDgY1auKD0jhEGKL1MN9tqHyslJQDTsnUScKCJiFWABUQO_u2ZulG7qPHeazxv5tLLb5ojQqYQu0ACjPat290fv1VQOijZlnSaDS0Fu7tOGsiqikshXhF7nM4c_KHl6iwsoROOyFsrc5Alk6sZBN7POIY_MvQHOxF90fWMJk4ntSsuBNlZuRUnAIpqeHKy2AtmWKbFG8imPEd3CoDM046CkUy9hUY9SxZzQ-Y62C3hCvPN-SojPg41DAEB4yah71v9qXjUzAPCrWJ0hbI6a1RTo7Zos9p233eHrBvT1Sw9V1EoPXt0aYEWLKYMklvjVjUs-RZ8HuFRxVpmlmkNF2cEUY8m2q-Eh52jyesgJhO7kBWUiPexUw-P14EuDHnElMjC30Vlrp1v82TR7CBDsZkVzJo9uoBjgT36r7VkXE9RzxHl1JfZRgAIb925JLgmiMmVYYxMJixDIYkAgO57yJRUtcCYwJUhdh_VIQ96tmsX4iqksU6KSu_KFxx3WYE9VbLVdr1ezWX-kFLEgdaTijq-bmHyyF_c8eJevsMMgXKm79PTQtKVlyE1OCWaMSkcCkR70DTuDzneGySYyaCtVAFlHl5YG5dRQdFG6AVAWsKB227HUdtPC6y1ZnrHSy3gMa5bD1-I-yrtE1EkysaWiH2dCxay3gxzLStQPrYtW1u6frD5XqUOxzpJ8lFe8A2fLEnY2CHpnbyQRegRdKhZkocE5yWggEBBTn8fbGvXHxv-VAf68VLWq5nDsCdCHWF4BK_BM7Ca6sy_ZvpeBqD3k6b0KS6GW_cIxeN5YhMFC2Gg9kAW2bqNDLUXi8LkKLs-z4OE64MHw58gZiW-y6blolF2uzO78mhfOkowdmzH-dnyAnAQ-B0a-B0PFslMsTKUoh_C31RdH7xF2d4fYsEglU3D00eoTeh_PcKD986hUNnxkt01qiCkZ90MC-wE6WID7FfETvpA4l4ECVJqvPSEL2fwTDlBVZw9eJ-uGSdaoYXWhPCSLY0wKe36GcgxYUtdzDvOlDkunt0bVrVyGEJcwwz_e0BICmUHMlDtI7JgJPjiDwxlm10DFbHXmXK9-W-oUycvIm8qCYNFzbzk0dhP08ZUuI9HTK1yZ4UVAHITN2P2xctIrWC2THdxs3qJxy_a5BVpjLayvaiypvBdZjAGqLSLKxAAGUsAbxJjwvy6AXaYywsCW2ms3MMLcEH-2V9TSd5idLbeJUAdvw5k0kuEGHS95h8ncbSItsAg88OBeFE9kJSLW65ekCkCmh4JKzh6quQk_WhT1Zosiy-wMFUdjx-kwCADjkQfo4Xx64l-cak4dikuonIgm7zGCh6asoxbey-eqYLZmBlfa6yjxXeNxX1dLVmbufNNKPC6aCg9fM9fnSmO','p=w2JgR8oZr6IU%3D3jJeRBx8_TqMKODKaSpA_eqZR1q9bNtsssU1yfodc1eDKseMMzXDNymoLyKjDQLg0KufwDiHw4rwbK3sgaFSX2N_ZwNDuDLkUVud44MhnmlRZWtnU8KwEkwBYd69IdHDsF99VtxZKpVcmCwk3WtAfUL_WutJ-O_z7jFByF0v2YXBwLbUxcAKmPtAaCmuR5eH51hd2_mq3aOmi7TcbsPTkmJZV3uT6xDKp-rgKSifA3DD8mNoAuzyY42SQTujDSS9ZGNnZJz2wCtt8gtgEGUdomAvBMWtYHgyUWbKOltZLVJrKR_5HsHZ2BB0e_FCU2RmW-UI4TCCuhiimJ_xnQ2yx8mFBlBH1LNMq7SHRLoAvBZS5yssRUCYhCd76wlI_V5MU6qz2uqzribAnhaf13MlqzNhmznLrjnuYjnHgwyro84-kP0fMnUw9RyAdd0ovXh-ei4voB6yv0eNT93BNBO_fuO2d-aqEpsI2UOPFnronoSk-tjSo-6HfG8_KLgJ5bIGgx4E5rRb3R6k4s0CTRfL7n2JiksULl2yRhWzgUCc41OnOAkoM0tOQ8TWO0HrO8r-gWWGL8_UPx1pCR-kv6vqrLD1RE3-uIAJYZkxwxKmnOiRCFti8ueKTrPejHhPfxEO9c3VfwEdULcsTmgSrrcooAR4T-7KmSjpgBLYRHkY9xTBcjsuug2jTT0IkO2upKSJxACtiqLzzyr-kQrdZdOXJQ0Wvcd29xqg8PVsoYOxnfQ9kMXS80V0QdB6IJ_oJhUPADz8GSOqTiIm_4Pfie_uT3HEP-C-zivIUwbfc9yts526zMU-thWpnpkolUTL1mH7k3x8CP8-xi5hLBfXMPmXek-QnZ5yt_1gZWpuxOSGTl3e9x9zDCgrSfPgg8tWr3O-vR1mPwYd4jAhhg4US2qBQTCtB5h7bTgBf54lxy6brkr4NLKyyDIZyk8LL-zgt2hvgxcN6WlsasSbzrkMK-3600zzSehwajC7x7PvACQFE57rrA8ZkNPiuutrRlPlXcg4mMB69yzF8SUkMrD-kODTl25h9rjphtD4ya3nrC9CJuBW8TxqEQDWRvSZ6MjJqsW53IdyIMl6GNc4WMO86DQGsoiELgeBbmwlmOAmDvrsaGP60i2Ad7OUJonMF5DC9ATNkQjZMhu0E2L1bBKLkTgSsdvOlzdfvvwCGPln23acwXBgyNUfdXGtkcGOIrZ6HGkatt7RsYfrTn_sCaZNEOlM9xPsjlU15coqFwY9Y1GH-jKrYXXFPuv3MSI5z5FF37PAHXtLFm1pdHduCiogoe9yk7dqb9RcCK2UmgQXxpK2EdT5Vciix37MOugOJwupak591WobzOG1F2apdvaF9I1ajKlP-PBNvRWzV-keKy5OR0fULojqcSDKLRSDrHFphlCtFMXHyVOCl8WSxXTQ2krEw2n9PoDr_MdRmZwx5QIKV_TSgL-P7eGNw25ZDVy3u4L8x3QMjCAU74LRv0InT_bGB4rbmFF00dRO','p=bYdVi_XPUOzA%3D7ioCfKCMWbJ5I58eSuM3lc9njhOZrSvb2XZgR5FHpHZjAGPgVVSPqgQkceB5RTG63NgAKuSzdJ33Z16r05WPtQ7ciuxUBB9To1c1NcFaxqMnAsLK0VDVKieRlnc1Qui07NSNkST29a4kVvQTXnbBuqZAFjqgSp71zQE9w5z4W7NL7O-AubLuqnJumbWQm-jaVQcconii1b6f4G1btborlxKzBadBj4FsSgx20W6zZjajmyJ9VsfwSAYYgAhDKeUpO-SRASfXjMe5Xe7RVOXkZAHyJ6eExrhaQoHO_xbeEzkxaMmf0eT9SjsViCaDy9AEmtBchiABdA1jMLQtO94AEnUCuUwqN7kbEjtRPzGyWwKRoNor-q0I1vVajhZ4vi8p_cBHBRXYwMz4KWsaT71PBFXxc2FFdFk4dKqOUdSLc1rN0yKgXCwYkQ2ZUzesD7D0DcVS6fMxlkbv4SCqf3nwAHj18eCI7IJvsznRBqRHTeENpSuvkfr5iMFAK-LV9AAkXiDSgqJB0WvzcBJ57toypGO7wQNa04JBAfmS0H4tfyKJSBA9f9GzyR5x7iS1aWlvJRJZlOnVBdJ-5ONu85OEjXJLGLK9JAgnWVAgDpQN9YldH08_fRHlgVVLgvQukvRvORbXBuI5VNzKV7LTDm7fKP_p9Zr3SNDve9HNSwtFMov6c2bKFHlZhJBc3Enxwd4lsDZSNn9cYm3E-Tkj9Fb0vBb0RhdNcR-l84uOSQRN6qqwWhUGjADY1Htlgef19feO4PgAfiftZgcjX-BJCCNpIBsy9Zy8krTFXLtwaBSe4cokMjN0xk4Rw-ojM3SNzmYDZx6pkOUTQhFj-C4-YXB_FIES29ZM_4imrWKt3GOgRc3XclXIRQAsldng9TDiafaJxoD4hcB3PBZK_HwH9Phal2VlztfJhKHulsBeSRXgqZ9JS51NKgPwLIpcu71wf4x0_zTLkja2jdZ0sc9nB-2hWx3GPanvCqK6t1Ha8d_mnrenU53jz16gB-v_VdSwybhkPKcugJmZNo0VRLvp6_Y5AuIJEJ0ByR-amU64S05F7eJ3antFgTNCmVVyCV3rS04V4F7M2wtRKBabSUnvcdGfXsDKWgUbSwbiOs3vy_0EMSXJASPkWTSNu7BjRDpV3r6nwwSAJMqFTLL5pZpp3S2enw3LItPAZsncZM7bcIWikFkDXZ70FdXDx94xgCv9pTnIbkxqCY0QiOL01LRvFLy_yUVMoKlt_A0HtDA4oDlNNZ437k2btzElMTtEQXVKweencrWlvhRdU5ltZQJvrsLZW57fQDdyjIytczGbHTnGrc48ZE9rDA8VY_ByUZA-nh-gQ6TAAwQR3meLu35EeGoU3X3CN7pRpN5WI5e7A7RhG46oWtfFElQrj-fKIgIHbJaVpPPmofitXTQk3Brrt5mU1M-s_ZHdajh-pDL-yavI5FjGPpzxtJJXC5nUNcSKcgFGJCgQwZqZ7Jt0nFrEa79vj3OOSlctCdXlvH','p=fUJybc31G2V0%3DUiVImOW0NxgHxY6TZ0me3WBplEX2kK6ARh3Wcs5Z6YN8CyEl_D54EwT96bYbNNifVtpS46KLLlSe5a7xVdmvSUBy4N1FDy98RripVSQqB9R3_7ohhzJTrDgY1auKD0jhEGKL1MN9tqHyslJQDTsnUScKCJiFWABUQO_u2ZulG7qPHeazxv5tLLb5ojQqYQu0ACjPat290fv1VQOijZlnSaDS0Fu7tOGsiqikshXhF7nM4c_KHl6iwsoROOyFsrc5Alk6sZBN7POIY_MvQHOxF90fWMJk4ntSsuBNlZuRUnAIpqeHKy2AtmWKbFG8imPEd3CoDM046CkUy9hUY9SxZzQ-Y62C3hCvPN-SojPg41DAEB4yah71v9qXjUzAPCrWJ0hbI6a1RTo7Zos9p233eHrBvT1Sw9V1EoPXt0aYEWLKYMklvjVjUs-RZ8HuFRxVpmlmkNF2cEUY8m2q-Eh52jyesgJhO7kBWUiPexUw-P14EuDHnElMjC30Vlrp1v82TR7CBDsZkVzJo9uoBjgT36r7VkXE9RzxHl1JfZRgAIb925JLgmiMmVYYxMJixDIYkAgO57yJRUtcCYwJUhdh_VIQ96tmsX4iqksU6KSu_KFxx3WYE9VbLVdr1ezWX-kFLEgdaTijq-bmHyyF_c8eJevsMMgXKm79PTQtKVlyE1OCWaMSkcCkR70DTuDzneGySYyaCtVAFlHl5YG5dRQdFG6AVAWsKB227HUdtPC6y1ZnrHSy3gMa5Z3trpI5LwqScA7zR8fqD7cLV2Ww56qPjVw8EX4Tx6W9EtLpkYazeOlsbIKQgcYvcxdGyHfQhlsd1BG1CBIU-IHgr8tP4fh3DS5e6IwNilKubCZs19zal0A0hZEQq-YNUSd-SRVlfcGaWY7LvID1gmiT2bFf9I3sXqxMWv_ub5BkLHDiEhoQD_7pOIeew0Vn1xpRW3OeCl7TClY2zmhy9UcA_QPBCvXkeyGgOj6jGFDcaCBfTVbNJD6WkWWST3UNGVBPslkNTKXAQrSNq1AOMmfb8YWRn_PYqvhx0soB39HmRKc8IZPMG5daLoB94-A2kSUrvHewXWfILlw96_f9ZGUYgZncsYwdpouDvbVF_wWMXImN2l2AiLTxJ8F_y5ZXOP8oLkcQLTwuwfPDIBeyiXcJx2Om4_hKRFS8hz1MZFJUVvMyCjwar0Mc82vAuLLV3F5qkKpCHykaAzn0DFn5NQ8o3-6kl5NwoD-8L4_MrRJDj1ki7Tr5wYNL2us_wSRYv-8ZxE7AXjgKE05OutbCM20MX_PSm__VFCSGJYZrgH4zpUAzov1c12s9sn5Xo2q_A_xcADnaVg1WugCZD3OK1deF_cGLGd5CNFB8IxCU8XZe_CmRLYj0Qaer4grwdslQNBbXc8IjJk8XxBo51kcph6BLteCvFuJbCgfpPJ_pB4tYFQiMqh0a0FJ2y004yfxfXQS5pLPa6R4DiBWSQI2rNw1jJKatKa5Dbh6oVOIri_2foS','p=JXU6PBNNsHKc%3DVtos3hc8_wX5_uHV_UwDzgWVCBYHDIjB3rtOd_5QuZ-rqas5h6Mus7dlfziTNR7LtPHmNKG_ZAC68_92_eBXxd9yfJ1XvNhehciOsBr_YlDUB-zJ7UfItuM5Zz-bKqPyFbOVgbl2e8YErmmrkjntS6pHdAD4yjG09mzlBHcNmSpE2mxN1Vt_unl7rqhOVRrdWf66XLB4N2qkwuARpW9UgHkbWpvFAhC1zvg4X0gpKSPXcHkMMUTiesticTPpbOLOfgD-4qKn61a9Wtkut17SFmh1y22JPcy8lRUrg9EwCDeBpzRZJJWmyKpp_Zk4DqB2EzhaKru1xGQTaA2008vZR6XU12KxjzHKl1Hlbgrg_6Q-1K5ILz8SbNCgFdZl6-nTEnXl1PkW5vZdGbU25SLnBKW7dzQYT31pRhRU8Oe0-moNnf6lgQlLvAtgfsL89ZexJpU5rhYAPZpzPEIHMvhcFlTB0DSdUsyQQZiQ9ov7NdEOzq3azKCf3JgpngNFuN_qgOjBXJI9VkiFSExbac59ZygjEGg2ASdaaxoGJPsP9ZXwNmdLobI5IzkykWyDkcBZZvb_dZLSX6rKinRH-bH27iqsWwQQSdvwv1w_8205ydlfArjtBg42lqjYbZekf744aWp73F5a07oeE4qQ3QhhTHlskozmpNASsgEY5ij_Cz4ZXESvB4P9-qqPjUb321AOKOMY8zyoN4TaMOyZwqc9srPvjhSgN08HNYbsibNGkVJdvlg1Few_1ldhsYS4gNWK6BM_1QzpP8dwVFqnrNyKz5dBGYPKJ0uXL_YoKETYCxO6ulD30JmvBbGwbEtxYICo_nMiiTbnxJmFJhMy5GEYtGmH9oFZdv9SiVGSCjQVjq_i9Cbg7hd7XVtjCIYf4vf4stDy1H12RFB7nW9Q1lRFtBIRV1uy2-PCpJErCrMLxA-LEGblM58fxU1GyCzABtuQLzC6MDxgLAwq4Jf-eZIjXb_XiiMwYeXDwOF6cxmerVuq97evulnS8g30OfdSeoIHHcFFDAzumADvrpfj41qr6a-BHBsonOgMS6PHldaemoXeRR587ddAtCbUcMfhB_U5HjOEA_ztcu_JddX3YvRO0lNAECzdNBxF9duvr2A4wzaghTWqYPww2gVdX_uKXVJsqJdi1mwqU8lFMX46orSDp7FkkryoBdJBpl5jWKIGWcP6vrC1tICihms5isoxBLbZVrcPJy5dpml7blm1kcFxUqtRYMFINrbWa-NMZWg-ZpRbtS0sQV5kiZGaV-7ml8DhVUFI78aNAaVta-E9l4RE1n3J1wsKqG8caQcOTyQ9xwxFXgYi8aDnrRMM2vFILhfFA4CbWAPKVFe1rxGSksMoC5tz8oRt9y1flBjuMWYVIzGDwXBjCtrXZgC4HqDJeghAYItFgAF_OYZFkLgnaWaU_kFzBlZZkUcm3x8IJ3dkr_5cYFA7nX5MOwrCfgYl5_wZF0Y2newf7mwA0TDq0XbXceVkZpC7jJkYp','p=3cTMBiVxDAfc%3DeYMRZIJw4FH0NtWEkgJs0ejE5zBStiMzs4YSlEKO0YxsOwFzAPNtXJ89cR1kRhq2Tun928bn_oL8Bs4tO3uNFcVz8cnYd6szgDw4URrEGaM9i21mXM-7nfAUTETihMoYJ6931FcAJ3YSqBEn7aXjoLvql7jEr3D7WbYfUeazx1PeIiNaQcHmxx_E3cXtv7G00LFrkNvNozyWqPg_NN84M4ExBPa6aR-Hm1XIfZVr16fz2x42q6kbuxsXM0chNaQk8c1bW6HBZ2y0lSaodHOARj6DZK6bJftU4nLwMLVDDQzmlmnfGUS-ZzBhiOw9_2E0J86yiUouPTYu5YWliIwkLs541kcbEdJVQ86QhZ94IwgpAmMfAW9iXeerLv7obMYpUUJPoQ2EboMIrCocZDknlCkh6BQlT-iQXMkSmbTQauX7yof-uhY7g2bn8ayE8I4_RLLoV616D0dbWytzMwnXLIAcKsUwb4e6mSh8aDAVHSj3wRz7wpSKsxfIpz-AsPgHPn-c0Qz1_iS8ji_VAjc6adsLh-ygScECwAGTizDmZYwZiGJlTzJlU8H2CO6eJSEZddGy_UpApR9JY9-myUvWn0gGbR1-6QMzbTg4lJeNCrp95nWKXY4DfL-1MvN0LwshBksBgjogpkkv-x68_3bnCKfurK06Po_bK1LlRMYgt9x-HAGqQUqCOv8-wBTjJv8UJdmOslCp2pINPNz7Cv9WVHQhzwRq5HBfSlLnbqu4LWZPmmiREt5dxQgMdtAUswz_8t5RBu55DV0GMWq5wVk5W9sl104q6LFk0K4dB6K1lTlH4PUnHjXBtxl987HkoNpYavRgsaPeCGIAMcUTu0luTUTWEvgQn_DWo_B5sFJnpIegcEOIW7-sIuKGdtscqbLnls3yGb1fMOCF-fxy3DJznDogS60L8uqtoIbTQdrpwo8Di4g-qteWTebm-_mY_xTdrUWFpIx3sR1YJ3n07oCOuQdyWJ3AaoiK68pkqlhxw8c1SgC2Yu38wl7YDElSQpeynp4elE1dq3eEx2CDvq1fgMqu785DAOzOMGaFf9iDEJESISbmMj5lASfXFnwRGUj3_UFkd6c3xNkr8G5Ja7MTH7SKCZ1FG5pGAHg-L4NvF2IwmdV04cyXXT9y30nxi225zLCYJkhTmzD2HWgeuzTLYjND8xSR5mNida1S9YApOvr6FjQ6NJQ559qaeoU7CSeFSL3BaEgqSWTWLQxVs3Bmqlu1I0G7vNFJDhujmp691ANSo9FiKC13FSwW_TmqdTh0fklyrqvfmGKnRec_wnIRTANARHXS_6vHP2Yg66FjecXa3tr4kgw2wRVUivUi5bL58pvygcflC6LaNVxlzqyPdFfw31lRjun47JNIMAuo6kcRrFXwYHKWfq88lDAQr2kuJuLNpSy_H4QWlXlL0n7MUTh_c64hNjObwP6DPELDGvZc2NFXL_ZCWzap_gH8FYTek42ABiX3L2TmNRiknXCBAs08kDNod0Jbt','p=tYFg4QJ5A6eY%3DVpUK7bR_CQ7W5CjZ3Hju8eEVgudtknCeATYWKtR1Q2tQJpa9rNzBMS6jdLvHNuc0VkROt442tEbhlh0h6fRqGO0WXAIwlD-SKvdJGF5jnQYXTivw0PJWXU6I3fZ_fzZYVeqFCDPAJ5AS65Y-5NtJBDK_9WnRPR9GGZTb30DeBpyhCoc3y0Cj8LK0SSKliJLZ1tu_1xhKmpFzOTH1GE5J1Cun4gRuI2JDdQcDijGo3X0tfWeBozc6fiGDOU2w7h9zFY0WxV19Jyp94WXuVxuu7yukhdCiIFV95kyiVPCXWcmWIW22nak_nzGZRKeNUL0Tk1MwJC79FImHJQq_hsLmzwxGg9o_vKeASFA0vHSdcSsyZDGrzzVKro1xaUT_k3lvFIfkZtT7HNevNDBmMCzZHSUE5m_F_iYXK0RmkJm6Xg49wPKsUdtWwk5WbuBKTLe5eHyHtwlYfB3U9OmbY6UIMJqVLfmx9Dc3-KZhb7ICwWg6GfIjx6FviR3fcA95h9kT2GFfDL3zan6IPrDJ2ha1EbHRdu0RBm1aVGD4de_3ZSGYRSstLseR76UkIHyVeGpR6b-upGGdNsaunicSrB9EC1YKv7qFEhcAW6CS5NxGMCX_HJUAW6OMMR-u20GN6nzXkGK64Uks81zPvlvd31Xiof2H-gOQR-2RlCxZVGJdrZMocxs50pg3CHTbsbQSZHgFYVbBP0dfjAxTcjMwIGtoBigHohQFG6uyh5cdfeRoYdKMwfW9FKdH89pxrQuNj8AHwrO7p4fR6T22I-JCNby8avYoTEjfr96g4U8sSlQsN6TH2bs4NWnZrwlFKTBQZWghzBfx16NDozzhL6rwDf7VDl0Y_QxrA5XZx9GDBzrcDbrQEnV-o0wTNKS9VcCPQR9jwPLY6yzJRgtVpMV64fyhgx1tq6g_yzKugjMuN4qonwStEyBaUWNidjEf-HlJPVyfneATE4Aq6kYs2V2dvYdIdXwGswa4IqlYTHL52UkfH0i8eVjkUBQXd5IdUsHFi0poi7wVgZTldI0NFgX0L-MHrL8axl3ZzMrgQyb2juBfsHMoO6hvyXhYrvsB9H4yMxEhUQz8AP-Ivo_9L3F-LFaihcm3KiCCrLcLFZ6Ban217bMfr1SWwIN3vBnAP-H3IGtFWlHuMBnfh2TF3kNSQ_c8I3vZpRHw_uo60DIv2BGJzq71ryzkgz8hi1WgWsdqK7_aURXXZqxkYOSXhCCnV9rOviyWQLBGmWG1ufVQOzVJDw31R3QYotACDOTSyTz026bOAaN_hK7P789c8VhRjurCCoRpPyLz9S5yJx7-1XlzCl33ns1ktxBaZVZsCV3pMtZjVrg7PVdFd47lBrJFjkdgxoK3fVEXc2B5L1bfD4Fxw_uCLcVr_Txh7IisSXPn3b8t5Wth_Rwafly9sn9I633E5ee9Mw0R1CMWLTn4unpFniLTtd7Y9pD_iwYiXWGIhLCDHwCBIQodSW_gFLaqbGs95ZOgwF8KR91h','p=jYFg4QJ5A6eY%3DVpUK7bR_CQ7W5CjZ3Hju8eEVgudtknCeATYWKtR1Q2tQJpa9rNzBMS6jdLvHNuc0VkROt442tEbhlh0h6fRqGO0WXAIwlD-SKvdJGF5jnQYXTivw0PJWXU6I3fZ_fzZYVeqFCDPAJ5AS65Y-5NtJBDK_9WnRPR9GGZTb30DeBpyhCoc3y0Cj8LK0SSKliJLZ1tu_1xhKmpFzOTH1GE5J1Cun4gRuI2JDdQcDijGo3X0tfWeBozc6fiGDOU2w7h9zFY0WxV19Jyp94WXuVxuu7yukhdCiIFV95kyiVPCXWcmWIW22nak_nzGZRKeNUL0Tk1MwJC79FImHJQq_hsLmzwxGg9o_vKeASFA0vHSdcSsyZDGrzzVKro1xaUT_k3lvFIfkZtT7HNevNDBmMCzZHSUE5m_F_iYXK0RmkJm6Xg49wPKsUdtWwk5WbuBKTLe5eHyHtwlYfB3U9OmbY6UIMJqVLfmx9Dc3-KZhb7ICwWg6GfIjx6FviR3fcA95h9kT2GFfDL3zan6IPrDJ2ha1EbHRdu0RBm1aVGD4de_3ZSGYRSstLseR76UkIHyVeGpR6b-upGGdNsaunicSrB9EC1YKv7qFEhcAW6CS5NxGMCX_HJUAW6OMMR-u20GN6nzXkGK64Uks81zPvlvd31Xiof2H-gOQR-2RlCxZVGJdrZMocxs50pg3CHTbsbQSZHgFYVbBP0dfjAxTcjMwIGtoBigHohQFG6uyh5cdfeRoYdKMwfW9FKdH8xrpA_-gzwITbz-66ogfY-niXXgXNG81FR6T5XhDGbTLODzEgXkjaGhWr0eOsxADUzDXwTs3-q7ovgyDcPeNLgUengqFbb2mcepGTkDiH4_H-rz4PpwQw8j-CjJL90Vl6woY3HIw0XSe-mq_vY172CXixtWDiCEt61Xv5kfVP7DO0gyklV9GigP8Z3DxM5e8S0RVyvBjuy6t9zxZzjrXHBX8PeqJnhu2-JJ8rGhd5sPVRPzlnnfEWS_wNmdmfhEu2iea6lVlOWGc6O8-qIImnEIAmlI9sSlt8cmq6KrqX4RK7cxBVqfsRYCG2yk1zaZG8XWvnc0p5fCf4uxZpsDWaT5rGAP2ffpqHz1tu6QX3_kee_wKWBmizyYI2SqVTpc7FMeMtG9DJiQepTITy0MovIyvj6RARvsOxdez25hRTbukLcjIphpmxcV2A7-niVsNWdQ6gSEEpiBWP2R-NGwxQdVuk9EQNge8V8VdJeQPSs7AEzWxT3eueI58EyT95QaLrYErRIIz8MVfQBBwFOl8FOTc6YH9v1lTy6TBcUjXxsGmKon-kI0A92YiQ4j9Jd0zt2UtdZH8PNY8kqDSd-Ukraa-ucs6dYvFAhXt9bVxXHggNVScFi5S0lKSQbipR8bKTfOMN77Pe5W_60Epha6017Zl18RprwwLbt1yMKBO-ztA8Kz7usda2LgbZpCTrneZ7oe0jOBAxXI89lE5PfUEW30wVbKUUGgcEQFT39vrp57G']
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
