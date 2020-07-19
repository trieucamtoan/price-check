from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

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

from api.models import Article
from .serializers import ArticleSerializer

# Create your views here.
@api_view(['GET'])
def hello(request):
    if request.method == 'GET':
        return JsonResponse('hello', safe=False)


class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleDetailView(RetrieveAPIView):
    queryset=Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleCreateView(CreateAPIView):
    queryset=Article.objects.all()
    serializer_class = ArticleSerializer



class ArticleUpdateView(UpdateAPIView):
    queryset=Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDeleteView(DestroyAPIView):
    queryset=Article.objects.all()
    serializer_class = ArticleSerializer
