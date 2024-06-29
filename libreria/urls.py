from django.urls import path,include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers


from libreria import views

routerLibro=routers.DefaultRouter()
routerLibro.register(r'',views.libroView,'/libro')

routerUsuario=routers.DefaultRouter()
routerUsuario.register(r'',views.usuarioView,'/usuario')

routerPrestamo=routers.DefaultRouter()
routerPrestamo.register(r'',views.prestamoView,'/prestamo')

routerMulta=routers.DefaultRouter()
routerMulta.register(r'',views.multaView,'/multa')

# routerBusquedaLibro=routers.DefaultRouter()
# routerBusquedaLibro.register(r'',views.multaView,'/busquedafiltro')

# routerListaLibros=routers.DefaultRouter()
# routerListaLibros.register(r'', views.ListarLibrosViewSet,'/listar-libros')

urlpatterns = [
    path("api/v1/libro/", include(routerLibro.urls)),
    # path("api/v1/libro/", include(routerBusquedaLibro.urls)),
    path("api/v1/usuario/", include(routerUsuario.urls)),
    path("api/v1/prestamo/", include(routerPrestamo.urls)),
    path("api/v1/multa/", include(routerMulta.urls)),
    # path("api/v1/listar-libros/", include(routerListaLibros.urls)),
    path("docs/",include_docs_urls(title="Tienda API"))
]


#genera los: GET, POST, PUT, DELETE para cada entidad
