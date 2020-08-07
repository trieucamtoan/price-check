import scrapy, psycopg2, re, json
# Scrapy Items imports
from scraper.items import ProductItem
from scrapy_splash import SplashRequest
from decimal import *

# Custom execution script for rendering dynamic page on newegg
lua_script_newegg = """
    function main(splash, args)
        assert(splash:go(args.url))
        while not splash:select('.price-current') do
            splash:wait(0.1)
        end
        return {
            html = splash:html()
        }
    end
"""

class PricespiderSpider(scrapy.Spider):
    name = 'pricespider'
    allowed_domains = ['newegg.ca','bestbuy.ca']
    start_urls = []

    def __init__(self, provided_url=None, *args, **kwargs):
        super(PricespiderSpider, self).__init__(*args, **kwargs) # <- important
        if provided_url != None:
            self.start_urls.append(provided_url)

    def start_requests(self):
        if len(self.start_urls) < 0:
            self.get_url_from_db()
        for url in self.start_urls:
            if re.search("newegg.ca", url) != None:
                yield SplashRequest(url=url, callback=self.newegg_parse, args={
                    'lua_source': lua_script_newegg
                })
            
    def newegg_parse(self, response):
        item = ProductItem()
        item['url'] = response.url
        item['price'] = None
        if response.status == 200:
            price_dollar = response.css('#landingpage-price').css('.price-current').xpath('.//strong/text()').extract()
            price_cent = response.css('#landingpage-price').css('.price-current').xpath('.//sup/text()').extract()
            if len(price_dollar) > 0 and len(price_cent) > 0:
                price_dollar = re.sub('[^0-9]', '', price_dollar[0])
                price_cent = re.sub('[^0-9]', '', price_cent[0])

                item['price'] = Decimal(price_dollar+'.'+price_cent)
        yield item

    def get_url_from_db(self):
        hostname = 'localhost' # local testing
        # hostname = 'db' # docker
        username = 'testuser'
        password = '123' # your password
        database = 'testdb'
        try:
            connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)
            cur = connection.cursor()
            
            cur.execute("SELECT product_url from api_productlinkprice")
            # Need to re-format the fetched url
            self.start_urls = [str(url[0]) for url in cur.fetchall()]
        except (Exception, psycopg2.Error) as error :
            print ("Error while fetching data from PostgreSQL", error)
        finally:
            if connection:    
                cur.close()
                connection.close()
