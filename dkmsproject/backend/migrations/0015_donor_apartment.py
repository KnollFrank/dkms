# Generated by Django 2.2.4 on 2019-08-12 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0014_donor_co'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='apartment',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
