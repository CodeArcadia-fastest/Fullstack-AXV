from django.shortcuts import render
from rest_framework import filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from shop.models import Category, Product
from shop.serializers import CategorySerializer, ProductSerializer

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name']

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
