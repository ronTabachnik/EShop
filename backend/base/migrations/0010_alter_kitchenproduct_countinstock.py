# Generated by Django 4.0.5 on 2022-10-18 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_kitchenorderitem_qty_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kitchenproduct',
            name='countInStock',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=5, null=True),
        ),
    ]