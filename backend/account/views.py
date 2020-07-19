from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from account.serializers import RegistrationSerializer


@api_view(['Post',])

def registration_view(request):
    if request.method == 'POST':
        Serializer =  RegisterationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "successfully registered a new user."
            data['email'] = account.email
            data['username'] = account .username
        else:
            data = serializer.errors
        return Response(data)
