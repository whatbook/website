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

proxies = [
    'http://124.192.106.247:3128',
]

random_proxy = random.choice(proxies)

print(random_proxy)


def geturl_gbk_common(url):
    html = requests.get(url).content.decode('gbk')
    soup = BeautifulSoup(html, 'lxml')
    return soup


def geturl_gbk(url):
    html = requests.get(
        url, headers=header, proxies={
            'http': random_proxy
        }).content.decode('gbk')
    soup = BeautifulSoup(html, 'lxml')
    return soup


def geturl_utf8(url):
    html = requests.get(
        url, headers=header, proxies={
            'http': random_proxy
        }).content.decode('utf-8')
    soup = BeautifulSoup(html, 'lxml')
    return soup


# proxies={'http':random.choice(proxies)}
