# Generated by Django 2.2.4 on 2019-08-12 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_donor_houseno'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='zipcode',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
