from django.shortcuts import render
from rest_framework import viewsets, filters

from libreria.serializer import libroSerializer
from .models import libro


# Create your views here.

#Se crea la clase view por cada modelo
class libroView(viewsets.ModelViewSet):
    serializer_class = libroSerializer
    queryset = libro.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['$titulo', '$autor', '$genero', '$isbn']
    