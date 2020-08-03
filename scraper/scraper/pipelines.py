# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

# Scrapy Items imports
from scraper.items import ProductItem

import psycopg2

class ScraperPipeline:

    def open_spider(self, spider):
        # hostname = 'localhost' # local testing
        hostname = 'db' # docker
        username = 'testuser'
        password = '123' # your password
        database = 'testdb'
        self.connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)
        self.cur = self.connection.cursor()

    def close_spider(self, spider):
        self.cur.close()
        self.connection.close()

    def process_item(self, item, spider):
        # try:
        #     product_link = ProductLinkPrice.objects.get(product_url=item["url"])
        #     print("Product Link already exist")
        #     product_link.product_price = item['price']
        #     product_link.save()
        # except ProductLinkPrice.DoesNotExist:
        #     pass

        # product_link = ProductLinkPrice()
        # product_link.product_url = item["url"]
        # product_link.product_price = item['price']
        # product_link.save()

        # self.cur.execute("UPDATE api_productlinkprice SET product_price = {} WHERE product_url = \'{}\'".format(item["price"], item['url']))
        # self.connection.commit()
        return item
