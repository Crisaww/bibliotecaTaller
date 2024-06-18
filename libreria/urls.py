from django.urls import path,include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers


from libreria import views

router=routers.DefaultRouter()
router.register(r'',views.libroView,'/libro')

router=routers.DefaultRouter()
router.register(r'',views.libroView,'/usuario')

router=routers.DefaultRouter()
router.register(r'',views.libroView,'/prestamo')

router=routers.DefaultRouter()
router.register(r'',views.libroView,'/multa')

urlpatterns = [
    path("api/v1/libro/", include(router.urls)),
    path("api/v1/usuario/", include(router.urls)),
    path("api/v1/prestamo/", include(router.urls)),
    path("api/v1/multa/", include(router.urls)),
    path("docs/",include_docs_urls(title="Tienda API"))
]


#genera los: GET, POST, PUT, DELETE para cada entidad
