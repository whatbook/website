from bs4 import BeautifulSoup
import requests
import random

UA_LIST = [
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.0 Safari/536.3",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
    "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24"
]

header = {
    'Accept':
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding':
    'gzip, deflate, sdch',
    'Accept-Language':
    'zh-CN,zh;q=0.8,en;q=0.6',
    'Connection':
    'keep-alive',
    'User-Agent':
    random.choice(UA_LIST)
}


def random_header():
    global header
    header = {
        'Accept':
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding':
        'gzip, deflate, sdch',
        'Accept-Language':
        'zh-CN,zh;q=0.8,en;q=0.6',
        'Connection':
        'keep-alive',
        'User-Agent':
        random.choice(UA_LIST)
    }


proxies = [
    # 'http://117.158.57.2:3128',  # 太慢了
    # 'http://119.90.126.106:7777',  # 太慢了
    # 'http://119.57.108.53:53281',  # 太慢了
    # 'http://163.125.69.140:8888',
    # 'http://124.192.106.247:3128',
    # 'http://27.191.234.69:9999',
    # 'http://125.46.0.62:53281',
    # 'http://120.237.14.198:53281',
    # 'http://163.125.69.149:8888',

    'http://27.46.23.52:8888',
    'http://117.141.155.243:53281',
    'http://113.78.255.169:9000',
    'http://180.116.58.224:9999',

    # 'http://122.136.212.132:53281',
    # 'http://59.44.247.194:9797',
    # 'http://113.116.58.253:9000'






]

random_proxy = random.choice(proxies)


def geturl_gbk_common(url):
    html = requests.get(url).content.decode('gbk')
    soup = BeautifulSoup(html, 'lxml')
    return soup


def geturl_gbk(url):
    html = requests.get(
        url, headers=header, proxies={
            'http': random_proxy
        }, timeout=7).content.decode('gbk')
    soup = BeautifulSoup(html, 'html.parser')
    return soup


def geturl_utf8(url):
    print('ip', random_proxy)
    html = requests.get(
        url, headers=header, proxies={
            'http': random_proxy
        }, timeout=7).content.decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    return soup


def loop_geturl_utf8(url):
    try:
        return geturl_utf8(url)
    except:
        print('重试')
        global random_proxy
        random_proxy = random.choice(proxies)
        random_header()
        return loop_geturl_utf8(url)


# proxies={'http':random.choice(proxies)}
