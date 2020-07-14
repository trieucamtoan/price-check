from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

# Import Model 
# from contact_manager.models import Contact # sample model
# Import Serializer
# from contact_manager.serializers import ContactSerializer # sample serializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def hello(request):
    if request.method == 'GET':
        return JsonResponse('hello', safe=False)