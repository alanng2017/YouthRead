#!/usr/bin/env python3
# _*_ coding:utf-8 _*_

# 此脚本参考 https://github.com/Sunert/Scripts/blob/master/Task/youth.js

import traceback
import time
import random
import re
import json
import sys
import os
from util import send, requests_session
from datetime import datetime, timezone, timedelta

# YOUTH_HEADER 为对象, 其他参数为字符串，自动提现需要自己抓包
# 选择微信提现30元，立即兑换，在请求包中找到withdraw2的请求，拷贝请求body类型 p=****** 的字符串，放入下面对应参数即可
# 分享一篇文章，找到 put.json 的请求，拷贝请求体，放入对应参数
cookies1 = {
  'YOUTH_HEADER': {"Accept-Encoding": "gzip, deflate","Cookie":"sajssdk_2019_cross_new_user=1; sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2258339453%22%2C%22%24device_id%22%3A%2217b35a5bb882bc-09b67030f2b4a3-68491f2c-304128-17b35a5bb89320%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2217b35a5bb882bc-09b67030f2b4a3-68491f2c-304128-17b35a5bb89320%22%7D; Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1628695359; Hm_lpvt_268f0a31fc0d047e5253dd69ad3a4775=1628696233","Connection":"keep-alive","Referer":"https://kandian.youth.cn/n?timestamp=1628696715&signature=M4o0Aw5xKl6zBEaXnRZDLrD8pT6V7ORZpdmjWQDgY3rey2ON89&native=1&device_type=android&app_version=2.7.3&from=home&access=WIFI&androidid=e0279b90623c713d&app-version=2.7.3&app_version=2.7.3&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c4015&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl7B1sayyt4VqhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDNm2uGjIbfr8_IapqGcXY&cookie_id=85dc8303a71825fe94b8ed8dccca8c9c&device_brand=HUAWEI&device_id=54863500&device_model=NOH-AN00&device_platform=android&device_type=android&imei=UNKNOWN&inner_version=202012072030&mi=0&oaid=285823e3-8ee9-4305-a013-728749e06286&openudid=e0279b90623c713d&os_api=29&os_version=NOH-AN00+2.0.0.138%28C00E130R6P2%29&request_time=1628696751&resolution=1152x2268&sim=1&sm_device_id=202105072257220ba576345c450ae417836c38c7139ede014c690f433a2608&subv=1.2.2&szlm_ddid=DumZMHqxjYhWRQ5KsRzloITIsaFMRWU%2FSvFc7xqqdsxcVGWT928Alz6gBxIiE6FmCi4vQBMDWOhMPziJyDFrLutg&uid=58339453&version_code=55&version_name=%E4%B8%AD%E9%9D%92%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl7B1sayyt4VqhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDNm2uGjIbfr8_IapqGcXY&zqkey_id=85dc8303a71825fe94b8ed8dccca8c9c&islogin=1&fontSize=18&exp_id=ali_rec&strategy_id=&retrieve_id=art_high_click_new&log_id=583394531628696714961726&h=2268","Accept":"application/json","Host":"kandian.youth.cn","User-Agent":"Mozilla/5.0 (Linux; Android 10; NOH-AN00 Build/HUAWEINOH-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36","Accept-Language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7","X-Requested-With":"XMLHttpRequest"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEzH6qInybB7eqmSYFqaQod4-l-9NIixVjS-dQTYzUTBLx350GYlLRFIoPIUc1HVNc7W03KJnBxSzrF5bTCTTi1GEL-m0SigRv9Fg-VpLFkhbRIOhCNIWkzO1c6DqjKbq8N5q4IuKeJYFCeSGY2kxpfN1ONLOcYxBsvX5ga-bgJmmRhZzCjZNRzkDbPBiVs53qIMBKS0OLrqgPl2KQkPXCA7LIFipvHaMsNEDBPnnXUCtCDmWNwHsjRuKZ9vN5zPW2eZvgzHIdLIYEDQ7PLdUOWn4DZt6PrcPeEmVT2BbqEFPJkcEsYgTlDn5gcEdb6kVkuBBiQ7uEQnRTSb6SrJ-083FwWQYYrKFMdWBg27VpHlair9Iutcq4NCjWGeMfk7T5CTOQTW7xAElCv7tQ63iYoT0oVcOz2hbJmf7QCvPqnKuU3ioRUDVReCcskTfbu3xrGVu6tP2hSgPFp03WFbKWCKFSzJDf6GQ-WwJt2ZxkTJRwpPGNAlY3iz--oETu_uwEdZAwFyzZxq3OCKZkT-89vzAJTz6QnQkcQRfxZwhH1EsKGrb7oeICYIT3t84wYMmdvuotKVbLQTk1t3V4nV0X-o',
  'YOUTH_REDBODY': 'p=NYdVi_XPUOzA%3D7ioCfKCMWbJ5I58eSuM3lc9njhOZrSvb2XZgR5FHpHZjAGPgVVSPqgQkceB5RTG63NgAKuSzdJ3v5rOu5vSJ0nE77V8WgE0RqQvnkn5nVc9MxIVdXrelLRz7WeAjcVjKW5KIvgFQ0owmMCLIUm97sStHvLY6ZCjf27UMEr_cz9nXHzZZmkGW7nzMcPVHdqIV7lukoSweLm_xqvNxsCAGV41udxUidkLhqKHX9ZGbjrv8rbLr6mM5MQWzlxaaQY4v9d4gn08B8WYaX0Yn0pnGnDbSp91CAtdo1_C5XjGfeF-cXuaqhL484xwnu01M6Wh8BAvVFhutoaf5xBKSK95cxwU385XdyT8t11X9UVnGgh2S4xwIZ9OA1Z0HXWhWkubw3cFTcCB3batk7VRKrYmhA6Qix96yOzNQqcfj4sn5uevgWtwLZ8S-_NZcMWnMW21jF6I0217jC4ManNdAruiK6OJygdNpXjR7qKqF4-CfLJ_gvRjLeof0t51fWU2MOKd5bW0ssB4hyxZR1vkZoiIjj9NtPhPEeMUPP5NWnxaPmvrdAzrl-KIOWoPbIaywq186nA40e-EXoytF5McoWbWFoAVFLqJEX95KikLAYhFJmmjSFlmQL-BFLV3tNPtqNLSe8wbRa7DVfNaZHBaIAhDpdpa211oxl1xUG7Mdhf_bM4TTL_aGYnS4iKJYWuK6AYbnqaNtx8noR83MpokvFOkqCj47cIwDf4IR8hOIcPAmhT-Yf4IznYWXojhgtrLKPKrZRn_5tDGzBHi7T481uVV1wvsOs9rP6bqcWn5xLLNZr3lPgdYb0Oene5KGxZU_go8Dw1uhVKibOuNanX5N_GOqTx1IKeeJ4DjL2hlBkC0TDvI0qJIO2QKBLpPlye7fd3SOh8KVARwnjCp_9sryhpNOyX9pKPFeIjbyQDEQyIHpon0QD0_LcJRboLcWYVW2MyXVWVy0TVvoikSkEfbq6P8D1HBmVt2dp9Ie0lWhsoWFJunnpc49agQxIJvEevR-N4BRqXBoaxmwZQRTYMAvSRCwC1K07RTrSFq3sBLNrUaKvwnRaAaYCLXvKFCH5JH3hH03HAp5deqnuwRGjFFgZ67KVklUnHod-5yLb26FGMEgUutxH-IoaYE9RGdj_ujIm447AHgXSJMgBxEHJWAtA-e4XT300C9p3E-zmkYnO_89W5L5Vfi5zv19lqb4q8ZdD379byS65PuuEwPO3VfiA3Vr3n4hcuLE3rQ_oIBGC2CmooA9dSI9q5hdbDtITaU7N3eCNp54orhiM-a8gKRGQhqday69mTLhH5BE9wVH6H0YBViXrSvp3fscL6ygWyiTJgbCSGLnw9pG73JTQK4TLUcXHKInsJsny-QQsCaH7qoMc-w11h-oZGO6AempjsvzYQNnw0oR0ja4VH3a8YHc0Qkv2Wo5t0MB3g4lFe3rUkRgLAg%3DOk',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgSx6DiFibMwsGTXKR7DDntBZFRhVSC3Kfxt3D31wrCrhqPMuWVLWgWqDMmTjogJrSYUPYs_9U0I8gTxEMOE_0AUNDMhNTt0TVBX-QT4Xo0gRLpdSUx1dWUsCadVlsL-UAfpyCbcTwnXAy3NBI6TWkY19eOaiywejom0WhalKelPLD3R2U-bS9Bai_vyepdyPuUerPn5-4qHBO3Rft4rT6EH_ESv1d48-5PgTGse02wmPI5EGRaUK0y-njnTxcbXVCMqPku6-IN0yB6Mbt9wXk6inhcIJ2T-Qb4inkqCMFVc8oQptvD33O1D4Meel_PTI5X2JsH7Rtk6Q%3D',
  'YOUTH_WITHDRAWBODY': 'p=QcTMBiVxDAfc%3DeYMRZIJw4FH0NtWEkgJs0ejE5zBStiMzs4YSlEKO0YxsOwFzAPNtXJ89cR1kRhq2Tun928bn_oLXMnhieaGYJmfLy9ydgLgt5sMtLTB-EziOe_nR36IO8EZlY0NATy-CDjCJthXGjCTpKAlPhHEuLJ8a4a-6v1gm1J5XQg5UGUqygppleV1ES8gOyXhOD1AQrrjHZzs1WVotMaHnRdMzDiH3fPW_UF4jnoyj3NlVmDGLG8rMzPwel3sjxMuBNCZYnYy_iOvXo8MAT-6meQf0IoPBp7pJD0wqs61-9fsui46ZPKSGYguDITMQBpLVQGgtiQS8ifUv4zO56wwM4xmnQXYYkQsPSEu_AfOLQfdarmksX78nLcQUTAUBXYvAaVcRCnYv68PzVuDh4QWQNgWkwzWRtotHRtBT2eqgwITZIrHkvc94zJrk9dg1qIlqwYKx9PXPW0U7ul7jCTFYfPWJQIk_NxyLZRV0115ImeCBM5YamV-_BabZ8zkCknAHgQL6nV7_aUi60vlcOqACCJ4FoDWP4-cdg8Fp3-ICycHHWH1iqu0iPVh7EYODiiRCIZFlZwMLWKEIkevMSvSmTszw05JxRUYQ7tNnMwZmXez-wgbgzwi0qqkpWZpSzz6xJIyS6O_8nUrSFICA34l4HcNLYzeQ3zfh2z9x6UpqA2cgW6XTz84Y_QiuAtK0LjDdLAr_5Ex3cfyXCg6eTeMy5VS72MPBeVTjXYuqF1tM4mtBAiNHTUp3A9VEx6qvh-oNpdlA42HCXLlGxVP7xY8sAzI1c6frjxAVaLTl8UtYVKU7bOl76oJyTml6BIinaBjFv7jsXovoSHJHXhXcpjBvFuQB-1k8sjIMY1KUOHi4DZJcZcCPJmNL_WRkGO-PGtaWypusORC02-ziDzzXasxOuxN8yFem2FxykxHyzovDLvGBqv4k0RcaGGUS_TtJeLnGqmvj_G31dx09wY2R7WaZorvTm91vX7pCRaKnQ-nnxEwjxdiL_opIY93oKYwtSfjO_Dbv4H0g9vFFET5PizA6Z_6E7tJWQordARG66eWiBx1LPNEDcxX-y0yGxnEEak4pIsVXkDcfRcZlgYLUTB1gnn_Cq8t-N83RVuzOLeBxhJXewQybJwnfJBJl3Whhi8ITUw6s_BixZ8Ho32r7suefiJj5x2jJG10FLoQcGEWqZZcd8-KpAwEpE9XXhRD4QssthRamEYF_GnIkfVaPJGBa6bHK9fVnutxfH3bDV3CoE6neSbQsXwW_-hq_eFSRjyVedHMKFt8wECCt_ew_K1Lm1C_LIkQKM38PpLGWNQwWytWyOrUcZopvAcXn9sHB7JUPmceykxS-yyf-HPwdjURjU2LVN7BWQ7I9WrqjuY1rLFf5UDxaENQMiIgc_rRL06DfV5B7hQJwk0Q1zSV6Wy5wlMAS_5wEvjngcilngyiGtWLGHmEqzmmo8Df-ujWQHMUXlNcb811O-c4ZZmMPBOxxebAV0IqxWq1FoyvoYleyRBmIK7s%3DS',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.3.1&article_id=39154980&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.3.1&device_brand=iphone&device_id=54871759&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=6a5c87c5d49b700598897ad83e7b1c36&os_version=14.4.1&phone_code=6a5c87c5d49b700598897ad83e7b1c36&phone_network=WIFI&platform=3&request_time=1628743630&resolution=750x1334&sign=721117d94485472264e49d1ab60549d2&sm_device_id=20210812110422828d6fef2105b5e28bfabf0448f767e001db206e2dfc80e8&szlm_ddid=D2dqvAI4ckkY4DFL7GsmlW7VV8s0hO9kp6457KnGsBs2IX05&time=1628743631&uid=58339453&uuid=6a5c87c5d49b700598897ad83e7b1c36',
  'YOUTH_STARTBODY':'access=WIFI&app_version=2.3.1&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.3.1&device_brand=iphone&device_id=54871759&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=6a5c87c5d49b700598897ad83e7b1c36&os_version=14.4.1&phone_code=6a5c87c5d49b700598897ad83e7b1c36&phone_network=WIFI&platform=3&request_time=1628744866&resolution=750x1334&sm_device_id=20210812110422828d6fef2105b5e28bfabf0448f767e001db206e2dfc80e8&szlm_ddid=D2dqvAI4ckkY4DFL7GsmlW7VV8s0hO9kp6457KnGsBs2IX05&time=1628744867&token=9e3a2babfd5664180e4f0cfee5be16b6&uid=58339453&uuid=6a5c87c5d49b700598897ad83e7b1c36'
}
cookies2 = {}

COOKIELIST = [cookies1,]  # 多账号准备

# ac读取环境变量
if "YOUTH_HEADER1" in os.environ:
  COOKIELIST = []
  for i in range(5):
    headerVar = f'YOUTH_HEADER{str(i+1)}'
    readBodyVar = f'YOUTH_READBODY{str(i+1)}'
    redBodyVar = f'YOUTH_REDBODY{str(i+1)}'
    readTimeBodyVar = f'YOUTH_READTIMEBODY{str(i+1)}'
    withdrawBodyVar = f'YOUTH_WITHDRAWBODY{str(i+1)}'
    shareBodyVar = f'YOUTH_SHAREBODY{str(i+1)}'
    startBodyVar = f'YOUTH_STARTBODY{str(i+1)}'
    if headerVar in os.environ and os.environ[headerVar] and readBodyVar in os.environ and os.environ[readBodyVar] and redBodyVar in os.environ and os.environ[redBodyVar] and readTimeBodyVar in os.environ and os.environ[readTimeBodyVar]:
      globals()['cookies'+str(i + 1)]["YOUTH_HEADER"] = json.loads(os.environ[headerVar])
      globals()['cookies'+str(i + 1)]["YOUTH_READBODY"] = os.environ[readBodyVar]
      globals()['cookies'+str(i + 1)]["YOUTH_REDBODY"] = os.environ[redBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_READTIMEBODY"] = os.environ[readTimeBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_WITHDRAWBODY"] = os.environ[withdrawBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_SHAREBODY"] = os.environ[shareBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_STARTBODY"] = os.environ[startBodyVar]
      COOKIELIST.append(globals()['cookies'+str(i + 1)])
  print(COOKIELIST)

cur_path = os.path.abspath(os.path.dirname(__file__))
root_path = os.path.split(cur_path)[0]
sys.path.append(root_path)
YOUTH_HOST = "https://kd.youth.cn/WebApi/"

def get_standard_time():
  """
  获取utc时间和北京时间
  :return:
  """
  # <class 'datetime.datetime'>
  utc_datetime = datetime.utcnow().replace(tzinfo=timezone.utc)  # utc时间
  beijing_datetime = utc_datetime.astimezone(timezone(timedelta(hours=8)))  # 北京时间
  return beijing_datetime

def pretty_dict(dict):
    """
    格式化输出 json 或者 dict 格式的变量
    :param dict:
    :return:
    """
    return print(json.dumps(dict, indent=4, ensure_ascii=False))

def sign(headers):
  """
  签到
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/TaskCenter/sign'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('签到')
    print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def signInfo(headers):
  """
  签到详情
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/TaskCenter/getSign'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('签到详情')
    print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def punchCard(headers):
  """
  打卡报名
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/signUp'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('打卡报名')
    print(response)
    if response['code'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def doCard(headers):
  """
  早起打卡
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/doCard'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('早起打卡')
    print(response)
    if response['code'] == 1:
      shareCard(headers=headers)
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def shareCard(headers):
  """
  打卡分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  startUrl = f'{YOUTH_HOST}PunchCard/shareStart'
  endUrl = f'{YOUTH_HOST}PunchCard/shareEnd'
  try:
    response = requests_session().post(url=startUrl, headers=headers, timeout=30).json()
    print('打卡分享')
    print(response)
    if response['code'] == 1:
      time.sleep(0.3)
      responseEnd = requests_session().post(url=endUrl, headers=headers, timeout=30).json()
      if responseEnd['code'] == 1:
        return responseEnd
    else:
      return
  except:
    print(traceback.format_exc())
    return

def luckDraw(headers):
  """
  打卡分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/luckdraw'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('七日签到')
    print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def timePacket(headers):
  """
  计时红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}TimePacket/getReward'
  try:
    response = requests_session().post(url=url, data=f'{headers["Referer"].split("?")[1]}', headers=headers, timeout=30).json()
    print('计时红包')
    print(response)
    return
  except:
    print(traceback.format_exc())
    return

def watchWelfareVideo(headers):
  """
  观看福利视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}NewTaskIos/recordNum?{headers["Referer"].split("?")[1]}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('观看福利视频')
    print(response)
    return
  except:
    print(traceback.format_exc())
    return

def shareArticle(headers, body):
  """
  分享文章
  :param headers:
  :return:
  """
  url = 'https://ios.baertt.com/v2/article/share/put.json'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('分享文章')
    print(response)
    return
  except:
    print(traceback.format_exc())
    return

def threeShare(headers, action):
  """
  三餐分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareNew/execExtractTask'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  body = f'{headers["Referer"].split("?")[1]}&action={action}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('三餐分享')
    print(response)
    return
  except:
    print(traceback.format_exc())
    return

def openBox(headers):
  """
  开启宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}invite/openHourRed'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('开启宝箱')
    print(response)
    if response['code'] == 1:
      share_box_res = shareBox(headers=headers)
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def shareBox(headers):
  """
  宝箱分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}invite/shareEnd'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('宝箱分享')
    print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def friendList(headers):
  """
  好友列表
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareSignNew/getFriendActiveList'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('好友列表')
    print(response)
    if response['error_code'] == '0':
      if len(response['data']['active_list']) > 0:
        for friend in response['data']['active_list']:
          if friend['button'] == 1:
            time.sleep(1)
            friendSign(headers=headers, uid=friend['uid'])
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def friendSign(headers, uid):
  """
  好友签到
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareSignNew/sendScoreV2?friend_uid={uid}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('好友签到')
    print(response)
    if response['error_code'] == '0':
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def sendTwentyScore(headers, action):
  """
  每日任务
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}NewTaskIos/sendTwentyScore?{headers["Referer"].split("?")[1]}&action={action}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print(f'每日任务 {action}')
    print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def watchAdVideo(headers):
  """
  看广告视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/taskCenter/getAdVideoReward'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  try:
    response = requests_session().post(url=url, data="type=taskCenter", headers=headers, timeout=30).json()
    print('看广告视频')
    print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def watchGameVideo(body):
  """
  激励视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/Game/GameVideoReward.json'
  headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('激励视频')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def visitReward(body):
  """
  回访奖励
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/mission/msgRed.json'
  headers = {
    'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('回访奖励')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def articleRed(body):
  """
  惊喜红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kandian.youth.cn/v5/article/red_packet_188.json'
  headers = {
    'User-Agent': 'okhttp/3.12.2',
    'Content-Type': 'application/x-www-form-urlencoded',
    'device-platform': 'android'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('惊喜红包')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def readTime(body):
  """
  阅读时长
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/user/stay.json'
  headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('阅读时长')
    print(response)
    if response['error_code'] == '0':
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def rotary(headers, body):
  """
  转盘任务
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/turnRotary?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘任务')
    print(response)
    return response
  except:
    print(traceback.format_exc())
    return

def rotaryChestReward(headers, body):
  """
  转盘宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/getData?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘宝箱')
    print(response)
    if response['status'] == 1:
      i = 0
      while (i <= 3):
        chest = response['data']['chestOpen'][i]
        if response['data']['opened'] >= int(chest['times']) and chest['received'] != 1:
          time.sleep(1)
          runRotary(headers=headers, body=f'{body}&num={i+1}')
        i += 1
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def runRotary(headers, body):
  """
  转盘宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/chestReward?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('领取宝箱')
    print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def doubleRotary(headers, body):
  """
  转盘双倍
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/toTurnDouble?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘双倍')
    print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def incomeStat(headers):
  """
  收益统计
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'https://kd.youth.cn/wap/user/balance?{headers["Referer"].split("?")[1]}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=50).json()
    print('收益统计')
    print(response)
    if response['status'] == 0:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def withdraw(body):
  """
  自动提现
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kandian.youth.cn/v5/wechat/withdraw2.json'
  headers = {
    'User-Agent': 'okhttp/3.12.2',
    'Content-Type': 'application/x-www-form-urlencoded',    
    'device-platform': 'android'    
  }

  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('自动提现')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def bereadRed(headers):
  """
  时段红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}Task/receiveBereadRed'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('时段红包')
    print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def startApp(headers, body):
  """
  启动App
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v6/count/start.json'
  headers = {
    'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('启动App')
    print(response)
    if response['success'] == True:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def BoxReward(headers):
  """
  看看赚宝箱
  :param headers:
  :return:
  """
  for i in range(3):
    print(i)
    time.sleep(0.3)
    url = f'{YOUTH_HOST}Nameless/getBoxReward?{headers["Referer"].split("?")[1]}&id={i}'
    try:
      response = requests_session().get(url=url, headers=headers, timeout=30).json()
      print('看看赚宝箱')
      print(response)      
    except:
      print(traceback.format_exc())
      return

def HourReward():
  """
  每小时宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kandian.youth.cn/v5/CommonReward/toGetReward.json'
  headers = {
    'User-Agent': 'okhttp/3.12.2',
    'Content-Type': 'application/x-www-form-urlencoded',    
    'device-platform': 'android'
    }
  body = 'p=WFbVGOYyXwIo%3DPJZSHj2C1addkaLjdXJMlQmpx8pR8W45Fs-niU9Q56uMZo8lcRsDLyn6rgaMVuvsjgeCVLX33m13qRN35lfYeOgU2ljxPJ9nJEz_N8_8qSSp8gswQQpt_cwwjQxlzFclM8BYc9Y9m9T_MPQ0LrnsLVZM2wvFUqaQDdAG41FnFqPpSU3j8c53NVS20p_q8r_s8XDPXgyJc7DUZWgMVlLCyOBQFnsfZNJTmWeoPb9SoodIA8JoCu6Mkp5jMY4oIdQXe4hc7vPVZd-gc4kXs3GD94UMrlBAzrXd5aq5q8XkEPzxg28LSwhPY5tZACOSrG1hQ_EBcokdYHixfRV1d-It-yDSs-MSlbjvcfBliiRMzRA5nc87H0xBUML0dSOCwnPNma0aqiWQR6DnGEq2ybfXKA9Id7LEHjfU1stwHyYv36tqiIh720BoSBv-KaGz8X8lNsq0CGn2A2YlcPHtHGfH7vPhflT1Fy5vEOYUWx2wf5wsupCtCy59dDlASspZxgzaqDtC274oGNQpcd_WZmJ65MxOoD3_HNMJlZHAd21_T9NvDgumseU9Z6_sho384ot96SsShz6_kAb_UC8ruxQdSsX8s9mzrfCWAav7y7OWWks4VWKnhcqMtWvM55Dh1Ld-QDSCmga96Wn7p2v-NSU6sMlDG7bkSi-KZyCpJ98iWb2GDxZ7TbQ9y4C8IYiRGPuiAXi8b2qd1DSC52ZZrTO5tOuUxXJUsNRGvOMvu2DQTpxUw7jvF2uW5T1u0BYcTyw9h49N2dlAxXQAGaHrx99MshyTF2UUPc6L2tuAMmm4W49WkKVves8nPs2Mm_mFmuOsffXWqhclZBR9gabaFZ6oEiesuFk1trdLsFSCaP1PBgLgtGiNwaiRtGH0ER-ncmW0RxcC_f2wyoE1aTIgpvp-1TBtVAJwUCvMWbLFVzk3VT7pw1OwcHiI18ORbr5nIC0NztVz2RV6hiLvCV436t-E_Fiz0Csnh_jNrHjziW391hO-hoJZBlJQPREmiQC1VxmQ4F_wcDjDjOgKcvbC0FAS7rTzrmAntQjM6DBdnnr0KIJbZDM2e1XQd2wrqdJ0f5Z6r3ryk3Pc9zB0gtmGZZC2cCSsc--Chd8DKahKS6QQy8dSz89KySSvdm1XeBjlhXvLbq3CZm1xv3EQzyD8vCyO3Mgq-zgoCklHZJCbN9drOkNl-_aHYC2dLdNNaDvogKgBgtpVlBv0KFvCDNE_ZKVo0zED-0fKVZvLtm5SEoRR-PPye9xTISMIp7gnAF5rLRFtXt40Gu-I2bkA2sJgQ5ap7nbpg6JHynQl2hAh63xjuaMuSRl5otOrMVC1gXDeRytnza_rDmJgIVIf8vecAxLV5vAxW-Ui-6c3mQrHgGcRWD8tOs3pG0GRaFwOrpFt_nH8IZWgXS40h5C181dNBHfnNX6ZcvkKQVPEqVOgaF7-7HtwoGQP-h6gV8CdjHJMvrG8DQAItyTJtBO8KeyzvmjFliiUDVfCJwN9z'
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('每小时宝箱')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return


def Reward500():
  """
  500宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kandian.youth.cn/v5/CommonReward/toGetReward.json'
  headers = {
    'User-Agent': 'okhttp/3.12.2',
    'Content-Type': 'application/x-www-form-urlencoded',    
    'device-platform': 'android'
    }
  body = 'p=zUJybc31G2V0%3DXINg0tz6Lmb7HFHo3zXtVKoyaorn2gjAgTZy_ayjJlEV70b21JLNPj-ucmLp6iqj9LX5VYGj8wSJTfz3ndgOXjjdRulI1vew2pRjv7rG1GeD88nHe_rxaJJYLEu1eReVkuxcmBz2Knpe-EzsGg12ll6DW3Y2U4Q0XKwIgXpPTISmqIEBo1p78f18ctQ2bUeXM0KJE3kF7_MLDWmJqn5EZ0LBvuEd6_vFxHLiuedCYyfJAZdKX0_JeKYQej4NB2aoy5OKC67Y2umsTuRaXKecVV8dXDFaeeKb3LgSryYkap6HUGewS7R7LREPxrGrbtxvddUCVFccIvo5hXMISdOe5SHdDQ2RecvqEsxylWmnz5cV9RxXVFr7752e35_e1swL3JE-Sb5apa5acQ8k89piDtmjBslrl-QYNevSi8Vuf1JEElvO1JsQAak7yAx_lxNlJC_gK5FXjJjJOnUXGTKmJBQR6M3rkMeJiKleH17aFy3FMX92bELwgFxz78p-9M_OheIRyxmf7W3-QdaTLZYxwKdEGlWZvcd-uZ65RDjx2Av8CLZxBZvLL834WPgjWsqPaBr6fIz8TGhPFRQ9b0jXwb4ooVN4S5dgyCvFPViO2GpOyXavBrrwkQAsfa9Oh2ybzKYs8xzhD82Vuryd-tn2BMX-xUXN8KZYLDKVPJqUTtqB-dp52Mp_42Qx69pVmaLSOrfN9WExMGcoggvoeaIB_0Xx7cMkS4wT5WebNRynFisaUrcKJHX9XceMGPJx14bKtrPLqNDOmnc9xpVu54612YeiHsnQAVQagELc1rUg-FEvRBZmn725xgMjPnNznN0fHAXbnWrKgut0fpLr-zkCxIMCE9DAp3oWW03nKQVPQV77uIC1gWvDwrL6W42gGTsQSl6JBFmzPN9ku5_BDzCSzbV9sHwlLo6LDv0E3V0_eVH9j9ydhB-gfe4vEe5uObsTZB5nv_WG-orxe66APwlPHUKk2YzD0Aeva2rcgmocv6B0cDDK8-lQS4A5po9QJGixocJWRq0yUHT8AW7HvHELvTYcywQvEnwQjGkWa6O5MGGrddZGXrouDI7grK8rcLAuZIkKAKuOsBqNBP14QmlAdx7fZeRznuoUImdk-xcb-h64yYe0k05DDL7eq8VIIG2Tzv1YWrDpaitKJTn40bqP8RjaOoV1SE_Ik_TADcU_44HRKu5AOE2nDUdbN01-reeu_RaBEMlqUwC-570ojZM2R61OxtBCpVgefApbMbN6pRMigZSYADYCXamp8x2YzYSmWyuXHFUGoq1pKEuHSfb_8dGBjN_duiyc2iUOZIDTuwWie0_8VcNCicUjX4tdewo5P0e2Z8wB_2KKbMb-yikJoEzJcmPqM4ogNwpeSpX5d7kT66iOUDUQPMoE54_Bb8oUhlikK4eyZcYOfHUwynWZ2SKlxbY8kgHWBoBZ6H2vN87yTAJ9WFeO4IhORVYyKcDFkBa_poLEu0j3JKIK-NYFeK4Wr4kcwbY214Zi4V1wPbw%3DX6'
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('500宝箱')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def Reward188():
  """
  188宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kandian.youth.cn/v5/CommonReward/toGetReward.json'
  headers = {
    'User-Agent': 'okhttp/3.12.2',
    'Content-Type': 'application/x-www-form-urlencoded',    
    'device-platform': 'android'
    }
  body = 'p=qXPkPrW1Kghg%3DkTqmBCfm4ulIWdd7gfmMtvSn_iwOPi6kvzxVXtIW3kfVaN0ktEDE1MXlHDBOoBMj6vyhg_ZVaTih8vZPVb6Z8_Ld2aUbhdiQtsB_rwqZ0MJSeL8Z1LADDjYWAwu1qItHGwspM2qKWdLsyDaoXfy-eINIH0Y_g_xrEm-eEUpNF2qj3of4VR_X4BsRmb731DNJLaC6nizUoBg3YPRRLNSFmPN9q6ouKI_A2AkzK2qcFGDREH8UaZieeaeqj2GFZpOOyNpXnFHUvSuW7CS5X8rJFrufTp4hky7jFeiQ-H5V11wDlfYjbIZpHOSnHiN8LgAep03pxeYlmxkP4_jFapQ8nmP13K_mft9tqgUsVUgw5iSn2CrVljhC5Kykxqy1YPRwJY_KzcGm8yxNsFbWeHfA_MU91yOq4720f-zLolUJeovFKG6cRqKe9GNMWpo0mKgTGAc-su2lB_ujjdvxz_GIpDecaJMQvwk3tQ3f3BIBxL2Y8qTMWZWwePzX-FV_0eU2NUY_LGvjmPC373t25xxTJuv6Ejf4xQDNgUlUyY-NDb_He1fGC6FU2ATkOo8Hnq90yeIXGNqFfVoxkDf9BTYZAzMkCVUCJxil5bH9hKAPNsA-1VGffk90x89h_0K3-5UXhyvsldhtkGQh2e3_KDpcj4hlzy45L2e06J-u__IFlL9dd5JErG9JmpMb4BPRTCfI4CclzlbCX75U33pV6WwyFa-GTJqIDYDjKcOpaZdcXBMu8AyGuCQaJGJcLnTUN8iysye2fe72vPMrcIkGFQ_lMbAoM9r3rXZBtsvcgP8s6GwMGYkoFw9vFjsozZmKWUJj4I-FBmVCMg3j37KX3BduMe1NDc4egz6be1inzuW39uOwa82pU5ovqdnQtD5ZCofkbURufliSmRAFwVQzt4zNakBiQj0v1LMdaajPyDP1bG2J54_mKGYlKLWtZ9rimyMZuTMI_ZfuhN1eV6TH4lRhp4XSNQ5wV2hoDjDWU1KQrFEzcZtAsNYucgdB-dZoA-DvNDnc1G7thpS-5D_P-XgPHsJhMeyFvCXfouGYCcR6W4iTXhjU77Oo_leK020rJn_bdHQyAIu-dD7J-xa27qW66ebveCOEwQl-OdyNRFOCfA4SPXEM_9q08uV1AaFIKWoMt40fdHhJsZGu5e1hlpat1lUVOXUjjhPJrtxA0FWklvLEIIfXjl-vKOPbNboT5bgBCb3lqComAIWnZYdMaj8_D0BhhAv4ZK0_hbCJb39j1SUrMmgKIglP7I4eKhRDP7mG1vUfJF-6bkaP_W1eT15sIz2Nfzw4cC5uS2yFqb-7_7hngtMpdQnXQyGB_f_NKu8KZPRWH9cpi5g4T0k1hP-bslC3R3RT0CfqaGFEdSbvLsFKJf1iur8FbKHDPffnYUBjH99tANwWXTCHIJJtAGi4Yhv40-G63T-pEBkfijBTIoYxULVppi7zd_HIdKvSgq97XlF7dJPJDY9tqQVuQ2a62obSTZ_lpdb9'
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('188宝箱')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def Reward288():
  """
  288宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kandian.youth.cn/v5/CommonReward/toGetReward.json'
  headers = {
    'User-Agent': 'okhttp/3.12.2',
    'Content-Type': 'application/x-www-form-urlencoded',    
    'device-platform': 'android'
    }
  body = 'p=2CWwRj3eGxCw%3DuHflGrFd-b1kc-NE9EQnVhkbC_q6C4_7SA1JGtjg6TjiqaVXdX8d24UaMwT3JWZJEluRVB6JMb5eueCw90KCDXhvSOHdxkCARe_NguLA4Kz789wqjQY0G5gHQ1m8KyAkAxlR0LJJZV_XLd-nNv62-6Wg02605X0Ah0E-TWP3EF7bdFSWKcEIDQvN0gCQjL23_3nz8ocNO2FL86JjtQno4WNlYrC69HFpnBs0TaVkYm_ofULobzQWIxcXYAtk0e2vG075PbPcv27rNqD3zOSA1bCyz69eRXy_ERwKYBXXgC4LU4tlTOFxjduXqHTuWxiLUVzd8-FY9ApRNoC7x9AdRemaJntVfEXZIX9Zo6KxXlprGZ3DzjmyCHc1D2zQLPi_e2waWCHwsxmiMhBi_VqOTpfDFpUm_HuX6mFNyEOs0HauxoedF0xWrTTVo3J161g9lpv6degV3rg64kWbJ7nBIA0kiEfyHJq7vtfaoEY46Htp1IYWUEFExjlNtezs-wXOSiNThtBE_5LG3oIFX0lmF9XFkfGP4PVBR5TG6U_gd3GYnqH9g4Y2DJC9o-mzZV7IYkmbBsf-2hlMLfPkrVGbQcH3w2DWOcQ2JopcDiHkwjmQ5rtg2B0WnXbwPcopIqa_yNs_lsf5o19sXHF9iJ1_jTnrcgvLmuWqN3FhXn4v6_7rbDgQFWPMvJvEJEBwFncPEOGhSeWfZyx96WvFYdrOTgBOfO94EaUnDJWpDP3-v57YgmhdbW92Sozj-U0CJFmIiZxHkdXQJEGW0Vra-CJYOPGPLEFrk91FwgNaf0G4mOtWQ7CD6Lg_OOwRD1vn05qGISxDTKbiyIcgHA-XEPeI5cHRLLjFWWQ-pvGaOX3RWPLghrFhpHXqvP_30dkj58xoAnH2lPvEpq9XWh0zY6uuyywlB4WJw2o2Cg5gxeGOAxpwL_VlRQvWbFmse3VKEig15HREXEpSrcNwZlJFJS0l5xy22j9YIqeHSlsPgnCDc4dZ-7Wx_FUssWeb33HUdwhWKAkbbN898_H6lWzPlnY6FnkCnenm6koL2N5BzlYiGQFwmz-x7FAq2j_qxhw1NYJhnVvWEEJjtYNNON5hNp7c0QFu9JFHkrKLgKyjV1XFBIB3004md6SqS7e3G0E_6EhrVKdAeHRzZkvxkG_vns4DXsWR-NG98SR9XuyO_M5Okg1eaG7UiTZKeM76qrOFQNlpt7_ue_HDHWAbzhbjg_JH9BSQW8m_zlEZbIVF8SnMfo3q35dC_C0QdUyN538EoDoiHlC0eQyw1I2KQNALjnkSYxMf81H1WI7EUknev4zWjuDk71GYIO3YhsJRtRgZwr7YT0IzS9k48qnOKXw1aF-Y6YA8t5BFoNi2zunMgD05A7JIEBSC2VMAApVgOYCvKputrE0K6qP8GiyE3YlkzBZyOEuMdfG2GB4quYe3s1bmGGfRqjq1nJdG2C9G8A0UKnpBUYEL0hcCsQqcV1pSIGSnXYXDog2RkUHi'
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('288宝箱')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def Reward368():
  """
  368宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kandian.youth.cn/v5/CommonReward/toGetReward.json'
  headers = {
    'User-Agent': 'okhttp/3.12.2',
    'Content-Type': 'application/x-www-form-urlencoded',    
    'device-platform': 'android'
    }
  body = 'p=GcTMBiVxDAfc%3Dhet99qMrQT7G8_Iz3y7nCqO3drvlhT2Kut2efSbacLFcx-WBPvHFjQJ5dEjZvbJ7VjxVzIgsVl4uhQhj9Ob0HVzmPLZrUkUZygYQBFZbzhWL7MMrBOI64wd3vcbGAs_mKQR6DjpNMixBFuYoVOkG5cla7dx_eYjTpUX0an4lM6kVWDPqQAN43RAugOiSCzfqdk8ANsHWIYirbWoNsCieSMUPJdqVOJ5XVrOTalybm2ZGk6ZwoTYosOmZwF8hM524o_Z8g5IUwGo-VdAeYlG1JvgEOuoRen4n7Kyyckp1s197Eh9dmgPPKGAwSFe4zMrm9rG-0ZGq1CRBD1GB9dOzP14l7w9mtmeuuuhWg-FE8v23XCYJCDRaF2jIqfKQXErdjM38qqi5lnH0hfMBONWhMzmdO3W7sk9ScdYR45qEh3lG5rSPfGQYHukIOpR0uK-W1v9pyHslpIJKYRpXSKFHUPGZD0nZbOiM7QxLMtjHxgRAZyZ74m6D-rMSdumPyoj720LQTe-h0FhRFGO2cqfXWvZJ4AhQcOsaNMsY78a2JYumTUxjwBH-a8QfgHt8ShxK_T_B9KlawHd15zTKOQ7ejvwRucSm_Qy8vjZeAtYlMplmjGg8FSjs08xYf3ZG7NGFjo6WDFNgFV_coVO3OlN-NIKA22yX6jtBAdqxuxL_7muDy8vTZaDo0po9SCnsoruy1LlcVv0aQMkxnUHFjMIXVvrH8gUJJA-UJlWQ1VuU48rn_VP4Ma4LvZMVM-mbZIgXBeEv2tdNvDPpv3wu94gjLaqNvcMlTN66N5xo9CTyLmAQ7uvwYPOS-grGHqnzosUJ9A8i4h6lBwr9Qnvvrvd_uXk-RPQYJUC0GAn3aqIj95HfprPI2XXDL6tcF1glzWX1irSAp26OIFUTDZfjXQjW_wDu1Wr4s32MN6F9Q_Ykkn5UYohCQSKodMlPcOQG65ap96wnEMnBdcn8D7_sTbISH-BmOdhmN_G1MEEMiRjfXiNyiO-V5eHSavSaVAxflTgIdgcIcysOJPtnpRt_61dg4P2bjKHbhlScpVRaH1lg85bj4rVotQGVl-Qwv6pC3cg3sEHkBJSrTr7yjZ0dqy-e9y3Y5PDc430ZYnGC-2TBhi1L9_EjPLzZnwWJup7TWlS8A2R8Cywk_Phq4f_n3Zz_sL7fuzT_66f6j6EYn44TV-NMIkkRFF0cfn0537T6Fb36OyLTTSFR8B3q_6nhAMTEh2FItLp-9R6VV9KQe3bYtuVjD61KvujywF5O9Ef7o02tjnvAMZRxwNfucZ9sTXWsayZlim0FrbbF4gE1egnApFFscm_SUrj_P19EOvB2lyiwNzSC_3004hPiViD4TU--T_DNs9GFti0gbLIntstqy-3fWHudZUjRLSsbEJT8ZFrzQtujAYFgyb3u3BRe98MXYDxRPC7cOm6-g_Xe4g1hmO3M-LRYRTsVlP_u_i6_CgOdiGHRpa_Uc40MG4iGzf2SgNg_74Vy3KsGm'
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('368宝箱')
    print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

###
def run():
  title = f'📚中青看点'
  content = ''
  result = ''
  beijing_datetime = get_standard_time()
  print(f'\n【中青看点】{beijing_datetime.strftime("%Y-%m-%d %H:%M:%S")}')
  hour = beijing_datetime.hour
  for i, account in enumerate(COOKIELIST):
    headers = account.get('YOUTH_HEADER')
    readBody = account.get('YOUTH_READBODY')
    readTimeBody = account.get('YOUTH_READTIMEBODY')
    redBody = account.get('YOUTH_REDBODY')
    withdrawBody = account.get('YOUTH_WITHDRAWBODY')
    shareBody = account.get('YOUTH_SHAREBODY')
    startBody = account.get('YOUTH_STARTBODY')
    rotaryBody = f'{headers["Referer"].split("&")[15]}&{headers["Referer"].split("&")[8]}'

    if startBody:
      startApp(headers=headers, body=startBody)
    sign_res = sign(headers=headers)
    if sign_res and sign_res['status'] == 1:
      content += f'【签到结果】：成功 🎉 明日+{sign_res["nextScore"]}青豆'
    elif sign_res and sign_res['status'] == 2:
      send(title=title, content=f'【账户{i+1}】Cookie已过期，请及时重新获取')
      continue

    sign_info = signInfo(headers=headers)
    if sign_info:
      content += f'\n【账号】：{sign_info["user"]["nickname"]}'
      content += f'\n【签到】：+{sign_info["sign_score"]}青豆 已连签{sign_info["total_sign_days"]}天'
      result += f'【账号】: {sign_info["user"]["nickname"]}'
    friendList(headers=headers)
    if hour > 12:
      punch_card_res = punchCard(headers=headers)
      if punch_card_res:
        content += f'\n【打卡报名】：打卡报名{punch_card_res["msg"]} ✅'
    if hour >= 5 and hour <= 8:
      do_card_res = doCard(headers=headers)
      if do_card_res:
        content += f'\n【早起打卡】：{do_card_res["card_time"]} ✅'
    luck_draw_res = luckDraw(headers=headers)
    if luck_draw_res:
      content += f'\n【七日签到】：+{luck_draw_res["score"]}青豆'
    visit_reward_res = visitReward(body=readBody)
    if visit_reward_res:
      content += f'\n【回访奖励】：+{visit_reward_res["score"]}青豆'
    if shareBody:
      shareArticle(headers=headers, body=shareBody)
      for action in ['beread_extra_reward_one', 'beread_extra_reward_two', 'beread_extra_reward_three']:
        time.sleep(5)
        threeShare(headers=headers, action=action)
    open_box_res = openBox(headers=headers)
    if open_box_res:
      content += f'\n【开启宝箱】：+{open_box_res["score"]}青豆 下次奖励{open_box_res["time"] / 60}分钟'
    watch_ad_video_res = watchAdVideo(headers=headers)
    if watch_ad_video_res:
      content += f'\n【观看视频】：+{watch_ad_video_res["score"]}个青豆'
    watch_game_video_res = watchGameVideo(body=readBody)
    if watch_game_video_res:
      content += f'\n【激励视频】：{watch_game_video_res["score"]}个青豆'
    for i in range(5):
      article_red_res = articleRed(body=redBody)
      if article_red_res:
        content += f'\n【惊喜红包】：+{article_red_res["score"]}个青豆'
      time.sleep(10)
    read_time_res = readTime(body=readTimeBody)
    if read_time_res:
      content += f'\n【阅读时长】：共计{int(read_time_res["time"]) // 60}分钟'
    if (hour >= 6 and hour <= 8) or (hour >= 11 and hour <= 13) or (hour >= 19 and hour <= 21):
      beread_red_res = bereadRed(headers=headers)
      if beread_red_res:
        content += f'\n【时段红包】：+{beread_red_res["score"]}个青豆'
    for i in range(0, 20):
      time.sleep(5)
      rotary_res = rotary(headers=headers, body=rotaryBody)
      if rotary_res:
        if rotary_res['status'] == 0:
          break
        elif rotary_res['status'] == 1:
          content += f'\n【转盘抽奖】：+{rotary_res["data"]["score"]}个青豆 剩余{rotary_res["data"]["remainTurn"]}次'
          if rotary_res['data']['doubleNum'] != 0 and rotary_res['data']['score'] > 0:
            double_rotary_res = doubleRotary(headers=headers, body=rotaryBody)
            if double_rotary_res:
              content += f'\n【转盘双倍】：+{double_rotary_res["score"]}青豆 剩余{double_rotary_res["doubleNum"]}次'

    rotaryChestReward(headers=headers, body=rotaryBody)
    for i in range(5):
      watchWelfareVideo(headers=headers)
    timePacket(headers=headers)
    for action in ['watch_article_reward', 'watch_video_reward', 'read_time_two_minutes', 'read_time_sixty_minutes', 'new_fresh_five_video_reward', 'first_share_article']:
      time.sleep(5)
      sendTwentyScore(headers=headers, action=action)
##  自定义内容如下：
    hour_reward_res = HourReward()
    if hour_reward_res:
      content += f'\n【每小时宝箱】：+{hour_reward_res["score"]}个青豆'

    if beijing_datetime.hour == 17 and beijing_datetime.minute >= 10 and beijing_datetime.minute < 25:
      BoxReward(headers=headers)
      time.sleep(0.3)
      reward500_res = Reward500()      
      if reward500_res:
        content += f'\n【500宝箱】：+{reward500_res["score"]}个青豆'
      time.sleep(0.3)
      reward188_res = Reward188()
      if reward188_res:
        content += f'\n【188宝箱】：+{reward188_res["score"]}个青豆' 
      time.sleep(0.3)
      reward288_res = Reward288()
      if reward288_res:
        content += f'\n【288宝箱】：+{reward288_res["score"]}个青豆' 
      time.sleep(0.3)   
      reward368_res = Reward368()
      if reward368_res:
        content += f'\n【368宝箱】：+{reward368_res["score"]}个青豆'   
##
    stat_res = incomeStat(headers=headers)
    if stat_res['status'] == 0:
      for group in stat_res['history'][0]['group']:
        content += f'\n【{group["name"]}】：+{group["money"]}青豆'
      today_score = int(stat_res["user"]["today_score"])
      score = int(stat_res["user"]["score"])
      total_score = int(stat_res["user"]["total_score"])

      if score >= 10000 and withdrawBody and beijing_datetime.hour == 9:
        time.sleep(random.uniform(1.0,5.0))
        with_draw_res = withdraw(body=withdrawBody)
        if with_draw_res:
          result += f'\n【自动提现】：发起提现1元成功'
          content += f'\n【自动提现】：发起提现1元成功'
          # send(title=title, content=f'【账号】: {sign_info["user"]["nickname"]} 发起提现1元成功')

      result += f'\n【今日收益】：+{"{:4.2f}".format(today_score / 10000)}'
      content += f'\n【今日收益】：+{"{:4.2f}".format(today_score / 10000)}'
      result += f'\n【账户剩余】：{"{:4.2f}".format(score / 10000)}'
      content += f'\n【账户剩余】：{"{:4.2f}".format(score / 10000)}'
      result += f'\n【历史收益】：{"{:4.2f}".format(total_score / 10000)}\n\n'
      content += f'\n【历史收益】：{"{:4.2f}".format(total_score / 10000)}\n'

  print(content)

  # 每天 21:00 后发送消息推送
  if beijing_datetime.hour == 21 and beijing_datetime.minute >= 10 and beijing_datetime.minute < 25:
    send(title=title, content=result)
  elif not beijing_datetime.hour == 21:
    print('未进行消息推送，原因：没到对应的推送时间点\n')
  else:
    print('未在规定的时间范围内\n')

if __name__ == '__main__':
  run()
  
