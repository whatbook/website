# coding=utf-8
import getUrl
from multiprocessing import Pool
import requests
import re
import pymongo
import time
from bs4 import BeautifulSoup
import requests
import re

url = 'http://fund.eastmoney.com/allfund.html'
clients = pymongo.MongoClient('127.0.0.1')
db = clients['funds']
col1 = db['fund']
col2 = db['detail']

soup = getUrl.geturl_gbk(url)


def run_detail2(code, name, url):
    soup = getUrl.geturl_utf8(url)
    tags = soup.select('div.dataOfFund dd')
    m1 = tags[4].select('span')[1].text
    y1 = tags[5].select('span')[1].text
    m3 = tags[6].select('span')[1].text
    y3 = tags[7].select('span')[1].text
    m6 = tags[8].select('span')[1].text
    rece = tags[9].select('span')[1].text
    infos = soup.select('div.infoOfFund td')
    fund_type = infos[0].a.text
    fund_risk = '无' if len(infos[0].text.split(
        '|\xa0\xa0')) <= 1 else infos[0].text.split('|\xa0\xa0')[1]
    scale_string = infos[1].text.split('：')[1]
    tmp1 = scale_string.split('（')  # ["40.60亿元", "2018-12-31）"] 这种东西
    fund_unit = re.findall(r'(亿元|万元)', tmp1[0])[0]
    fund_scale_lasttime = tmp1[1].split('）')[0]
    fund_scale = re.findall(r'^([0-9]{1,}[.][0-9]*)', tmp1[0])[0]
    fund_manager = infos[2].a.text
    fund_birthday = infos[3].text.split('：')[1]
    fund_owener = infos[4].a.text
    fund_rate = infos[5].div.text
    detail = {'代码': code, '名称': name, '近1月': m1, '近3月': m3,
              '近6月': m6, '近1年': y1, '近3年': y3, '成立来': rece,
              '基金类型': fund_type,
              '基金风险': fund_risk, '基金规模': fund_scale, '规模单位': fund_unit,
              '规模最后更新时间': fund_scale_lasttime, '基金经理': fund_manager,
              '成立日': fund_birthday, '管理人': fund_owener, '基金评级': fund_rate}
    print('detail2', code)
    col2.insert_one(detail)


def run_detail1(code, name, url):
    soup = getUrl.geturl_utf8(url)
    tags = soup.select('div.dataOfFund dd')

    try:
        m1 = tags[1].select('span')[1].text
        y1 = tags[2].select('span')[1].text
        m3 = tags[4].select('span')[1].text
        y3 = tags[5].select('span')[1].text
        m6 = tags[7].select('span')[1].text
        rece = tags[8].select('span')[1].text

        infos = soup.select('div.infoOfFund td')
        fund_type = infos[0].a.text
        fund_risk = infos[0].text.split('|\xa0\xa0')[1]
        scale_string = infos[1].text.split('：')[1]
        tmp1 = scale_string.split('（')  # ["40.60亿元", "2018-12-31）"] 这种东西
        fund_unit = re.findall(r'(亿元|万元)', tmp1[0])[0]
        fund_scale_lasttime = tmp1[1].split('）')[0]
        fund_scale = re.findall(r'^([0-9]{1,}[.][0-9]*)', tmp1[0])[0]
        fund_manager = infos[2].a.text
        fund_birthday = infos[3].text.split('：')[1]
        fund_owener = infos[4].a.text
        fund_rate = infos[5].div.text
        detail = {'代码': code, '名称': name, '近1月': m1, '近3月': m3,
                  '近6月': m6, '近1年': y1, '近3年': y3, '成立来': rece,
                  '基金类型': fund_type,
                  '基金风险': fund_risk, '基金规模': fund_scale, '规模单位': fund_unit,
                  '规模最后更新时间': fund_scale_lasttime, '基金经理': fund_manager,
                  '成立日': fund_birthday, '管理人': fund_owener, '基金评级': fund_rate}
        print('detail1', code)
        col2.insert_one(detail)
    except:
        run_detail2(code, name, url)


tags = soup.select('.num_right > li')
for tag in tags:
    # tag = tags[0]
    # print(tag)
    # if tag:
    if tag.a is None:
        continue
    else:
        content = tag.a.text  # 取第一个<a>的文本数据
        code = re.findall(r'\d+', content)[0]  # 拿到基金代码
        name = content.split('）')[1]  # 拿到股票名称
        url = tag.a['href']  # 拿到详情链接
        content_dict = {'code': code, 'name': name, 'url': url}
        col1.insert_one(content_dict)
        time.sleep(0.1)
        run_detail1(code, name, url)
        print('fund', code)
