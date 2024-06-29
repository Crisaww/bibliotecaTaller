from django.db import models

# Create your models here.

# 1) models.CharField = Para un capo de texto
# 2) max_length = Indica la longitud mazima del campo
# 3) blank=true = Indica que el campo acepta valores nulos
# 4) default = indica el valor por defecto del campo

class libro(models.Model):
    
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=60)
    isbn = models.CharField(max_length=17)
    genero = models.CharField(max_length=10)
    num_ejem_disponibles = models.IntegerField()
    num_ejem_ocupados = models.IntegerField()
    
    def __str__(self):
        return self.titulo
    
    
class usuario(models.Model):
    LECTOR = 'Lector'
    BIBLIOTECARIO = 'Bibliotecario'
    ADMINISTRADOR = 'Administrador'
    
    
    TIPO_USUARIO_CHOICES = [
        (LECTOR, 'Lector'),
        (BIBLIOTECARIO, 'Bibliotecario'),
        (ADMINISTRADOR, 'Administrador'),
    ]
    
    nombreUsuario = models.CharField(max_length=60)
    direccionResidencia = models.CharField(max_length=60)
    correo = models.CharField(max_length=150)
    
    tipo_usuario = models.CharField(max_length=20, choices=TIPO_USUARIO_CHOICES)
    
    def __str__(self):
        return self.nombreUsuario

class prestamo(models.Model):
    PRESTAMO = 'Prestamo'
    ENTREGADO = 'Entregado'
    CANCELADO = 'Cancelado'
    
    
    TIPO_PRESTAMO_CHOICES = [
        (PRESTAMO, 'Prestamo'),
        (ENTREGADO, 'Entregado'),
        (CANCELADO, 'Cancelado'),
    ]
    fecha_prestamo = models.DateField()
    fecha_devolucion = models.DateField()
    usuario = models.ForeignKey(usuario, related_name='prestamo', on_delete=models.PROTECT)
    libro = models.ForeignKey(libro, related_name='prestamo', on_delete=models.CASCADE)
    estado_prestamo = models.CharField(max_length=20, choices=TIPO_PRESTAMO_CHOICES)
     
    def __str__(self):
        return f"Prestamo de {self.libro.titulo} a {self.usuario.nombreUsuario} ({self.estado_prestamo})"
    

class multa(models.Model):
    PAGADA = 'Pagada'
    PENDIENTE = 'Pendiente'
    
    
    
    TIPO_MULTA_CHOICES = [
        (PAGADA, 'Pagada'),
        (PENDIENTE, 'Pendiente'),
        
    ]
    valor_multa = models.IntegerField()
    fecha_multa = models.DateField()
    usuario = models.ForeignKey(usuario, related_name='multa', on_delete=models.PROTECT)
    prestamo = models.ForeignKey(prestamo, related_name='multa', on_delete=models.CASCADE)
    estado_multa = models.CharField(max_length=20, choices=TIPO_MULTA_CHOICES)
     
    def __str__(self):
        return f"Multa de {self.valor_multa} para {self.usuario.nombreUsuario} ({self.prestamo.estado_prestamo})"
    
    
    
    
    
    
