# Generated by Django 2.2.4 on 2019-08-11 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_donor_ancestry'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='dataprotectionprivacy',
            field=models.BooleanField(default=True),
        ),
    ]