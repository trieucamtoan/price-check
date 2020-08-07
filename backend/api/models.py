import uuid
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver

def scramble_uploaded_filename(instance, filename):
    extension = filename.split(".")[-1]
    return "{}.{}".format(uuid.uuid4(), extension)

class Product(models.Model):
    product_name       = models.CharField(max_length=120) # max_length = required
    product_description = models.TextField(blank=True, null=True)
    product_type = models.CharField(max_length=120, blank=True, null=True)
    product_image = models.ImageField(null=True, blank=True, upload_to=scramble_uploaded_filename)

    @property
    def product_lowest_price_curr(self):
        """ Returns lowest price if any price exists else None
            To sort descending, add '-' to 'product_price_curr'
            Call this function without parenthasis () to get lowest price 
        """
        if self.product_link_price.all():
            return self.product_link_price.order_by('product_price_curr')[0].product_price_curr
        return None
    
    @property
    def product_lowest_price_prev(self):
        """ Returns lowest price if any price exists else None
            To sort descending, add '-' to 'product_price_curr'
            Call this function without parenthasis () to get lowest price 
        """
        if self.product_link_price.all():
            return self.product_link_price.order_by('product_price_prev')[0].product_price_prev
        return None

    def __str__(self):
        return self.product_name

class ProductLinkPrice(models.Model):   
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_link_price', null=True)
    product_url = models.URLField(max_length = 200, unique=True)
    product_price_curr = models.DecimalField(max_digits=1000, decimal_places=2, null=True)
    product_price_prev = models.DecimalField(max_digits=1000, decimal_places=2, null=True)
    def __str__(self):
        return self.product_url + '\n Current price: ' + str(self.product_price_curr) + '\n Previous price: ' + str(self.product_price_prev)

class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments', null=True)
    username = models.CharField(max_length=150)
    text = models.TextField(blank=True, null=True)
    def __str__(self):
        return 'Comment {} by {}'.format(self.text, self.username)

class Wishlist(models.Model):
    #ForeignKey in django rest: fetch the Whole objects
    #product =  models.ForeignKey(Product, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    product_id_list = ArrayField(models.PositiveIntegerField(unique=True), blank=True, null=True)
    username = models.CharField(max_length=150, blank=True,unique=True)
    # def __str__(self):
    #     return self.product_id
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Wishlist.objects.create(username=instance.username)

# class Wishlist_item(models.Model):
#     wishlist =  models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='wishlist_items', null=True, blank=True)
#     product_id = models.PositiveIntegerField(null=True,blank=True,unique=True)
