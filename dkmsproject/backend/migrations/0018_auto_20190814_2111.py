# Generated by Django 2.2.4 on 2019-08-14 19:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0017_auto_20190814_1724'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('mobile', models.CharField(blank=True, max_length=20)),
                ('phone', models.CharField(max_length=20)),
            ],
        ),
        migrations.RemoveField(
            model_name='donor',
            name='email',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='mobile',
        ),
        migrations.RemoveField(
            model_name='donor',
            name='phone',
        ),
        migrations.AddField(
            model_name='donor',
            name='contact_details',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.ContactDetails'),
        ),
    ]