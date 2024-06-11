# Generated by Django 5.0.3 on 2024-06-11 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='libro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('autor', models.CharField(max_length=60)),
                ('isbn', models.CharField(max_length=13)),
                ('genero', models.CharField(max_length=10)),
                ('num_ejem_disponibles', models.IntegerField(max_length=3)),
                ('num_ejem_ocupados', models.IntegerField(max_length=3)),
            ],
        ),
    ]
