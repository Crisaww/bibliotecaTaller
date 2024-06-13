from django.db import models

# Create your models here.

# 1) models.CharField = Para un capo de texto
# 2) max_length = Indica la longitud mazima del campo
# 3) blank=true = Indica que el campo acepta valores nulos
# 4) default = indica el valor por defecto del campo

class libro(models.Model):
    
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=60)
    isbn = models.CharField(max_length=13)
    genero = models.CharField(max_length=10)
    num_ejem_disponibles = models.IntegerField(max_length=3)
    num_ejem_ocupados = models.IntegerField(max_length=3)
    
    def __str__(self):
        return self.title
    
    
# class usuario(models.Model):
    
#     nombre = models.CharField(max_length=60)
#     direccion = models.CharField(max_length=60)
#     correo = models.CharField(max_length=150)
#     tipo_usuario = models.IntegerChoices
        
    
    
    
    
    
    