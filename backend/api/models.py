from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class Product(models.Model):
    product_name       = models.CharField(max_length=120) # max_length = required
    product_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.product_name

class ProductLinkPrice(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_link_price', null=True, blank=True)
    product_url = models.URLField(max_length = 200, unique=True)
    product_price = models.DecimalField(max_digits=1000, decimal_places=2, null=True)
    def __str__(self):
        return self.product_url + ' ' + str(self.product_price)

class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    username = models.CharField(max_length=150, blank=True)
    text = models.TextField(blank=True, null=True)
    def __str__(self):
        return 'Comment {} by {}'.format(self.text, self.username)

class Wishlist(models.Model):
    #ForeignKey in django rest: fetch the Whole objects
    #product =  models.ForeignKey(Product, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    #product_id = ArrayField(models.CharField(max_length=10,null=True,blank=True))
    username = models.CharField(max_length=150, blank=True,unique=True)
    # def __str__(self):
    #     return self.product_id
    
class Wishlist_item(models.Model):
    wishlist =  models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='wishlist_items', null=True, blank=True)
    product_id = models.PositiveIntegerField(null=True,blank=True,unique=True)
