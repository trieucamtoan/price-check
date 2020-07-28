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
        for a_product_link_price in product_link_price_validated:
            ProductLinkPrice.objects.create(product=product, **a_product_link_price)
        return product

    def update(self, instance, validated_data):

        product_link_price_validated = validated_data.pop('product_link_price')
        product_link_prices = (instance.product_link_price).all() 
        product_link_prices = list(product_link_prices)
        
        #Saving model
        instance.product_name = validated_data.get('product_name', instance.product_name)
        instance.product_description = validated_data.get('product_description', instance.product_description)
        instance.save()

        #Saving nested model
        for product_link_price in product_link_price_validated:
            a_product_link_price = product_link_prices.pop(0)
            a_product_link_price.product_url = product_link_price.get('product_url', a_product_link_price.product_url)
            a_product_link_price.product_price = product_link_price.get('product_price', a_product_link_price.product_price)
            a_product_link_price.save()
        return instance
