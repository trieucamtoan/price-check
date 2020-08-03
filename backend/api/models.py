from django.db import models

class Product(models.Model):
    product_name       = models.CharField(max_length=120) # max_length = required
    product_description = models.TextField(blank=True, null=True)
    product_type = models.CharField(max_length=120, blank=True, null=True)
    
    def __str__(self):
        return self.product_name

class ProductLinkPrice(models.Model):   
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_link_price', null=True, blank=True)
    product_url = models.URLField(max_length = 200, unique=True)
    product_price_curr = models.DecimalField(max_digits=1000, decimal_places=2, null=True, default=-1)
    product_price_prev = models.DecimalField(max_digits=1000, decimal_places=2, null=True, default=-1)
    def __str__(self):
        return self.product_url + '\n Current price: ' + str(self.product_price_curr) + '\n Previous price: ' + str(self.product_price_prev)

class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    username = models.CharField(max_length=150, blank=True)
    text = models.TextField(blank=True, null=True)
    def __str__(self):
        return 'Comment {} by {}'.format(self.text, self.username)