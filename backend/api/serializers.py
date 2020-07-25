from rest_framework import serializers
from .models import Product, ProductLinkPrice

# class RegistrationSerializer(serializers.ModelSerializer):
#
# 	password2= serializers.CharField(style={'input_type': 'password'}, write_only=True)
#
# 	class Meta:
# 		model = Account
# 		fields = ['email', 'username', 'password', 'password2']
# 		extra_kwargs = {
# 				'password': {'write_only': True},
# 		}
#
# 	def	save(self):
#
# 		account = Account(
# 					email=self.validated_data['email'],
# 					username=self.validated_data['username']
# 				)
# 		password = self.validated_data['password']
# 		password2 = self.validated_data['password2']
# 		if password != password2:
# 			raise serializers.ValidationError({'password': 'Passwords must match.'})
# 		account.set_password(password)
# 		account.save()
# 		return account
#

class ProductLinkPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductLinkPrice
        fields = ('product_url', 'product_price',)

class ProductSerializer(serializers.ModelSerializer):
    product_link_price = ProductLinkPriceSerializer(many=True)
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'product_description', 'product_link_price']
        #First, create product instance, then choice instance
        #Each dictionary of the list has keys called 'url' and 'price'
        #Each ProductLinkPrice needs to be associated with the Product 
        #   ->use the loop to add the Product to each dictionary
    def create(self, validated_data):
        product_link_price_validated = validated_data.pop('product_link_price')
        product = Product.objects.create(**validated_data)
        product_link_price_serializer = self.fields['product_link_price']
        for a_product_link_price in product_link_price_validated:
            a_product_link_price['product'] = product
        product_link_price_set = product_link_price_serializer.create(product_link_price_validated)
        return product 
