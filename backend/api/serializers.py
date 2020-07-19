from rest_framework import serializers
from api.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields= ('first_name','last_name','userID')
