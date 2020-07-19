from rest_framework import serializers
from api.models import API


class APISerializer(serializers.ModelSerializer):
    class Meta:
        model = API
        fields= ('first_name','last_name','userID')
