# Generated by Django 4.0.5 on 2023-09-18 10:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0024_worker'),
    ]

    operations = [
        migrations.CreateModel(
            name='OfficeOrderItem',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('qty', models.IntegerField(blank=True, default=0, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='OfficeProduct',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('brand', models.CharField(blank=True, max_length=200, null=True)),
                ('catagory', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('countInStock', models.IntegerField(blank=True, default=0, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='kitchenproduct',
            name='user',
        ),
        migrations.RemoveField(
            model_name='order',
            name='shippingPrice',
        ),
        migrations.RemoveField(
            model_name='order',
            name='taxPrice',
        ),
        migrations.RenameModel(
            old_name='KitchenOrder',
            new_name='OfficeOrder',
        ),
        migrations.DeleteModel(
            name='KitchenOrderItem',
        ),
        migrations.DeleteModel(
            name='KitchenProduct',
        ),
        migrations.AddField(
            model_name='officeorderitem',
            name='officeOrder',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.officeorder'),
        ),
        migrations.AddField(
            model_name='officeorderitem',
            name='officeProduct',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.officeproduct'),
        ),
    ]
