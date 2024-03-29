# Generated by Django 2.2.4 on 2019-08-14 20:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0019_auto_20190814_2143'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeclarationOfConsent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dataprotectionprivacy', models.BooleanField(default=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='donor',
            name='dataprotectionprivacy',
        ),
        migrations.AddField(
            model_name='donor',
            name='declaration_of_consent',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.DeclarationOfConsent'),
        ),
    ]
