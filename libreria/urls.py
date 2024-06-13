from django.urls import path,include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers


from libreria import views

router=routers.DefaultRouter()
router.register(r'',views.libroView,'/libro')

urlpatterns = [
    path("api/v1/libro/", include(router.urls)),
    path("docs/",include_docs_urls(title="Tienda API"))
]
#genera los: GET, POST, PUT, DELETE para cada entidad
