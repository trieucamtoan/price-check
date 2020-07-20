from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import (
ListAPIView ,
 RetrieveAPIView,
 CreateAPIView,
 DestroyAPIView,
 UpdateAPIView

 )
from .serializers import RegistrationSerializer
from rest_framework.permissions import AllowAny, IsAdminUser,IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView

from rest_framework.authtoken.models import Token

# Create your views here.

@api_view(['POST',])
def registration_view(request):
    if request.method == 'POST':
        serializer =  RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "successfully registered a new user."
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)