# Generated by Django 3.0.9 on 2020-08-04 23:22

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20200804_1121'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_image',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.scramble_uploaded_filename),
        ),
    ]
