# Generated by Django 3.2.14 on 2024-06-27 22:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('libreria', '0009_alter_prestamo_estado_prestamo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='libro',
            name='isbn',
            field=models.CharField(max_length=17),
        ),
        migrations.AlterField(
            model_name='multa',
            name='prestamo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='multa', to='libreria.prestamo'),
        ),
    ]
