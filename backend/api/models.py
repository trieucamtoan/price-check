from django.db import models

class Product(models.Model):
    name       = models.CharField(max_length=120) # max_length = required
    description = models.TextField(blank=True, null=True)
    URL = models.URLField(max_length = 200)
    current_price = models.DecimalField(decimal_places = 2,max_digits = 1000,null = True)
    lowest_price  = models.DecimalField( decimal_places = 2,max_digits = 1000,null = True)

    def __str__(self):
        return self.name
