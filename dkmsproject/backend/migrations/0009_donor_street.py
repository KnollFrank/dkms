# Generated by Django 2.2 on 2019-08-12 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_donor_dataprotectionprivacy'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='street',
            field=models.TextField(blank=True, null=True),
        ),
    ]
