# Generated by Django 4.0.5 on 2022-10-30 12:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_customuser'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]