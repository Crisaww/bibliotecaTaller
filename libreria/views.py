from django.shortcuts import render
from rest_framework import viewsets, filters

from libreria.serializer import libroSerializer, usuarioSerializer
from .models import libro, usuario


# Create your views here.

#Se crea la clase view por cada modelo
class libroView(viewsets.ModelViewSet):
    serializer_class = libroSerializer
    queryset = libro.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['$titulo', '$autor', '$genero', '$isbn']
    

class usuarioView(viewsets.ModelViewSet):
    serializer_class = usuarioSerializer
    queryset = usuario.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['$nombre']
    