from rest_framework import serializers
# Se importa el modulo serializer

from .models import libro

#Se importa la clase del model

#Se crea una clase serializer por cada entidad

#La clase Meta dentro de un serializer sirve para
#proporcionar metadatos adicionales y configuraciones
#especificas para este serializador.

class libroSerializer(serializers.ModelSerializer):
    
    #Agregar los campos necesarios a mostrar
    #si se desea agregar todos los campos se 
    #puede utilizar la función __all__
    
    class Meta:
        model=libro
        fields ='__all__'
        # fields = {
        #     'id',
        #     'titulo',
        #     'autor',
        #     'isbn',
        #     'genero',
        #     'num_ejem_disponibles',
        #     'num_ejem_ocupados'
        # }