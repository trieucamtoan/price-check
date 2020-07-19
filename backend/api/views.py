from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response

# Import Model
# from contact_manager.models import Contact # sample model
# Import Serializer
# from contact_manager.serializers import ContactSerializer # sample serializer
from rest_framework.decorators import api_view
from rest_framework.generics import (
ListAPIView ,
 RetrieveAPIView,
 CreateAPIView,
 DestroyAPIView,
 UpdateAPIView

 )

from api.models import User
from .serializers import APISerializer
from rest_framework.permissions import AllowAny, IsAdminUser,IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
# Create your views here.
@api_view(['GET'])
# @permission_classes((IsAuthenticated, ))


def hello(request):
    if request.method == 'GET':
        return JsonResponse('hello', safe=False)

class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = APISerializer
    authentication_classes=(TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination


class UserDetailView(RetrieveAPIView):
    queryset=User.objects.all()
    serializer_class = APISerializer

class UserCreateView(CreateAPIView):
    queryset=User.objects.all()
    serializer_class = APISerializer



class UserUpdateView(UpdateAPIView):
    queryset=User.objects.all()
    serializer_class = APISerializer

class UserDeleteView(DestroyAPIView):
    queryset=User.objects.all()
    serializer_class = APISerializer
