# from django.shortcuts import render
# from django.http.response import JsonResponse
# from rest_framework.parsers import JSONParser
# from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.http import HttpResponse,JsonResponse
from api.models import Product, Comment
from .serializers import ProductSerializer, CommentSerializer
import json

# from rest_framework.generics import (
# ListAPIView ,
#  RetrieveAPIView,
#  CreateAPIView,
#  DestroyAPIView,
#  UpdateAPIView

#  )
# from .serializers import RegistrationSerializer
# from rest_framework.permissions import AllowAny, IsAdminUser,IsAuthenticated
# from rest_framework.pagination import PageNumberPagination
# from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView

# from rest_framework.authtoken.models import Token

# Create your views here.

# @api_view(['POST',])
# def registration_view(request):
#     if request.method == 'POST':
#         serializer =  RegistrationSerializer(data=request.data)
#         data = {}
#         if serializer.is_valid():
#             account = serializer.save()
#             data['response'] = "successfully registered a new user."
#             data['email'] = account.email
#             data['username'] = account.username
#             token = Token.objects.get(user=account).key
#             data['token'] = token
#         else:
#             data = serializer.errors
#         return Response(data)

@api_view(['GET','POST'])
def products_list_view(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
        #return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
    # data = JSONParser().parse(request)
        serializer = ProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            product = serializer.save()
            serializer = ProductSerializer(product, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE', 'PUT'])
def detail_product_view(request,pk):
    try:
        product= Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        return Response(serializer.data)
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = ProductSerializer(instance=product, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            saved_product = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def product_comment_view(request, product_id):
    # try:
    #     product = Product.objects.get(id=product_id)
    # except Product.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)
    product = get_object_or_404(Product, pk=product_id)
    if request.method == 'GET':
        comments = Comment.objects.filter(product=product)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data, context={'product_id': product_id})
        if serializer.is_valid(raise_exception=True):
            serializer.save(product=product)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def product_comment_detail_view(request, product_id, comment_id):
    product = get_object_or_404(Product, pk=product_id)
    comment = get_object_or_404(Comment, pk=comment_id, product=product)
    if request.method == 'PUT':
        serializer = CommentSerializer(instance=comment, data=request.data)
        if serializer.is_valid():
            saved_product = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','DELETE'])
def add_detail_wishlist(request,product_id):
    item = get_object_or_404(Product, pk=product_id)
    if request.method == 'GET':
        wishlist_item = Wishlist.objects.filter(product=product)
        serializer = WishlistSerializer(wishlist_item,many=True)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST','DELETE'])
def add_to_wishlist(request,product_id):
    item = get_object_or_404(Product, pk=product_id)
    if request.method == 'POST':
        serializer = WishlistSerializer(data=request.data, context={'product_id': product_id})
        if serializer.is_valid(raise_exception=True):
            saved_wishlist=serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    # wishlist_item = get_or_create(Wishlist, user=request.user)
    # wishlist_item.wishlist.add(item)
    # return Response(data)
