# Generated by Django 2.2.4 on 2019-08-14 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_auto_20190812_1957'),
    ]

    operations = [
        migrations.CreateModel(
            name='PrivateAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.TextField(blank=True, null=True)),
                ('street', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('zipcode', models.CharField(blank=True, max_length=20)),
                ('houseno', models.CharField(blank=True, max_length=255, null=True)),
                ('co', models.CharField(blank=True, max_length=255)),
                ('apartment', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.RemoveField(
            model_name='donor',
            name='address',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='apartment',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='city',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='co',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='houseno',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='street',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='zipcode',
        ),
        migrations.AddField(
            model_name='donor',
            name='private_address',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.PrivateAddress'),
        ),
    ]
