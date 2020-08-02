import scrapy, psycopg2, re
# Scrapy Items imports
from scraper.items import ProductItem
from scrapy_splash import SplashRequest

class PricespiderSpider(scrapy.Spider):
    name = 'pricespider'
    allowed_domains = ['newegg.ca','bestbuy.ca']
    start_urls = []

    def start_requests(self):
        self.get_url_from_db()
        
        for url in self.start_urls:
            if re.search("newegg.ca", url) != None:
                yield SplashRequest(url=url, callback=self.newegg_parse, args={'wait':3.5})

    def newegg_parse(self, response):
        item = ProductItem()
        item['url'] = response.url
        price_dollar = response.css('#landingpage-price').css('.price-current').xpath('.//strong/text()').extract()[0]
        price_cent = response.css('#landingpage-price').css('.price-current').xpath('.//sup/text()').extract()[0]
        
        price_dollar = re.sub('[^0-9]', '', price_dollar)
        price_cent = re.sub('[^0-9]', '', price_cent)

        item['price'] = float(price_dollar+'.'+price_cent)
        yield item

    def get_url_from_db(self):
        hostname = 'localhost' # local testing
        # hostname = 'db' # docker
        username = 'testuser'
        password = '123' # your password
        database = 'testdb'
        connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)
        cur = connection.cursor()
        
        cur.execute("SELECT product_url from api_productlinkprice")
        # Need to re-format the fetched url
        self.start_urls = [str(url[0]) for url in cur.fetchall()]

        cur.close()
        connection.close()
