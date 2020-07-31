from django.db import models

class Product(models.Model):
<<<<<<< HEAD
<<<<<<< Updated upstream
    name       = models.CharField(max_length=120) # max_length = required
    description = models.TextField(blank=True, null=True)
    URL = models.URLField(max_length = 200)
    current_price = models.DecimalField(decimal_places = 2,max_digits = 1000,null = True)
    lowest_price  = models.DecimalField( decimal_places = 2,max_digits = 1000,null = True)
=======
    product_name       = models.CharField(max_length=120) # max_length = required
    product_description = models.TextField(blank=True, null=True)
=======
    product_name       = models.CharField(max_length=120) # max_length = required
    product_description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.product_name
>>>>>>> 539a8c015162f4ec8d78b2b41473f70c716a1f47

class ProductLinkPrice(models.Model):   
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_link_price')
    product_url = models.URLField(max_length = 200)
    product_price = models.DecimalField(max_digits=1000, decimal_places=2, null=True)
    def __str__(self):
<<<<<<< HEAD
        return self.product_name

class ProductLinkPrice(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_link_price', null=True, blank=True)
    product_url = models.URLField(max_length = 200, unique=True)
    product_price = models.DecimalField(max_digits=1000, decimal_places=2, null=True)
    def __str__(self):
        return self.product_url + ' ' + str(self.product_price)
>>>>>>> Stashed changes

    def __str__(self):
<<<<<<< Updated upstream
        return self.name
=======
        return 'Comment {} by {}'.format(self.text, self.username)

class Wishlist(models.Model):
    product_id =  models.IntegerField()
    username = models.CharField(max_length=120)
    def __str__(self):
        return self.product_id
>>>>>>> Stashed changes
=======
        return self.product_url + ' ' + str(product_price)
>>>>>>> 539a8c015162f4ec8d78b2b41473f70c716a1f47
