"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include



# from api.views import detail_product_view
from api.views import *

from django.conf.urls.static import static
from django.conf import settings


# from api.views import (
    # UserListView,
    # UserDetailView,
    # UserCreateView,
    # UserDeleteView,
    # UserUpdateView,
    # registration_view
# )

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

# TokenObtainPairView : one of the access token one is refresh token
#

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('products/<int:product_id>',detail_product_view , name= "product-detail"),
    path('products/',products_list_view,name= "product"),
    path('products/<int:product_id>/comments', product_comment_view, name="comment"),
    path('products/<int:product_id>/comments/<int:comment_id>', product_comment_detail_view, name="comment-detail"),
    path('products/<int:product_id>/url', product_url, name="product_url"),
    path('products/<int:product_id>/url/<int:url_id>', product_url_detail, name="product_url_detail")
    # path('register', registration_view, name='register')
    # path('list',UserListView.as_view(), name="list"),

    # path('api-auth/', include('rest_framework.urls')),
    # path('api/token/', TokenObtainPairView.as_view()),
    # path('api/token/refresh/', TokenRefreshView.as_view()),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
