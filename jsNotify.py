import os
import re
from util import send, requests_session
from datetime import datetime, timezone, timedelta

def get_filename(path,filetype):  # 输入路径、文件类型例如'.csv'
    name = []
    for root,dirs,files in os.walk(path):
        for i in files:
            if os.path.splitext(i)[1]==filetype:
                name.append(i)
                name.sort()
    return path+name[-1]

def readLog(path):    
    log = get_filename(path, '.log')  #文件
    s = '==============📣系统通知📣=============='  #关键字
    f = open(log,encoding="utf-8")
    line= f.readlines()
    i = 0
    result = ''
    for i in range(len(line)):
        if s in line[i]:
            for j in range(len(line)-i):
                result = result+line[i+j]
            return result
    else:
        print("Not Found!")

def get_standard_time():
  """
  获取utc时间和北京时间
  :return:
  """
  # <class 'datetime.datetime'>
  utc_datetime = datetime.utcnow().replace(tzinfo=timezone.utc)  # utc时间
  beijing_datetime = utc_datetime.astimezone(timezone(timedelta(hours=8)))  # 北京时间
  return beijing_datetime

def run():
    readPath='//ql//log//youth_read//'
    iosPath='//ql//log//youth_gain_ios//'
    androidPath='//ql//log//youth_gain_android//'
    beijing_datetime = get_standard_time()
    if beijing_datetime.hour == 6 and beijing_datetime.minute >= 30 and beijing_datetime.minute < 45:
      send(title='中青看看赚（苹果）', content=readLog(iosPath))
    elif beijing_datetime.hour == 8 and beijing_datetime.minute >= 30 and beijing_datetime.minute < 45:
      send(title='中青看看赚（安卓）', content=readLog(androidPath))
      send(title='中青阅读', content=readLog(readPath))
    elif beijing_datetime.hour == 18 and beijing_datetime.minute >= 30 and beijing_datetime.minute < 45:
      send(title='中青阅读', content=readLog(readPath))
    else:
      print('未在规定的时间范围内\n')  

if __name__ == '__main__':
    run()
