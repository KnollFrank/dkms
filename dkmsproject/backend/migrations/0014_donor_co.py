# Generated by Django 2.2.4 on 2019-08-12 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_donor_zipcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='co',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]