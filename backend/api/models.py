from django.db import models

# Create your models here.
class API (models.Model):
    first_name = models.CharField(max_length=120,null=True)
    last_name = models.CharField(max_length=120,null=True)
    userID = models.CharField(max_length=120,null=True)

    def full_name(self):
        return '{} {}'.format(self.first_name, self.last_name)
    def __str__(self):
        return self.full_name()
