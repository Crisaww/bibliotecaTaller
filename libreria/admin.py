from django.contrib import admin
from .models import libro, multa, prestamo, usuario

admin.site.register(libro)
admin.site.register(usuario)
admin.site.register(prestamo)
admin.site.register(multa)

# Register your models here.
