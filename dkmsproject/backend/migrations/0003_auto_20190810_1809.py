# Generated by Django 2.2.4 on 2019-08-10 18:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_backend'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Customer',
            new_name='Donor',
        ),
    ]