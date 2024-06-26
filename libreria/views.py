
from django.shortcuts import render
from rest_framework import viewsets, filters, mixins

from libreria.serializer import libroSerializer, multaSerializer, prestamoSerializer, usuarioSerializer
from .models import libro, multa, prestamo, usuario


# Create your views here.

#Se crea la clase view por cada modelo
class libroView(viewsets.ModelViewSet):
    serializer_class = libroSerializer
    queryset = libro.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['$titulo', '$autor', '$genero', '$isbn']
    
# class ListarLibrosViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
#     serializer_class = libroSerializer
#     queryset = libro.objects.all()
    

class usuarioView(viewsets.ModelViewSet):
    serializer_class = usuarioSerializer
    queryset = usuario.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['$nombre']
    
class prestamoView(viewsets.ModelViewSet):
    serializer_class = prestamoSerializer
    queryset = prestamo.objects.all()
    

class multaView(viewsets.ModelViewSet):
    serializer_class = multaSerializer
    queryset = multa.objects.all()


    