# Generated by Django 5.0.3 on 2024-06-21 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('libreria', '0007_alter_usuario_tipo_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='multa',
            name='estado_multa',
            field=models.CharField(choices=[('Pagada', 'Pagada'), ('Pendiente', 'Pendiente')], max_length=20),
        ),
        migrations.AlterField(
            model_name='prestamo',
            name='estado_prestamo',
            field=models.CharField(choices=[('Préstamo', 'Préstamo'), ('Entregado', 'Entregado'), ('Cancelado', 'Cancelado')], max_length=20),
        ),
    ]
